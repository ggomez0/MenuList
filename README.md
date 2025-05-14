# MenuList - Lista de Precios

![image](https://github.com/user-attachments/assets/30a381d0-b525-4f48-9b78-cfa2c9c54bd1)

## Descripción del Proyecto

MenuList es una aplicación web desarrollada con React y TypeScript que permite a la frutería gestionar y mostrar su catálogo de productos de manera dinámica y atractiva. La aplicación utiliza Supabase como backend para almacenar y gestionar los datos de los productos.

## Funcionalidades Principales

### 1. Visualización de Productos

La página principal (`MainContent` en `App.tsx`) muestra una lista de productos activos con:
- Nombre del producto con un círculo de color personalizado
- Descripción o unidad de venta
- Precio
- Indicador visual de tendencia de precio (subiendo, bajando o estable)

Los productos se obtienen de Supabase y se filtran para mostrar solo los activos.

### 2. Administración de Productos

El panel de administración (`AdminPage.tsx`) permite:

- **Crear nuevos productos**: Formulario para ingresar nombre, descripción, color, precio y estado activo.
- **Editar productos existentes**: Modificar cualquier campo de un producto.
- **Eliminar productos**: Eliminar productos con confirmación.
- **Visualizar historial**: Ver la fecha de última actualización de cada producto.

## Modelo de Datos

La aplicación utiliza la siguiente estructura de datos para los productos:

```typescript
interface Fruit {
  id: string;          
  color: string;      
  name: string;        
  description: string;  
  price: number;        
  active: boolean;    
  trend: 'up' | 'down' | 'stable'; 
  updated_at: string; 
}
```

## Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/ggomez0/MenuList
   cd MenuList
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crear un archivo `.env` con las siguientes variables:
   ```
   VITE_SUPABASE_URL=<url-de-supabase>
   VITE_SUPABASE_ANON_KEY=<clave-anónima-de-supabase>
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
