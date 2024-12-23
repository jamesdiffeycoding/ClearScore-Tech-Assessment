import React, { useState } from "react";
import "./SortButtons.css"; // Assuming you're creating a separate CSS file

export default function SortButtons({ sortIdeasByTagAndDirection }) {
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
                sortIdeasByTagAndDirection("createdAt", true);
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
                sortIdeasByTagAndDirection("createdAt", false);
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
                sortIdeasByTagAndDirection("lastUpdated", true);
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
                sortIdeasByTagAndDirection("lastUpdated", false);
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
                sortIdeasByTagAndDirection("title", true);
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
                sortIdeasByTagAndDirection("title", false);
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
