import "./IdeaCards.css";
import { useState, useEffect } from "react";
import { DUMMY_IDEA_DATA, formatDateForDisplay } from "../utils/helpers.js";
import IdeaCardSortBtns from "./IdeaCardSortBtns.jsx";
import TextareaAutosize from "react-textarea-autosize";

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
  const [indexBeingEdited, setIndexBeingEdited] = useState(null);
  const [editedInfo, setEditedInfo] = useState({
    title: "",
    details: "",
  });
  const editedInfoLengthClasses = {
    title:
      editedInfo.title.length > CHAR_LENGTH_LIMITS.TITLE.MAX
        ? CHAR_LIMIT_CLASSES.SURPASSED
        : editedInfo.title.length >= CHAR_LENGTH_LIMITS.TITLE.WARNING
        ? CHAR_LIMIT_CLASSES.CLOSE
        : CHAR_LIMIT_CLASSES.OK,
    details:
      editedInfo.details.length > CHAR_LENGTH_LIMITS.DETAILS.MAX
        ? CHAR_LIMIT_CLASSES.SURPASSED
        : editedInfo.details.length >= CHAR_LENGTH_LIMITS.DETAILS.WARNING
        ? CHAR_LIMIT_CLASSES.CLOSE
        : CHAR_LIMIT_CLASSES.OK,
  };

  const lengthsAreValid =
    editedInfo.title.length <= CHAR_LENGTH_LIMITS.TITLE.MAX &&
    editedInfo.details.length <= CHAR_LENGTH_LIMITS.DETAILS.MAX;

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
      id: sortedIdeas.length,
      title: "New Idea",
      details: "Details",
      createdAt: new Date(),
      lastUpdated: new Date(),
    };
    setSortedIdeas([...sortedIdeas, newIdea]);
    resetCards();
  }

  function editCard(index) {
    setIndexBeingEdited(index);
    setEditedInfo((prev) => ({
      ...prev,
      title: sortedIdeas[index].title,
      details: sortedIdeas[index].details,
    }));
  }

  function resetCards() {
    setEditedInfo({
      title: "",
      details: "",
    });
  }

  function handleChange(e, section) {
    let newValue = e.target.value;
    setEditedInfo((prev) => ({ ...prev, [section]: newValue }));
  }

  function updateValuesByIndex(index, newInformation) {
    if (!lengthsAreValid) {
      alert(
        "Please make sure your data is within the character limits."
      ); /* bad ux must change */
      return;
    }
    resetCards();
    const sortedIdeasCopy = [...sortedIdeas];
    sortedIdeasCopy[index].title = newInformation.title;
    sortedIdeasCopy[index].details = newInformation.details;
    sortedIdeasCopy[index].lastUpdated = new Date();
    setSortedIdeas(sortedIdeasCopy);
  }

  function deleteByIndex(index) {
    setSortedIdeas([
      ...sortedIdeas.slice(0, index),
      ...sortedIdeas.slice(index + 1, sortedIdeas.length),
    ]);
    resetCards();
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
        {sortedIdeas.map((storedIdea, currentCardIndex) => (
          <div className="card" key={storedIdea.id}>
            <TextareaAutosize
              class="textarea-title"
              value={editedInfo.title || storedIdea.title}
              onChange={(e) => handleChange(e, "title")}
            />
            <TextareaAutosize
              class="textarea-details"
              value={editedInfo.details || storedIdea.details}
              onChange={(e) => handleChange(e, "details")}
            />
            <p className={editedInfoLengthClasses.details}>
              {editedInfo.details ? editedInfo.details.length : 0} /{" "}
              {CHAR_LENGTH_LIMITS.DETAILS.MAX}
            </p>
            <button
              className="btn deleting-btn"
              onClick={() => deleteByIndex(currentCardIndex)}
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
