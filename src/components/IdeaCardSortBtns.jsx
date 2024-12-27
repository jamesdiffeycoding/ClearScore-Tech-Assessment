import React, { useState } from "react";
import "./IdeaCardSortBtns.css"; // Assuming you're creating a separate CSS file

export default function IdeaCardSortBtns({ sortIdeas }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <section className="dropdown-container" onClick={toggleDropdown}>
      <button className="dropdown-toggle">Sort Options</button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <button
              onClick={() => {
                sortIdeas("createdAt", true);
                toggleDropdown(); // Close the dropdown after clicking
              }}
            >
              <span className="bold-text">Created</span>
              <span className="italic-text"> (recent first)</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("createdAt", false);
                toggleDropdown(); // Close the dropdown after clicking
              }}
            >
              <span className="bold-text">-</span>
              <span className="italic-text"> (oldest first)</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("lastUpdated", true);
                toggleDropdown(); // Close the dropdown after clicking
              }}
            >
              <span className="bold-text">Updated</span>
              <span className="italic-text"> (recent first)</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("lastUpdated", false);
                toggleDropdown(); // Close the dropdown after clicking
              }}
            >
              <span className="bold-text">-</span>
              <span className="italic-text"> (oldest first)</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("title", true);
                toggleDropdown(); // Close the dropdown after clicking
              }}
            >
              <span className="bold-text">Title</span>
              <span className="italic-text"> (A - Z)</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("title", false);
                toggleDropdown(); // Close the dropdown after clicking
              }}
            >
              <span className="bold-text">-</span>
              <span className="italic-text"> (Z - A)</span>
            </button>
          </li>
        </ul>
      )}
    </section>
  );
}
