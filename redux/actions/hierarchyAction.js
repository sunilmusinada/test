export function getHierarchy(Assets) {
  return { type: "GET_HIERARCHY", Assets };
}
export const getStepperAction = SelectedTab => ({
  type: "TAB_SELECTED",
  SelectedTab
});

// export const StepperFilter = {
//   CURRENT_TAB_TITLE: "",
//   CURRENT_STEPPER_STATUS_COMPLETED: false
// };
