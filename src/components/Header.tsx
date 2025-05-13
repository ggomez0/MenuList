function Header() {
    return (
      <>
        <div className="header-banner">
          <div className="header-info">
            <div className="header-logo">
              <img src="/logo.png" alt="Logo" />
              <div className="header-title">
                <h1>Morena</h1>
                <h3>Frutas y Verduras</h3>
              </div>
            </div>
          </div>
  
          <div className="header-contact">
              <span className="factura">Emitimos Factura C</span>
            <a
              href="https://api.whatsapp.com/send?phone=5493876291409"
              target="_blank"
              className="whatsapp-link"
              rel="noopener noreferrer"
            >
              <img src="/whatsapp.svg" alt="Whatsapp" className="whatsapp" />
              <span>Contacto</span>
            </a>
            <span className="date">Fecha: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </>
    );
  }
  
export default Header;
  