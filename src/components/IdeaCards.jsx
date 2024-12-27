import "./IdeaCards.css";
import { useState, useEffect } from "react";
import { DUMMY_IDEA_DATA, formatDateForDisplay } from "../utils/helpers.js";
import IdeaCardSortBtns from "./IdeaCardSortBtns.jsx";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";

const CHAR_LENGTH_LIMITS = {
  TITLE: { MAX: 50, WARNING: 43 },
  DETAILS: { MAX: 140, WARNING: 110 },
};

const CHAR_LIMIT_CLASSES = {
  SURPASSED: "char-limit-surpassed",
  CLOSE: "char-limit-close",
  OK: "char-limit-ok",
};

export default function IdeaCards() {
  const [sortedIdeas, setSortedIdeas] = useState([]);
  const [cardLastClicked, setCardLastClicked] = useState(""); /* state: UUIDs*/
  console.log(sortedIdeas);
  const currentIdea = cardLastClicked
    ? sortedIdeas.find((idea) => idea.uuid === cardLastClicked)
    : null;

  const editedInfoLengthClasses = currentIdea
    ? {
        title:
          currentIdea.title.length > CHAR_LENGTH_LIMITS.TITLE.MAX
            ? CHAR_LIMIT_CLASSES.SURPASSED
            : currentIdea.title.length >= CHAR_LENGTH_LIMITS.TITLE.WARNING
            ? CHAR_LIMIT_CLASSES.CLOSE
            : CHAR_LIMIT_CLASSES.OK,
        details:
          currentIdea.details.length > CHAR_LENGTH_LIMITS.DETAILS.MAX
            ? CHAR_LIMIT_CLASSES.SURPASSED
            : currentIdea.details.length >= CHAR_LENGTH_LIMITS.DETAILS.WARNING
            ? CHAR_LIMIT_CLASSES.CLOSE
            : CHAR_LIMIT_CLASSES.OK,
      }
    : {}; // Return an empty object if no idea is selected

  const lengthsAreValid =
    currentIdea &&
    currentIdea.title.length <= CHAR_LENGTH_LIMITS.TITLE.MAX &&
    currentIdea.details.length <= CHAR_LENGTH_LIMITS.DETAILS.MAX;

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

  function setCardBeingEdited(uuid) {
    setCardLastClicked(uuid);
  }

  function handleChange(e, uuid, section) {
    let newValue = e.target.value;
    const updatedArray = sortedIdeas.map((idea) => {
      if (idea.uuid === uuid) {
        return { ...idea, [section]: newValue };
      }
      return idea;
    });
    setSortedIdeas(updatedArray);
  }

  function updateValuesByIndex(index, newInformation) {
    if (!lengthsAreValid) {
      alert(
        "Please make sure your data is within the character limits."
      ); /* !!! bad ux must change */
      return;
    }
    const sortedIdeasCopy = [...sortedIdeas];
    sortedIdeasCopy[index].title = newInformation.title;
    sortedIdeasCopy[index].details = newInformation.details;
    sortedIdeasCopy[index].lastUpdated = new Date();
    setSortedIdeas(sortedIdeasCopy);
  }

  function deleteById(uuid) {
    const updatedArray = sortedIdeas.filter((idea) => idea.uuid !== uuid);
    setSortedIdeas(updatedArray);
  }

  function sortIdeas(category, reverseOrder) {
    const sortedIdeasCopy = [...sortedIdeas];
    switch (category) {
      case "createdAt":
        sortedIdeasCopy.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "lastUpdated":
        sortedIdeasCopy.sort(
          (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated)
        );
        break;
      case "title":
        sortedIdeasCopy.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        return sortedIdeasCopy;
    }
    if (reverseOrder) {
      setSortedIdeas(sortedIdeasCopy.toReversed());
    } else {
      setSortedIdeas(sortedIdeasCopy);
    }
  }

  return (
    <>
      <IdeaCardSortBtns sortIdeas={sortIdeas} />
      <section className="cards-container">
        {sortedIdeas.map((storedIdea) => (
          <div
            className="card"
            key={storedIdea.uuid}
            onClick={() => setCardBeingEdited(storedIdea.uuid)}
          >
            <TextareaAutosize
              className="textarea-title"
              value={storedIdea.title}
              onChange={(e) => handleChange(e, storedIdea.uuid, "title")}
            />
            {storedIdea.uuid === cardLastClicked ? (
              <p className={editedInfoLengthClasses.title}>
                {storedIdea.title ? storedIdea.title.length : 0} /{" "}
                {CHAR_LENGTH_LIMITS.TITLE.MAX}
              </p>
            ) : (
              ""
            )}
            <TextareaAutosize
              className="textarea-details"
              value={storedIdea.details}
              onChange={(e) => handleChange(e, storedIdea.uuid, "details")}
            />
            {storedIdea.uuid === cardLastClicked ? (
              <p className={editedInfoLengthClasses.details}>
                {storedIdea.details ? storedIdea.details.length : 0} /{" "}
                {CHAR_LENGTH_LIMITS.DETAILS.MAX}
              </p>
            ) : (
              ""
            )}
            <button
              className="btn deleting-btn"
              onClick={() => deleteById(storedIdea.uuid)}
            >
              <DeleteIcon />
            </button>
            <section className="card-dates">
              <div>Created: {formatDateForDisplay(storedIdea.createdAt)}</div>
              <div>Updated: {formatDateForDisplay(storedIdea.lastUpdated)}</div>
            </section>
            <></>
          </div>
        ))}

        <div className="create-card-container">
          <div className="create-outline">
            <button className="create-btn" onClick={() => createNewIdea()}>
              +
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// icons for buttons below
const EditIcon = () => (
  <img src="edit.svg" alt="edit pencil icon" height="10" width="15" />
);

const ConfirmEditIcon = () => (
  <img src="confirm_edit.svg" alt="tick icon" height="10w" width="15" />
);

const DeleteIcon = () => (
  <img src="delete.svg" alt="delete trash can icon" height="10" width="15" />
);
