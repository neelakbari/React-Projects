import React, { useEffect, useState } from "react";

const Table = ({ headers, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [inputValue, setinputValue] = useState({});
  const [filteredData, setfilteredData] = useState(data);


  const handleSort = (key, has) => {
    let direction = "asc";
    if (has) {
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    }
  };
  const applySort = () => {
    const { key, direction } = sortConfig;
    if (key) {
      const sortedData = data.sort((a, b) => {
        // console.log(a[sortConfig.key])
        // return sortConfig.direction === "asc"
        //   ? a[sortConfig.key] - b[sortConfig.key]
        //   : b[sortConfig.key] - a[sortConfig.key];
        if (key !== null) {
          if (a[key] < b[key]) {
            return direction === "asc" ? -1 : 1;
          }
          if (a[key] > b[key]) {
            return direction === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
      setfilteredData(sortedData);
      console.log(filteredData)
    }
  };
  useEffect(() => {
    // Apply sorting when filteredData changes
    // debugger
    console.log(filteredData)
    applySort();
    applyFilter();
  }, [sortConfig,inputValue]);

  const handleValueChange = (name, inputValue) => {
    setinputValue((prev) => {
      return {
        ...prev,
        [name]: inputValue,
      };
    });
    applySort();
    applyFilter();
  };
  const applyFilter = () => {
    let filteredData = data;
    Object.entries(inputValue).forEach(([name, inputValue]) => {
      if (inputValue) {
        filteredData = filteredData.filter(item =>
          item[name].toLowerCase().includes(inputValue.trim().toLowerCase())
        );
        setfilteredData(filteredData);
        console.log(filteredData,"DS")
      }
    });
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map(({ name, label, sort }, index) => (
              <th key={index} onClick={() => handleSort(label, sort)}>
                {name}
                {sortConfig.key === label && (
                  <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
            ))}
          </tr>
          <tr>
            {headers.map(({label,hasInput,}, index) => (
              <th key={index}>
                {hasInput && (
                  <input
                    type="text"
                    placeholder={`search ${label}`}
                    id={label}
                    value={inputValue.label}
                    onChange={(e) => handleValueChange(label, e.target.value)}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {console.log(filteredData.map((item)=>item.id))}
          {filteredData.map((item, index) => (
            <tr key={index}>
              {/* {Object.values(item).map((inputValue, index) => (
                <td key={index}>{inputValue}</td>
              ))} */}
              {headers.map((column) => {
                return <td key={column.label}>{item[column.label]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
