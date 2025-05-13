import { useEffect, useState } from "react";

function Footer() {
    const frases = ['Frutas y Verduras frescas directo a tu casa o comercio', 'Delivery de frutas y verduras al mejor precio', 'Aprovecha precios mayoristas sin salir de casa', 'Todo Fresco, Todo Natural ¡Consultanos!'];
    const [frase, setFrase] = useState('');

    function randomFrase() {
        const randomIndex = Math.floor(Math.random() * frases.length);
        setFrase(frases[randomIndex]);
    }

    useEffect(() => {
        randomFrase();
    }, []);

    return (
        <div className='footer'>
            <span>{frase}</span>
        </div>
    );
}

export default Footer;
