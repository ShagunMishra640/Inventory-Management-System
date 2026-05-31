import { createContext, useState } from "react";

export const ManagerContext = createContext();

const ManagerProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <ManagerContext.Provider value={{ user, setUser }}>
      {children}
    </ManagerContext.Provider>
  );
};

export default ManagerProvider;