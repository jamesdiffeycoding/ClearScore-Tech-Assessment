export { DUMMY_DATA, getFormattedDate };

const DUMMY_DATA = [
  {
    id: 0,
    title: "Click the plus icon to add a new idea!",
    details: "Let those good ideas find a place.",
    editing: false,
    createdAt: "18 Dec 24 | 8:12 am",
    lastUpdated: "19 Dec 24 | 5:30 pm", // 3 hours after createdAt
  },
  {
    id: 1,
    title: "Click the pencil to edit, or bin to delete cards!",
    details: "It is normal to have second thoughts!",
    editing: false,
    createdAt: "18 Dec 24 | 8:12 am",
    lastUpdated: "19 Dec 24 | 5:30 pm", // 3 hours after createdAt
  },
  {
    id: 2,
    title: "Sort the cards by their date or title!",
    details: "Or don't. It's your choice.",
    editing: false,
    createdAt: "18 Dec 24 | 8:12 am",
    lastUpdated: "19 Dec 24 | 5:30 pm", // 3 hours after createdAt
  },
];

function getFormattedDate(newDateObject) {
  const options = {
    year: "2-digit", // "24"
    month: "short", // "Dec"
    day: "numeric", // "1" (removes leading zero)
    hour: "2-digit", // "11"
    minute: "2-digit", // "03"
    hour12: true, // "am/pm"
  };

  // Format the date using `Intl.DateTimeFormat`
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    newDateObject
  );

  // Format the time as "am/pm", removing seconds
  const timeString = newDateObject
    .toLocaleTimeString("en-GB", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })
    .toLowerCase()
    .replace(/(.*)\s/, "$1");

  // Combine date and time without commas
  // Combine date and time correctly without a comma after the year
  const [day, month, year] = formattedDate.split(" ");
  return `${day} ${month} ${year.replace(",", "")} | ${timeString}`;
}
