export const myProductsReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SEARCH_STR":
      return { ...state, searchStr: action.payload };
    case "NEW_FILTER" :
      return {...state, ...action.payload}   
    default:
      return state;
  }
};

