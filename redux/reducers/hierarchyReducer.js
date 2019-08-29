export default function hierarchyReducer(state = [], action) {
  switch (action.type) {
    case "GET_HIERARCHY":
      return [...state, ...action.Assets];

    default:
      return state;
  }
}
