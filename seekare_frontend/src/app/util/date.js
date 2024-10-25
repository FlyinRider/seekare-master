export const postedTimeFormat = (timeString) => {
  const dateString = new Date(timeString);
  const newDate = new Date(dateString.getTime());
  newDate.setHours(newDate.getHours() - 8);
  console.log(new Date(timeString).getMonth())
  const date = `${new Date(newDate).getMonth() + 1 > 9 ? new Date(newDate).getMonth() + 1 : `0${new Date(newDate).getMonth() + 1}`}-${new Date(newDate).getDate() > 9 ? new Date(newDate).getDate() : `0${new Date(newDate).getDate()}`}-${new Date(newDate).getFullYear()}`;
  const time = new Date(newDate).toISOString().split("T")[1].slice(0, 5);

  return `${date} at ${time}`;
};

export const getDateTime = (timeString) => {
  const date = timeString.split("T")[0];
  const time = timeString.split("T")[1].slice(0, 5);

  return {
    date,
    time,
  };
};

export const getTimeDiff = (firstTime, secondTime) => {
  // get total seconds between the times
  let delta = Math.abs(secondTime - firstTime) / 1000;

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  const seconds = Math.floor(delta % 60, 10); // in theory the modulus is not required

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
