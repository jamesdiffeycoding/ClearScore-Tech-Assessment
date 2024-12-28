export default function SrtBtns({
  label,
  listClasses,
  lastSort,
  sortIdeas,
  filter,
  naturalOrder,
}) {
  return (
    <li
      className={`${listClasses} ${
        lastSort[0] == filter && lastSort[1] == naturalOrder
          ? "bg-purple-200 text-purple-800 hover:text-purple-900 hover:bg-purple-300 "
          : "bg-purple-800 hover:bg-purple-600"
      }`}
    >
      <button
        onClick={() => {
          sortIdeas(filter, naturalOrder);
        }}
      >
        <span className="bold-text">{label}</span>
      </button>
    </li>
  );
}
