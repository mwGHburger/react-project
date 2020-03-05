export const handleTime = launch_date => {
  const timeString = launch_date.split("T")[1].split("-")[0];

  const timeArray = timeString.split(":");
  timeArray[0] = parseInt(timeArray[0], 10);

  let timeSuffix = "am";

  if (timeArray[0] === 12) {
    timeSuffix = "pm";
  } else if (timeArray[0] > 12 && timeArray[0] < 24) {
    timeArray[0] = timeArray[0] - 12;
    timeSuffix = "pm";
  } else if (timeArray[0] === 24) {
    timeArray[0] = 0;
  }
  return `${timeArray[0]}:${timeArray[1]}${timeSuffix}`;
};
