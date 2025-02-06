import "./App.css";
import { useState, useEffect } from "react";
import { DUMMY_IDEA_DATA, formatDateForDisplay } from "./utils/helpers.js";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import BtnBar from "./components/BtnBar.jsx";

const LENGTH_LIMIT = {
  title: { max: 50, warning: 46 },
  details: { max: 140, warning: 120 },
};

const LENGTH_CLASSES = {
  warning: "text-base text-yellow-800 text-right p-0 m-0 mb-2",
  ok: "text-xs text-green-900 text-right p-0 m-0 mb-2",
};

export default function App() {
  const [sortedIdeas, setSortedIdeas] = useState([]);
  const [cardClickedUuid, setCardClickedUuid] = useState("");
  const currentIdea = cardClickedUuid
    ? sortedIdeas.find((idea) => idea.uuid === cardClickedUuid)
    : null;

  const lastSort = JSON.parse(localStorage.getItem("lastSort")) || [
    "firstLoad",
    true,
  ];

  const listClasses =
    "h-full m-2 rounded-md flex justify-center items-center p-1";

  const editedInfoLengthClasses = currentIdea
    ? {
        title:
          currentIdea.title.length > LENGTH_LIMIT.title.warning
            ? LENGTH_CLASSES.warning
            : LENGTH_CLASSES.ok,
        details:
          currentIdea.details.length > LENGTH_LIMIT.details.warning
            ? LENGTH_CLASSES.warning
            : LENGTH_CLASSES.ok,
      }
    : {}; 

  useEffect(() => {
    const locallyStoredIdeas = localStorage.getItem("sortedIdeas");
    if (locallyStoredIdeas) {
      setSortedIdeas(JSON.parse(locallyStoredIdeas));
    } else {
      setSortedIdeas(DUMMY_IDEA_DATA);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sortedIdeas", JSON.stringify(sortedIdeas));
  }, [sortedIdeas]);

  function createNewIdea() {
    const newIdea = {
      uuid: uuidv4(),
      title: "New Idea",
      details: "Details",
      createdAt: new Date(),
      lastUpdated: new Date(),
    };
    setSortedIdeas([...sortedIdeas, newIdea]);
  }

  function setCardBeingEdited(event, uuid) {
    setCardClickedUuid(uuid);
    if (event) {
      event.stopPropagation(); /* prevents resetCardBeingEdited triggering when a card is pressed.*/
    }
  }

  function resetCardBeingEdited() {
    setCardBeingEdited(null, "");
  }

  function handleChange(e, uuid, section) {
    // ensure new value is within char limits
    let newValue = e.target.value.slice(0, LENGTH_LIMIT[section].max);
    const updatedArray = sortedIdeas.map((idea) => {
      if (idea.uuid === uuid) {
        return { ...idea, [section]: newValue };
      }
      return idea;
    });
    setSortedIdeas(updatedArray);
  }

  function deleteById(uuid) {
    const updatedArray = sortedIdeas.filter((idea) => idea.uuid !== uuid);
    setSortedIdeas(updatedArray);
  }

  function sortIdeas(filter, naturalOrder) {
    const sortedIdeasCopy = [...sortedIdeas];
    localStorage.setItem("lastSort", JSON.stringify([filter, naturalOrder]));
    switch (filter) {
      case "createdAt":
        sortedIdeasCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "lastUpdated":
        sortedIdeasCopy.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
        break;
      case "title":
        sortedIdeasCopy.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        return sortedIdeasCopy;
    }
    if (naturalOrder) {
      setSortedIdeas(sortedIdeasCopy.toReversed());
    } else {
      setSortedIdeas(sortedIdeasCopy);
    }
  }

  return (
    <div className="bg-slate-800 text-white min-h-screen text-center">
      <header className="bg-slate-950 min-h-[8vh] flex flex-col justify-center items-center scaling-font">
        ClearScore Idea Board
      </header>
      <main className="pl-8 pr-8 flex flex-col items-center justify-center">
        <div className="flex justify-center items-center w-full h-full">
          <section className="flex justify-center">
            <div className="max-w-[1000px]">
              <BtnBar
                listClasses={listClasses}
                lastSort={lastSort}
                sortIdeas={sortIdeas}
                createNewIdea={createNewIdea}
              />
            </div>
          </section>
        </div>
        <section
          className="grid w-full gap-4 cst-grid-autofill-columns"
          onClick={() => resetCardBeingEdited()}
        >
          {sortedIdeas.map((storedIdea) => (
            <div
              className="bg-slate-900 text-black border-white border rounded-lg p-4 h-auto"
              key={storedIdea.uuid}
              onClick={(event) => setCardBeingEdited(event, storedIdea.uuid)}
            >
              <TextareaAutosize
                className="cst-textarea cst-textarea-title"
                value={storedIdea.title}
                onChange={(e) => handleChange(e, storedIdea.uuid, "title")}
              />
              {storedIdea.uuid === cardClickedUuid ? (
                <p className={editedInfoLengthClasses.title}>
                  {storedIdea.title ? storedIdea.title.length : 0} /
                  {LENGTH_LIMIT.title.max}
                </p>
              ) : (
                ""
              )}
              <TextareaAutosize
                className="cst-textarea cst-textarea-details"
                value={storedIdea.details}
                onChange={(e) => handleChange(e, storedIdea.uuid, "details")}
              />
              {storedIdea.uuid === cardClickedUuid ? (
                <p className={editedInfoLengthClasses.details}>
                  {storedIdea.details ? storedIdea.details.length : 0} /
                  {LENGTH_LIMIT.details.max}
                </p>
              ) : (
                ""
              )}
              <button
                className="cursor-pointer p-2 rounded text-base text-center bg-pink-200 hover:bg-red-400"
                onClick={() => deleteById(storedIdea.uuid)}
              >
                <img
                  src="delete.svg"
                  alt="delete trash can icon"
                  height="10"
                  width="15"
                />
              </button>
              <section className="text-[0.5rem] text-right text-white mb-2 w-full flex justify-between">
                <div>
                  <strong>CREATED: </strong>{" "}
                  {formatDateForDisplay(storedIdea.createdAt)}
                </div>
                <div>
                  <strong>UPDATED: </strong>{" "}
                  {formatDateForDisplay(storedIdea.lastUpdated)}
                </div>
              </section>
              <></>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
