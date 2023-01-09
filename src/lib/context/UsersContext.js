import { createContext } from 'react';

export const UsersContext = createContext(); // Creamos un contexto, la función createContext() no podemos usarla dentro de un componente ya que al hacer rerender volveríamos a crear este contexto.

// El contexto hay que exportarlo para que pueda ser usado en otros componentes.

// Context tiene 3 propiedades, una es Consumer la cual está deprecada y ya no se usa, otra es displayName que se utiliza para propositos de depuración, la última es Provider la cual nos permite delimitar que componentes pueden usar el contexto y proporcionar el contexto.
