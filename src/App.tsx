import { supabase } from './lib/supabase';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import HeaderEnvio from './components/headerEnvio';
import Header from './components/Header';
import Fotter from './components/Fotter';
import './index.css'

interface Fruit {
  id: string;
  color: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  trend: 'up' | 'down' | 'stable';
}

function MainContent() {
  const [fruits, setfruits] = useState<Fruit[]>([]);
  
  useEffect(() => {
    getFruits();
  }, []);

  async function getFruits() {
    const { data } = await supabase.from("products").select().order('name');
    console.log(data)
    setfruits(data as Fruit[]);
  }

  return (
    <>
    <Header/>

    <HeaderEnvio/>

    <div className="container">
      <ul className="list">
        {fruits.filter(fruit => fruit.active).map(({ id, color, name, description, price, trend }) => (
          <li className="list-item" key={id}>
            <div className="section-product_name">
              <div className="circle_product" style={{ backgroundColor: color }}></div>
              <span className="product-name">{name}</span>
            </div>
            <span className="unit">{description}</span>
            <span className="price">
              ${price.toLocaleString('es-AR')}
              <img
                alt="tendencia"
                className="trend-price"
                src={`/${trend}.svg`}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>


    <Fotter/>
  </>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/morena-admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}