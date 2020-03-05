export const handleMissionSuccess = (launch_success, land_success) => {
  if (launch_success && land_success) {
    return "";
  }
  return " Failed Mission";
};
