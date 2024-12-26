import "./IdeaCards.css";
import { useState, useEffect } from "react";
import { DUMMY_IDEA_DATA, formatDateForDisplay } from "../helpers.js";
import IdeaCardSortBtns from "./IdeaCardSortBtns.jsx";

export default function IdeaCards() {
  /* ========== CONSTS FOR DATA RELATED TO CHARACTER LIMITS ========== */
  // hard-coded character limits for title and details

  console.log(formatDateForDisplay("2024-07-01T00:15:00"));
  const CHAR_LENGTH_LIMITS = {
    TITLE: { MAX: 50, WARNING: 43 },
    DETAILS: { MAX: 140, WARNING: 110 },
  };

  // class names depending on character limit status (used for styling and preventing submissions)
  // these class names are declared here to prevent typos and to make changes easier
  const CHAR_LIMIT_CLASSES = {
    SURPASSED: "character-limit-surpassed",
    CLOSE: "character-limit-close",
    OK: "character-limit-ok",
  };

  /* =============================================================== */
  /* =========================== STATES ============================ */
  // ideas that are mapped on the screen
  const [sortedIdeas, setSortedIdeas] = useState([]);

  // index of the card being edited, null if no card is being edited
  const [indexBeingEdited, setIndexBeingEdited] = useState(null);

  // object to store edited information
  const [editedInfo, setEditedInfo] = useState({
    title: "",
    details: "",
  });

  // object to store classes for character limit warnings
  const [editedInfoLengthClasses, setEditedInfoLengthClasses] = useState({
    title: "",
    details: "",
  });

  // boolean to check if all character limits are valid, used to prevent updating with invalid lengths
  const [lengthsAreValid, setlengthsAreValid] = useState(false);

  /* =============================================================== */
  /* ======================== USE EFFECTS ========================== */

  // local storage useEffect to load previous or dummy data on page load
  useEffect(() => {
    const locallyStoredIdeas = localStorage.getItem("sortedIdeas");
    if (locallyStoredIdeas) {
      setSortedIdeas(JSON.parse(locallyStoredIdeas));
    } else {
      setSortedIdeas(DUMMY_IDEA_DATA);
    }
  }, []);

  // local storage useEffect to save data whenever changes are made to sortedIdeas
  useEffect(() => {
    localStorage.setItem("sortedIdeas", JSON.stringify(sortedIdeas));
  }, [sortedIdeas]);

  // char limit useEffects -------------------------
  // update titleLengthClass based on current edited title length
  useEffect(() => {
    if (editedInfo.title.length > CHAR_LENGTH_LIMITS.TITLE.MAX) {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        title: CHAR_LIMIT_CLASSES.SURPASSED,
      }));
    } else if (editedInfo.title.length >= CHAR_LENGTH_LIMITS.TITLE.WARNING) {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        title: CHAR_LIMIT_CLASSES.CLOSE,
      }));
    } else {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        title: CHAR_LIMIT_CLASSES.OK,
      }));
    }
  }, [editedInfo.title]);

  // update detailsLengthClass based on current edit details length
  useEffect(() => {
    if (editedInfo.details.length > CHAR_LENGTH_LIMITS.DETAILS.MAX) {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        details: CHAR_LIMIT_CLASSES.SURPASSED,
      }));
    } else if (
      editedInfo.details.length >= CHAR_LENGTH_LIMITS.DETAILS.WARNING
    ) {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        details: CHAR_LIMIT_CLASSES.CLOSE,
      }));
    } else {
      setEditedInfoLengthClasses((prev) => ({
        ...prev,
        details: CHAR_LIMIT_CLASSES.OK,
      }));
    }
  }, [editedInfo.details]);

  // update lengthsAreValid based on current title and detail
  useEffect(() => {
    setlengthsAreValid(
      editedInfoLengthClasses.title !== CHAR_LIMIT_CLASSES.SURPASSED &&
        editedInfoLengthClasses.details !== CHAR_LIMIT_CLASSES.SURPASSED
    );
  }, [editedInfo]);

  /* ============================================================== */
  /* ===================== CRUD FUNCTIONS ========================= */
  function createNewIdea() {
    const newIdea = {
      id: sortedIdeas.length,
      title: "New Idea",
      details: "Details",
      createdAt: new Date(),
      lastUpdated: new Date(),
    };
    setSortedIdeas([...sortedIdeas, newIdea]);
    editCard(null);
  }

  function editCard(index) {
    setIndexBeingEdited(index);
    if (index === null) {
      // reset editedInfo when not editing
      setEditedInfo({
        title: "",
        details: "",
      });
    } else {
      setEditedInfo((prev) => ({
        ...prev,
        title: sortedIdeas[index].title,
        details: sortedIdeas[index].details,
      }));
    }
  }

  // handles text changes in input boxes
  function handleChange(e, section) {
    let newValue = e.target.value;
    setEditedInfo((prev) => ({ ...prev, [section]: newValue }));
  }

  function updateValuesByIndex(index, newInformation) {
    if (!lengthsAreValid) {
      // alerts use if max character lengths are exceeded
      alert("Please make sure your data is within the character limits.");
      return;
    }
    // reset indexBeingEdited to null
    editCard(null);
    // update values in a copy of the array
    const sortedIdeasCopy = [...sortedIdeas];
    sortedIdeasCopy[index].title = newInformation.title;
    sortedIdeasCopy[index].details = newInformation.details;
    sortedIdeasCopy[index].lastUpdated = new Date();
    // set the sortedIdeas to the updated array
    setSortedIdeas(sortedIdeasCopy);
  }

  function deleteByIndex(index) {
    setSortedIdeas([
      ...sortedIdeas.slice(0, index),
      ...sortedIdeas.slice(index + 1, sortedIdeas.length),
    ]);
    editCard(null);
  }

  /* ============================================================== */
  /* ===================== SORT FUNCTION ========================= */
  function sortIdeas(criteria, reverseOrder) {
    // Copy sortedIdeas array
    const sortedIdeasCopy = [...sortedIdeas];

    // Use a switch to decide the sorting logic
    switch (criteria) {
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

    // Reverse the order if reverseOrder is false
    if (reverseOrder) {
      setSortedIdeas(sortedIdeasCopy.reverse());
    } else {
      // Update sortedIdeas
      setSortedIdeas(sortedIdeasCopy);
    }
  }

  /* ============================================================== */
  /* =================== REUSABLE COMPONENTS ====================== */
  // renders buttons
  // toggles first button between "edit" and "confirm update" buttons depending on isEditing value.
  // updates classnames and styles based on isEditing and lengthsAreValid values to improve UX.
  const RenderButtons = (index, isEditing) => (
    <section className="cards-btns-container">
      <button
        className={`btn ${
          isEditing
            ? lengthsAreValid
              ? "editing-confirmation-btn"
              : ""
            : "editing-btn"
        }`}
        onClick={() =>
          isEditing
            ? updateValuesByIndex(index, {
                title: editedInfo.title,
                details: editedInfo.details,
              })
            : editCard(index)
        }
      >
        {isEditing ? <ConfirmEditIcon /> : <EditIcon />}
      </button>
      <button className="btn deleting-btn" onClick={() => deleteByIndex(index)}>
        <DeleteIcon />
      </button>
    </section>
  );

  // renders text area and character count
  // field is currently either "title" or "details"

  const RenderTextAreaAndCharCount = (field, maxLength) => (
    <>
      <textarea
        className={`textarea-${field}`}
        value={editedInfo[field] || storedIdea[field]}
        onChange={(e) => handleChange(e, field)}
      />
      <p className={editedInfoLengthClasses[field]}>
        {editedInfo[field] ? editedInfo[field].length : 0} / {maxLength}
      </p>
    </>
  );

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

  /* =============================================================== */
  /* ======================== RENDERING ============================ */
  return (
    <>
      <IdeaCardSortBtns sortIdeas={sortIdeas} />
      <section className="cards-container">
        {sortedIdeas.map((storedIdea, currentCardIndex) => (
          <div className="card" key={storedIdea.id}>
            <section className="card-dates">
              <div>Created: {formatDateForDisplay(storedIdea.createdAt)}</div>
              <div>Updated: {formatDateForDisplay(storedIdea.lastUpdated)}</div>
            </section>

            {indexBeingEdited === currentCardIndex ? (
              <>
                {RenderTextAreaAndCharCount(
                  "title",
                  CHAR_LENGTH_LIMITS.TITLE.MAX
                )}
                {RenderTextAreaAndCharCount(
                  "details",
                  CHAR_LENGTH_LIMITS.DETAILS.MAX
                )}
                {RenderButtons(currentCardIndex, true)}
              </>
            ) : (
              <>
                <div className="card-title">{storedIdea.title}</div>
                <div className="card-details">{storedIdea.details}</div>

                {RenderButtons(currentCardIndex, false)}
              </>
            )}
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
