import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Covertimos App en un componente pasandolo a mayúscula y devolviendo una función.
// Lo convertimos en un componente ya que una de las características de estos es que tienen su propio ciclo de vida, y App no es una excepción.

const container = document.getElementById('root');

// Le pasamos este componente para que React lo renderice en el Virtual DOM
createRoot(container).render(<App />);
