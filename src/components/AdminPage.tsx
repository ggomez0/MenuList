import { useEffect, useState, type FormEvent } from 'react';
import { tursoAdmin } from '../lib/turso';
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";

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

  useEffect(() => {
    fetchProducts();
  }, []);



  async function fetchProducts() {
    const { rows } = await tursoAdmin.execute("SELECT * FROM products ORDER BY updated_at DESC");
    setProducts(rows.map(r => ({ ...r, active: Boolean(r.active) })) as unknown as products[]);
  }

  const handleEdit = async (id: string) => {
    const { rows } = await tursoAdmin.execute({
      sql: "SELECT * FROM products WHERE id = ?",
      args: [id]
    });
    const product = rows[0] as unknown as products;
    
    if (product) {
      setFormData({
        id: product.id,
        color:product.color,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        active: product.active
      });
    }
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await tursoAdmin.execute({
          sql: "DELETE FROM products WHERE id = ?",
          args: [id]
        });
        fetchProducts();
      } catch (error) {
        alert(error);
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

    try {
      if (formData.id) {
        await tursoAdmin.execute({
          sql: "UPDATE products SET name = ?, description = ?, price = ?, color = ?, active = ?, updated_at = ? WHERE id = ?",
          args: [payload.name, payload.description, payload.price, payload.color, payload.active ? 1 : 0, payload.updated_at, formData.id]
        });
      } else {
        await tursoAdmin.execute({
          sql: "INSERT INTO products (name, description, price, color, active, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
          args: [payload.name, payload.description, payload.price, payload.color, payload.active ? 1 : 0, payload.updated_at]
        });
      }
      setFormData({ id: '', name: '', color:'', description: '', price: '', active: true });
      fetchProducts();
    } catch (e) {
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
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="admin-page">
          <div className="title-banner">
            <h1>Administración</h1>
            <UserButton />
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
    </SignedIn>
    </>
  );
}
