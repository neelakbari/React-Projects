import React, { useEffect, useState } from "react";
import { data1 } from "../data";

const Table = ({ headers, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [inputValue, setinputValue] = useState({});
  const [filteredData, setfilteredData] = useState(data);
  const [editValue, setEditValue] = useState(null);
  const handleEdit=(value,target,event,label)=>{
    
    // console.log(filteredData.id)
    console.log(target)
    let td = event.target
    td.innerHTML = ""
    let input = document.createElement('input')
    input.setAttribute("type","text")
    input.setAttribute("value",value)
    input.onchange = (e)=>{e.preventDefault();setEditValue(e.target.value)}
    td.append(input)
    input.onkeyup =(e)=>{
      console.log(e)
      if (e.key === "Enter") {
        
        backTONormal(target,label)
      }
    }
    
    // filteredData.target
  }
  function backTONormal (target,label){
    debugger
    console.log(filteredData)
    // filteredData = filteredData.filter((item)=>{
    //   // console.log(target,label)
    //   return {...item,
    //     label:item["id"]===target ? editValue :item[label] 
    //   }
    // })
    console.log(filteredData)
    // console.log(td)
// td.innerHTML = editValue
  }
  function handleEditvalue(e){
    console.log(e)
  }
  useEffect(() => {
    // Apply sorting when filteredData changes
    applySort();
    applyFilter();
  }, [sortConfig, inputValue]);

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
      console.log(filteredData);
    }
  };

  const handleValueChange = (label, value) => {
    setinputValue((prev) => {
      return {
        ...prev,
        [label]: value,
      };
    });
  };
  const applyFilter = () => {
    let filteredData = data;
    Object.entries(inputValue).forEach(([label, value]) => {
      if (value) {
        filteredData = filteredData.filter((item) =>
          item[label].toLowerCase().includes(value.trim().toLowerCase())
        );
        setfilteredData(filteredData);
      }
    });
  };
 
 
  return (      
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
            {headers.map(({ label, hasInput }, index) => (
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
          {filteredData.map((item, index) => (
            <tr key={index}>
              {/* {Object.values(item).map((inputValue, index) => (
                <td key={index}>{inputValue}</td>
              ))} */}
              {headers.map((column) =>
                column.isEditable ? (
                  <td
                    key={column.label}
                    // contentEditable="true" onInput={(e)=>handleEdit(item[column.label], item.id,e)}
                    onClick={(e) =>{
                      setEditValue(item[column.label]);
                      handleEdit(item[column.label], item.id,e,column.label)
                    }
                    }
                  >
                    {item[column.label]}
                  </td>
                ) : (
                  <td key={column.label}>{item[column.label]}</td>
                )
              )}
              
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default Table;
