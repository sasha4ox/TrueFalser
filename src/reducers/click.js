export default function click(state = {}, action) {
  switch (action.type) {
    case "CLICKED":
      return {
        ...state,
        did: action.payload,
      };
    default:
      return state;
  }
}
