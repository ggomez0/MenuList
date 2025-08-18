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
            <div className="info-section">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" id="DownloadButton" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 11l5 5l5 -5" />
                        <path d="M12 4l0 12" />
                      </svg>            
               </div>
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
  