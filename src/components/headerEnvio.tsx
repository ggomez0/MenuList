import { FaTruck } from 'react-icons/fa';

function HeaderEnvio() {
    return (
        <div className='header-envio'>
            <FaTruck className='header-envio_icon' size={20} />
            <span className='header-envio_title'>
                Envíos a partir de $30.000
            </span>
        </div>
    );
}

export default HeaderEnvio;