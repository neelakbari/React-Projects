export const tablereducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_ROW": {
      return {
        ...state,
        currentRow: {
          ...state.currentRow,
          [action.payload.label]: {
            ...state.currentRow[action.payload.label],
            [Number(action.payload.rowId)]: action.payload.itemType,
          },
        },
      };
    }
    case "SET_SELECTED_TYPE": {
      return {
        ...state,
        selectedItem: action.payload,
      };
    }
    case "SET_INPUT_VALUE": {
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
          action.payload.label === state.sortConfig.key &&
          state.sortConfig.direction === "asc"
        ) {
          action.payload.direction = "desc";
        }
        let sorted = state.filteredData;
        sorted = sorted.sort((a, b) =>
          action.payload.direction === "asc"
            ? a[action.payload.label] - b[action.payload.label]
            : b[action.payload.label] - a[action.payload.label]
        );
        return {
          ...state,
          sortConfig: {
            key: action.payload.label,
            direction: action.payload.direction,
          },
          filteredData: sorted,
        };
      }
    }
    case "SEARCH": {
      let filteredData = state.data;
      Object.entries(state.inputValues).forEach((arr) => {
        filteredData = filteredData.filter((item) => {
          return item[arr[0]]
            .toLowerCase()
            .includes(arr[1].trim().toLowerCase());
        });
      });
      return { ...state, filteredData };
    }
    default:
      return state;
  }
};
