import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found">
                <h1 className="not-found_title">404</h1>
                <p className="not-found_text">¡Oops! Página no encontrada</p>
                <p className="not-found_description">La página que estás buscando no existe o ha sido movida.</p>
                <Link to="/" className="not-found_button">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}

export default NotFound;