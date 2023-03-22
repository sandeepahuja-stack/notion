import { month } from "constants /month";


const getFullDate = (date, isTime) => {
  let d = new Date(date);
  let m = d.getMonth();
  m = month[m];
  const y = d.getFullYear();
  const dd = d.getDate();

  return `${m} ${dd}, ${y}  ${isTime ? `, ${getTime(d)}` : ""}`;
};

export const getTime = (date) => {
  let hours = date.getHours();
  
  hours = hours < 10 ? "0" + hours : hours;

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes;
};

export default getFullDate;
