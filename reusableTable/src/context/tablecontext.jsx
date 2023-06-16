import { createContext, useContext, useState } from "react";

const Table = createContext();

const Context = ({ children ,headerss, datas}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [inputValue, setinputValue] = useState({});
  // const [filteredData, setfilteredData] = useState(data);
  return (
    <Table.Provider value={datas} >
      {children}
    </Table.Provider>
  );
};
export default Context;

export const tableContext = () => {
  return useContext(Table);
};
