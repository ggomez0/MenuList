import { turso } from './lib/turso';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import AdminPage from './components/AdminPage';
import HeaderEnvio from './components/headerEnvio';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
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

  useEffect(() => {
    const handler = () => window.print();
    const btn = document.getElementById('DownloadButton');
    btn?.addEventListener('click', handler);
    return () => btn?.removeEventListener('click', handler);
  }, []);

  async function getFruits() {
    try {
      const { rows } = await turso.execute("SELECT * FROM products ORDER BY name");
      setfruits(rows as unknown as Fruit[]);
    } catch (error) {
      console.error("Error fetching fruits:", error);
    }
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


    <Footer/>
  </>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
      <SpeedInsights/>
    </>  
  );
}