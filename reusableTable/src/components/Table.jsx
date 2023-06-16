import React, { useReducer, useState } from "react";
import { tablereducer } from "../Reducers/tableReducer";

const Table = ({ headers, data }) => {
  const [state, dispatch] = useReducer(tablereducer, {
    headers,
    data,
    currentRow: {},
    selectedItem: "",
    sortConfig: {
      key: null,
      direction: "asc",
    },
    filteredData: data,
  });

  function handleCustomizableClick(rowId, label) {
    const selectedItem = state.currentRow[rowId] || null;
    if (selectedItem === null) {
      dispatch({
        type: "SET_CURRENT_ROW",
        payload: { label, rowId, itemType: "" },
      });
    }
  }
  function handleItemTypeSelect(label,rowId, itemType) {
    dispatch({ type: "SET_CURRENT_ROW", payload: { label ,rowId, itemType } });
  }

  const renderAdditionalItem = (label,rowId) => {
    const { currentRow } = state;
    const item = currentRow[label][rowId];
    if (!item) {
      return null;
    }
    let additionalItem = null;
    switch (item) {
      case "image":
        additionalItem = (
          <img
            src="https://www.kotaku.com.au/wp-content/uploads/sites/3/2021/09/10/Lost-In-Random%E2%84%A2_20210908204403-scaled.jpg"
            alt="Customizable Image"
            height={"50px"}
            width={"50px"}
          />
        );
        break;
      case "icon":
        additionalItem = <span className="icon">Icon</span>;
        break;
      case "other":
        additionalItem = <div>Some other element</div>;
        break;
      default:
        additionalItem = null;
        break;
    }
    return additionalItem;
  };
  return (
    <table>
      <thead>
        <tr>
          {headers.map(({ name, label, sort }, index) => {
            if (sort) {
              return (
                <th
                  key={index}
                  onClick={() => {
                    dispatch({
                      type: "SORT",
                      payload: { label, sort, direction: "asc" },
                    });
                  }}
                >
                  {name}
                  {state.sortConfig.key === label && (
                    <span>
                      {state.sortConfig.direction === "asc" ? " ▲" : " ▼"}
                    </span>
                  )}
                </th>
              );
            } else {
              return <th key={index}>{name}</th>;
            }
          })}
        </tr>
        <tr>
          {headers.map(({ label, hasInput }, index) => (
            <th key={index}>
              {hasInput && (
                <input
                  type="text"
                  placeholder={`search ${label}`}
                  id={label}
                  value={state.inputValues?.[label] || " "}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_INPUT_VALUE",
                      payload: { label, value: e.target.value },
                    });
                    dispatch({
                      type: "SEARCH",
                    });
                  }}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state.filteredData.map((row, index) => (
          <tr key={index}>
            {headers.map((column) =>
              column.isCustomizable ? (
                <td
                  key={column.label}
                  onClick={(e) => handleCustomizableClick(row.id, column.label)}
                >
                  <span>{row[column.label]}</span>

                  {state.currentRow?.[column.label] && (
                    <div>
                      {state.currentRow?.[column.label]?.[row.id] == "" && (
                        <>
                          <select
                            value={state.selectedItem || ""}
                            onChange={(e) =>
                              handleItemTypeSelect(column.label,row.id, e.target.value)
                            }
                          >
                            <option value="">Select item type</option>
                            <option value="image">Image</option>
                            <option value="icon">Icon</option>
                            <option value="other">Other</option>
                          </select>
                        </>
                      )}
                    </div>
                  )}
                  {state.currentRow?.[column.label]?.[row.id] && (
                    <div className="extra_item">
                        {renderAdditionalItem(column.label,row.id)}
                    </div>
                  )}
                </td>
              ) : (
                <td key={column.label}>{row[column.label]}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
// const [editValue, setEditValue] = useState(null);
//   const handleEdit=(value,target,event,label)=>{

//     // console.log(filteredData.id)
//     console.log(target)
//     let td = event.target
//     td.innerHTML = ""
//     let input = document.createElement('input')
//     input.setAttribute("type","text")
//     input.setAttribute("value",value)
//     input.onchange = (e)=>{e.preventDefault();setEditValue(e.target.value)}
//     td.append(input)
//     input.onkeyup =(e)=>{
//       console.log(e)
//       if (e.key === "Enter") {

//         backTONormal(target,label)
//       }
//     }

//     // filteredData.target
//   }
//   function backTONormal (target,label){
//     debugger
//     console.log(filteredData)
//     // filteredData = filteredData.filter((item)=>{
//     //   // console.log(target,label)
//     //   return {...item,
//     //     label:item["id"]===target ? editValue :item[label]
//     //   }
//     // })
//     console.log(filteredData)
//     // console.log(td)
// // td.innerHTML = editValue
//   }
// useEffect(() => {
//   // Apply sorting when filteredData changes
//   applySort();
//   applyFilter();
// }, [sortConfig, inputValue]);
// function handleValueChange(label, value) {
//   dispatch({type:"SET_INPUT_VALUE",payload:{label,value}})
// }
