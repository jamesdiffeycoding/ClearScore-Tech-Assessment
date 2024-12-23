import "./IdeaCards.css";
import { useState, useEffect } from "react";
import { DUMMY_DATA, getFormattedDate } from "../helpers.js";

export default function IdeaCards() {
  /* ========== CONSTS FOR DATA RELATED TO CHARACTER LIMITS ========== */
  // hard-coded character limits for title and details
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

  /* =========================== STATES ============================= */
  // ideas that are mapped on the screen
  const [ideasDisplayed, setIdeasDisplayed] = useState([]);

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
  const [allLengthsValid, setAllLengthsValid] = useState(false);

  /* ======================== USE EFFECTS ========================== */
  // local storage useEffect to load previous or dummy data
  useEffect(() => {
    const locallyStoredIdeas = localStorage.getItem("ideasDisplayed");
    if (locallyStoredIdeas) {
      setIdeasDisplayed(JSON.parse(locallyStoredIdeas));
    } else {
      setIdeasDisplayed(DUMMY_DATA);
    }
  }, []);

  // local storage useEffect to save data whenever changes are made
  useEffect(() => {
    localStorage.setItem("ideasDisplayed", JSON.stringify(ideasDisplayed));
  }, [ideasDisplayed]);

  // char limit useEffects -------------------------
  // update titleLengthClass
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

  // update detailsLengthClass
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

  // update allLengthsValid
  useEffect(() => {
    setAllLengthsValid(
      editedInfoLengthClasses.title !== CHAR_LIMIT_CLASSES.SURPASSED &&
        editedInfoLengthClasses.details !== CHAR_LIMIT_CLASSES.SURPASSED
    );
  }, [editedInfo]);

  /* ===================== CRUD FUNCTIONS ======================= */
  function createNewIdea() {
    const newIdea = {
      id: ideasDisplayed.length,
      title: "New Idea",
      details: "Details",
      createdAt: getFormattedDate(new Date()),
      lastUpdated: "",
    };
    setIdeasDisplayed([...ideasDisplayed, newIdea]);
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
        title: ideasDisplayed[index].title,
        details: ideasDisplayed[index].details,
      }));
    }
  }

  // handles text changes in input boxes
  function handleChange(e, section) {
    let newValue = e.target.value;
    setEditedInfo((prev) => ({ ...prev, [section]: newValue }));
  }

  function updateValuesByIndex(index, newInformation) {
    if (!allLengthsValid) {
      // alerts use if max character lengths are exceeded
      alert("Please make sure your data is within the character limits.");
      return;
    }
    // reset indexBeingEdited to null
    editCard(null);
    // update values in a copy of the array
    const ideasDisplayedCopy = [...ideasDisplayed];
    ideasDisplayedCopy[index].title = newInformation.title;
    ideasDisplayedCopy[index].details = newInformation.details;
    ideasDisplayedCopy[index].lastUpdated = getFormattedDate(new Date());
    // set the ideasDisplayed to the updated array
    setIdeasDisplayed(ideasDisplayedCopy);
  }

  function deleteByIndex(index) {
    setIdeasDisplayed([
      ...ideasDisplayed.slice(0, index),
      ...ideasDisplayed.slice(index + 1, ideasDisplayed.length),
    ]);
    editCard(null);
  }

  /* ===================== REUSABLE COMPONENTS ======================= */
  // renders buttons
  // toggles first button between "edit" and "confirm update" buttons depending on isEditing value.
  // updates classnames and styles based on isEditing and allLengthsValid values to improve UX.
  const RenderButtons = (index, isEditing) => (
    <section className="cards-btns-container">
      <button
        className={`btn ${
          isEditing
            ? allLengthsValid
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

  return (
    <>
      {ideasDisplayed.map((storedIdea, currentCardIndex) => (
        <div className="card" key={storedIdea.id}>
          <section className="card-dates">
            <div>Created: {storedIdea.createdAt}</div>
            <div>Updated: {storedIdea.lastUpdated}</div>
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
    </>
  );
}
