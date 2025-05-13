import { supabase } from './lib/supabase';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import HeaderEnvio from './components/headerEnvio';
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
    <HeaderEnvio/>
    <div className="container">
      <div className="title-banner">
        <div className='info-title'>
          <h1>Lista de Precios</h1>
          <a href="https://api.whatsapp.com/send?phone=5493876291409" target="_blank" className="whatsapp-link">
            <img src="/whatsapp.svg" alt="Whatsapp" className="whatsapp" />
          </a>
        </div>
        <span>Fecha: {new Date().toLocaleDateString()}</span>
      </div>


      <ul className="list">
        {fruits.filter(fruit => fruit.active).map((fruitso) => (
          <li className="list-item" key={fruitso.id}>
            <div className='section-product_name'>
              <div className="circle_product" style={{ backgroundColor: `${fruitso.color}` }}></div>
              <span className="product-name">
                {fruitso.name}
              </span>
            </div>
            <span className="unit">{fruitso.description}</span>
            <span className="price">${fruitso.price.toLocaleString('es-us')} 
            <img alt='trend-direction' className='trend-price' src={`/${fruitso.trend}.svg`} />

            </span>
            </li>
        ))}
      </ul>
    </div>
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