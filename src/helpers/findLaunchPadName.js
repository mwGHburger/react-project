export const findLaunchPadName = (launchPads, site_id) => {
  // Array,prototype.find
  const launchPad = launchPads.find(launchPad => {
    return launchPad.id === site_id;
  });

  if (!launchPad) {
    return;
  }
  return launchPad.full_name;
};
