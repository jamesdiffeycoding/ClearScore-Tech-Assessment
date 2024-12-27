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
                toggleDropdown();
              }}
            >
              <span className="bold-text">Creation date /\</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("createdAt", false);
                toggleDropdown();
              }}
            >
              <span className="bold-text">Creation date \/</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("lastUpdated", true);
                toggleDropdown();
              }}
            >
              <span className="bold-text">Last updated /\</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("lastUpdated", false);
                toggleDropdown();
              }}
            >
              <span className="bold-text">Last updated \/</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("title", true);
                toggleDropdown();
              }}
            >
              <span className="bold-text">Title (A-Z)</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                sortIdeas("title", false);
                toggleDropdown();
              }}
            >
              <span className="bold-text">Title (Z-A)</span>
            </button>
          </li>
        </ul>
      )}
    </section>
  );
}
