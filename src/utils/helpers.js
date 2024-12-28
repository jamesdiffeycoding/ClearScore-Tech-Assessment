import { v4 as uuidv4 } from "uuid";

export const DUMMY_IDEA_DATA = [
  {
    uuid: uuidv4(),
    title: "Click the plus icon to add a new idea!",
    details: "Let those good ideas find a place.",
    editing: false,
    createdAt: dateXMinutesAgo(3),
    lastUpdated: dateXMinutesAgo(3),
  },
  {
    uuid: uuidv4(),
    title: "Click the pencil to edit, or bin to delete cards!",
    details: "It is normal to have second thoughts!",
    editing: false,
    createdAt: dateXMinutesAgo(2),
    lastUpdated: dateXMinutesAgo(2),
  },
  {
    uuid: uuidv4(),
    title: "Sort the cards by their date or title!",
    details: "Or don't. It's your choice.",
    editing: false,
    createdAt: dateXMinutesAgo(1),
    lastUpdated: dateXMinutesAgo(1),
  },
];

export function dateXMinutesAgo(minutesAgo) {
  let currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() - minutesAgo);
  return currentDate;
}
export function formatDateForDisplay(date) {
  if (date === "") return "";
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // true gives AM/PM
  };
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString(undefined, dateOptions);
  const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions);
  return `${formattedTime}-${formattedDate}`;
}
