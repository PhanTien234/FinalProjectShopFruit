import React, { createContext, useState } from 'react';

export const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(1); // Initial quantity

  return (
    <QuantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
};
