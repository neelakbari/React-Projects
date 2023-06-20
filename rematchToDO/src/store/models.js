export const todos = {
  state: { list: [] },
  reducers: {
    add: (state, payload) => ({ ...state, list: [...state.list, payload] }),
    remove: (state, payload) => ({
      ...state,
      list: state.list.filter((item) => item.id !== payload.id),
    }),
    check: (state, payload) => ({
      ...state,
      list: [
        ...state.list.map((data) =>
          data.id == payload.id ? { ...data, ischecked: !data.ischecked } : data
        ),
      ],
    }),
    update: (state, payload) => ({
      ...state,
      list: [...state.list.filter((item) => item.id !== payload.id), payload],
    }),
    toggleDescription:(state,payload)=>{
      return {
        ...state,
        list:[
          ...state.list.map((data)=>data.id === payload.id ?{...data,isDescriptionOpen:!data.isDescriptionOpen}:data)
        ]
      }
    },
    updateDescription:(state,payload)=>{
      console.log(state,payload)

      return {
        ...state,
        list:[
          ...state.list.map((data)=>data.id ===payload.id ?{...data,description:payload.description}:data)
        ]
      }
    }
  },
};
