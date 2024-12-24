export { DUMMY_DATA, formatDate };

function dateCreator(minutesAgo) {
  let currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() - minutesAgo);
  return currentDate;
}
const DUMMY_DATA = [
  {
    id: 0,
    title: "Click the plus icon to add a new idea!",
    details: "Let those good ideas find a place.",
    editing: false,
    createdAt: dateCreator(3),
    lastUpdated: dateCreator(3),
  },
  {
    id: 1,
    title: "Click the pencil to edit, or bin to delete cards!",
    details: "It is normal to have second thoughts!",
    editing: false,
    createdAt: dateCreator(2),
    lastUpdated: dateCreator(2),
  },
  {
    id: 2,
    title: "Sort the cards by their date or title!",
    details: "Or don't. It's your choice.",
    editing: false,
    createdAt: dateCreator(1),
    lastUpdated: dateCreator(1),
  },
];
const formatDate = (date) => {
  if (date === "") return "";

  // Define the options for formatting the date
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Define the options for formatting the time
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format (AM/PM)
  };

  // Create a new Date object from the input date
  const dateObj = new Date(date);

  // Format the date part
  const formattedDate = dateObj.toLocaleDateString(undefined, dateOptions);

  // Format the time part
  const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions);

  // Combine both date and time
  return `${formattedDate} | ${formattedTime}`;
};
