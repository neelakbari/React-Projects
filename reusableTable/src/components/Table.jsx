import React, { useEffect, useState } from "react";

const Table = ({ headers, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const sortedData = data.sort((a, b) => {
    // console.log(a[sortConfig.key])
    return sortConfig.direction === "asc"
      ? a[sortConfig.key] - b[sortConfig.key]
      : b[sortConfig.key] - a[sortConfig.key];
    // if (sortConfig.key !== null) {
    //   if (a[sortConfig.key] < b[sortConfig.key]) {
    //     return sortConfig.direction === 'asc' ? -1 : 1;
    //   }
    //   if (a[sortConfig.key] > b[sortConfig.key]) {
    //     return sortConfig.direction === 'asc' ? 1 : -1;
    //   }
    // }
    // return 0;
  });

  const handleSort = (key, has) => {
    console.log(sortedData);
    let direction = "asc";
    if (has) {
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map(({ name, hasInput }, index) => (
              <th key={index} onClick={() => handleSort(name, hasInput)}>
                {name}
                {sortConfig.key === name && (
                  <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              {/* {Object.values(item).map((value, index) => (
                <td key={index}>{value}</td>
              ))} */}
              {headers.map((column) => {
                return <td key={column.name}>{item[column.name]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
