export default function stepperReducer(state = null, action) {
  switch (action.type) {
    case "TAB_SELECTED":
      return [...state, action.SelectedTab];

    default:
      return state;
  }
}
