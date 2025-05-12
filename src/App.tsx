import { SignedIn, UserButton } from '@clerk/clerk-react';
import { supabase } from './lib/supabase';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './components/AdminPage';

interface Fruit {
  id: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  trend?: 'up' | 'down' | 'stable';
}

function MainContent() {
  const [fruits, setfruits] = useState<Fruit[]>([]);
  
  useEffect(() => {
    getFruits();
  }, []);

  async function getFruits() {
    const { data } = await supabase.from("products").select();
    console.log(data)
    setfruits(data as Fruit[]);
  }

  return (
    <div className="container">
      <div className="title-banner">
        <h1>Los Precios del Mercado</h1>
        <span>Período: {new Date().toLocaleDateString()}</span>
      </div>

      <div className="header">
        <span>Producto</span>
        <span>Unidad</span>
        <span>Precio</span>
      </div>

      <ul className="list">
        {fruits.map((fruitso) => (
          <li className="list-item" key={fruitso.id}>
            <span className="product-name">
              {fruitso.name}
            </span>
            <span className="unit">{fruitso.description}</span>
            <span className="price">${fruitso.price.toLocaleString('es-us')} 
            <span className={`status-indicator status-${fruitso.trend || 'stable'}`}></span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <>
      <header>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}