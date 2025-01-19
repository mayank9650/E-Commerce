import React, { useState } from 'react';
import './singleSelect.css'; // Make sure to import the CSS
import Button from '../../atoms/button/Button';
import { TEXT_CONSTANS } from '../../constants';

const SingleSelect = ({ options, onConfirm }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Single selected option
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update single selected option
  };

  const handleConfirm = () => {
    onConfirm(selectedOption); // Pass the single selected option
    toggleDropdown();
  };

  return (
    <div className="dropdown-container">
      <Button
        text={TEXT_CONSTANS.SELECT_OPTIONS}
        className="dropdown-toggle"
        onClick={toggleDropdown}
      ></Button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio" // Change to radio for single selection
                    value={option}
                    name="single-select" // Radio group name to enforce single selection
                    onChange={handleOptionChange}
                    checked={selectedOption === option}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <div className="dropdown-actions">
            <Button
              text={TEXT_CONSTANS.APPLY}
              className="dropdown-action-btn"
              onClick={handleConfirm}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSelect;
