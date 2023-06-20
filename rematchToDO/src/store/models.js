export const todos = {
  state: [],
  reducers: {
    add: (state, payload) => [...state, payload],
    remove: (state, payload) => {
      return state.filter((item) => item.id !== payload.id);
    },
    check: (state, payload) => {
      return state.map((data) =>
        data.id == payload.id ? { ...data, ischecked: !data.ischecked } : data
      );
    },
    update: (state, payload) => {
      return [...state.filter((item) => item.id !== payload.id), payload];
    },
    toggleDescription: (state, payload) => {
      return state.map((data) =>
        data.id === payload.id
          ? { ...data, isDescriptionOpen: !data.isDescriptionOpen }
          : data
      );
    },
    updateDescription: (state, payload) => {
      return state.map((data) =>
        data.id === payload.id
          ? { ...data, description: payload.description }
          : data
      );
    },
  },
};
