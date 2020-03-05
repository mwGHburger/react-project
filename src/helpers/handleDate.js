export const handleDate = launch_date => {
  // handle date
  const dateString = launch_date.split("T")[0];
  const dateObj = new Date(dateString);
  const date = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  let dateSuffix = "th";
  if (date === 1 || date === 21 || date === 31) {
    dateSuffix = "st";
  } else if (date === 2 || date === 22) {
    dateSuffix = "nd";
  } else if (date === 3 || date === 23) {
    dateSuffix = "rd";
  }

  // get Month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return `${date}${dateSuffix} ${monthNames[month]} ${year}`;
};
