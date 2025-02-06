import SortBtn from "./SortBtn";

export default function IdeaCardTopBtns({
  lastSort,
  sortIdeas,
  createNewIdea,
}) {
  return (
    <ul className="text-base font-bold rounded-lg cursor-pointer h-18 flex items-center justify-center">
      <li className={`${listClasses} bg-green-800 hover:bg-green-600`}>
        <button onClick={() => createNewIdea()}>Add new idea</button>
      </li>
      <SortBtn
        label="Newest"
        lastSort={lastSort}
        sortIdeas={sortIdeas}
        filter={"createdAt"}
        naturalOrder={true}
      />
      <SortBtn
        label="Oldest"
        lastSort={lastSort}
        sortIdeas={sortIdeas}
        filter={"createdAt"}
        naturalOrder={false}
      />
      <SortBtn
        label="Update time"
        lastSort={lastSort}
        sortIdeas={sortIdeas}
        filter={"lastUpdated"}
        naturalOrder={true}
      />
      <SortBtn
        label="Updated long ago"
        lastSort={lastSort}
        sortIdeas={sortIdeas}
        filter={"lastUpdated"}
        naturalOrder={false}
      />
      <SortBtn
        label="Title (A-Z)"
        lastSort={lastSort}
        sortIdeas={sortIdeas}
        filter={"title"}
        naturalOrder={true}
      />
      <SortBtn
        label="Title (Z-A)"
        lastSort={lastSort}
        sortIdeas={sortIdeas}
        filter={"title"}
        naturalOrder={false}
      />
    </ul>
  );
}
