import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import Login from './Login';

interface products {
  id: string;
  color: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  trend: 'up' | 'down' | 'stable';
  updated_at: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<products[]>([]);
  const [formData, setFormData] = useState<{
      id: string;
      color: string;
      name: string;
      description: string;
      price: string;
      active: boolean;
    }>({
    id: '',
    color: '#ff0000',
    name: '',
    description: '',
    price: "",
    active: true
  });
  const [search, setSearch] = useState("");
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Error al cerrar sesión');
    } else {
      setSession(null);
    }
  }

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('updated_at', { ascending: false });
    setProducts(data || []);
  }

  const handleEdit = async (id: string) => {
    const { data: product } = await supabase
      .from('products')
      .select()
      .eq('id', id)
      .single();
    
    if (product) {
      setFormData({
        id: product.id,
        color:product.color,
        name: product.name,
        description: product.description,
        price: product.price,
        active: product.active
      });
    }
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        fetchProducts();
      } else {
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      color: formData.color,
      active: formData.active,
      updated_at: new Date().toISOString()
    };

    let error;
    if (formData.id) {
      ({ error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', formData.id));
    } else {
      ({ error } = await supabase
        .from('products')
        .insert([payload]));
    }

    if (!error) {
      setFormData({ id: '', name: '', color:'', description: '', price: '', active: true });
      fetchProducts();
    } else {
      alert('Error al guardar el producto');
    }

    handleCloseDialog();
  };

  const handleOpenDialog = () => {
    setFormData({ id: '', name: '', color: '#ff0000', description: '', price: '', active: true });
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  };

  const handleCloseDialog = () => {
    const dialog = document.querySelector('dialog');
    dialog?.close();
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    (!session ? 
      <Login /> :      

    <div className="admin-page">
      <div className="title-banner">
        <h1>Administración</h1>
        <button className="logout-btn" onClick={handleLogout}>Salir</button>
      </div>

      <dialog>
        <form id="productForm" className="product-form" onSubmit={handleSubmit}>
          <input type="hidden" value={formData.id} />
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>  
          <div className="form-group">
            <label>Descripción:</label>
            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Color:</label>
            <input type="color" value={formData.color} onChange={e => setFormData({...formData, color:e.target.value })} required/>
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} step="0.01" required />
          </div>
          <div className="form-group checkbox-group">
            <label>Activo:</label>
            <input type="checkbox" checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })} />
          </div>
          <button type="button" className='close-dialog' onClick={() => handleCloseDialog()}>Cancelar</button>
          <button type="submit" className='add-product-btn'>Guardar</button>
        </form>
      </dialog>

      <div className='search-bar-container' style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <input
          id="search-product"
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-bar"
          autoComplete="off"
          style={{ flex: 1, minWidth: 0 }}
        />
        <button
          className="add-product-btn"
          onClick={handleOpenDialog}
          aria-label="Agregar Producto"
          type="button"
        >          
          Agregar Producto
        </button>
      </div>

      <div className="container">
        <div className="products-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Última Actualización</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map(product => (
              <tr>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{new Date(product.updated_at).toLocaleDateString()}</td>
                <td>{product.active ? 'Si' : 'No'}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(product.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
    </div>
  </div>
    )
  );
}
