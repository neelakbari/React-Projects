import React, { useReducer, useState } from "react";

const Table = ({ headers, data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const tablereducer = (state, action) => {
    switch (action.type) {
      case "SET_CURRENT_ROW": {
        return {
          ...state,
          currentRow: action.payload,
          selectedItem: null,
        };
      }
      case"SET_SELECTED_TYPE":{
        console.log(state)
        console.log(action.payload)
        return {
          ...state,
          selectedItem:action.payload
        }
      }
      case "SET_INPUT_VALUE": {
        console.log(state);
        return {
          ...state,
          inputValues: {
            ...state.inputValues,
            [action.payload.label]: action.payload.value,
          },
        };
      }
      case "SORT": {
        if (action.payload.sort) {
          if (
            action.payload.label === sortConfig.key &&
            sortConfig.direction === "asc"
          ) {
            action.payload.direction = "desc";
          }
          setSortConfig({
            key: action.payload.label,
            direction: action.payload.direction,
          });
          let sorted = state.data;
          sorted = sorted.sort((a, b) =>
            action.payload.direction === "asc"
              ? a[action.payload.label] - b[action.payload.label]
              : b[action.payload.label] - a[action.payload.label]
          );
          return { ...state, data: sorted };
        }
      }
      case "SEARCH": {
        let filteredData = data;
        Object.entries(state.inputValues).forEach((arr) => {
          filteredData = filteredData.filter((item) => {
            return item[arr[0]]
              .toLowerCase()
              .includes(arr[1].trim().toLowerCase());
          });
        });
        return { ...state, data: filteredData };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(tablereducer, {
    headers,
    data,
  });
  
  function handleCustomizableClick(rowId) {
    setCurrentRow(rowId);
    setSelectedItemType(null);
  }
  function handleItemTypeSelect(optionValue) {
    setSelectedItemType(optionValue);
  }

  const renderAdditionalItem = () => {
    if (state.currentRow === null || state.selectedItem === null) {
      return null;
    }

    let additionalItem = null;
    switch (state.selectedItem) {
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
          {headers.map(({ name, label, sort }, index) => (
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
        {state.data.map((row, index) => (
          <tr key={index}>
            {headers.map((column) =>
              column.isCustomizable ? (
                <td
                  key={column.label}
                  onClick={(e) => {
                    dispatch({ type: "SET_CURRENT_ROW", payload: row.id });
                  }}
                >
                  {row[column.label]}
                  {state.currentRow === row.id && (
                    <div>
                      {state.selectedItem ? (
                        renderAdditionalItem()
                      ) : (
                        <select
                          value={state?.selectedItem || ""}
                          onChange={(e) => dispatch({type:"SET_SELECTED_TYPE",payload:e.target.value})}
                        >
                          <option value="">Select item type</option>
                          <option value="image">Image</option>
                          <option value="icon">Icon</option>
                          <option value="other">Other</option>
                        </select>
                      )}
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