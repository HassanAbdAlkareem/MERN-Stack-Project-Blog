import { createContext, useContext, useEffect, useState } from "react";

const AlContext = createContext();

const FunctionAlContext = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AlContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AlContext.Provider>
  );
};

// custom context
const UseGlobelContext = () => {
  return useContext(AlContext);
};

export { FunctionAlContext, UseGlobelContext };
