// FilterModal.js
import React, { useState } from "react";
import "../../css/FilterModal.css";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";  // used to select the minimum and maximum price range section in filter

const FilterModal = ({ onClose }) => {       // onClose is a function used here to call the parent to child component
  const [priceRange, setPriceRange] = useState({ min: 600, max: 30000 });
  const [propertyType, setPropertyType] = useState("");  // state to store the selected property type 
  const [roomType, setRoomType] = useState("");
  const [amenities, setAmenities] = useState([]);

  const handlePriceRangeChange = (value) => {    // update the price range when user input the value
    setPriceRange(value);    // calls the setPriceRange function from FilterModal component to update the value
  };

  const handleMinInputChange = (e) => {
    const minValue = parseInt(e.target.value, 10);  // e.target.value ---- means the value typed by user in the input box || 10 ---- base system 10
    setPriceRange((prev) => ({ ...prev, min: minValue }));  // ...prev ---- ' spread operator' to copy the previous state
  };

  const handleMaxInputChange = (e) => {
    const maxValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({ ...prev, max: maxValue }));
  };

  const handleFilterChange = () => {   // share all the selected filter option to the backend
    console.log("Applied Filters:", {
      priceRange, 
      propertyType,
      roomType,
      amenities,
    });
  };

  const propertyTypeOptions = [
    { value: "house", label: "House", icon: "home" },
    { value: "flat", label: "Flat", icon: "apartment" },
    { value: "guest-house", label: "Guest House", icon: "hotel" },
    { value: "hotel", label: "Hotel", icon: "meeting_room" },
  ];

  const roomTypeOptions = [
    { value: "Entire Home", label: "Entire Home", icon: "hotel" },
    { value: "Room", label: "Room", icon: "meeting_room" },
    { value: "Anytype", label: "Any Type", icon: "apartment" },
  ];

  const amenitiesOptions = [
    { value: "Wifi", label: "Wi-Fi", icon: "wifi" },
    { value: "Kitchen", label: "Kitchen", icon: "kitchen" },
    { value: "Ac", label: "AC", icon: "ac_unit" },
    {
      value: "Washing Machine",
      label: "Washing Machine",
      icon: "local_laundry_service",
    },
    { value: "Tv", label: "TV", icon: "tv" },
    { value: "Pool", label: "Pool", icon: "pool" },
    { value: "Free Parking", label: "Free Parking", icon: "local_parking" },
  ];

  const handleClearFilters = () => {   // clear all the selected filter option and reset to default value
    setPriceRange({ min: 600, max: 30000 });
    setPropertyType("");
    setRoomType("");
    setAmenities([]);
  };

  const handleAmenitiesChange = (selectedAmenity) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(selectedAmenity)
        ? prevAmenities.filter((item) => item !== selectedAmenity)
        : [...prevAmenities, selectedAmenity]
    );
  };

  const handlePropertyTypeChange = (selectedType) => { 
    setPropertyType((prevType) =>
      prevType === selectedType ? "" : selectedType
    );
  };

  const handleRoomTypeChange = (selectedType) => {
    setRoomType((prevType) => (prevType === selectedType ? "" : selectedType));
  };

  return (
    <div className="modal-backdrop">  
      <div className="modal-content" style={{maxHeight:"80vh", overflow:"auto"}}> 
        <h4>
          Filters <hr />
        </h4>
        <button className="close-button" onClick={onClose}>
          <span>&times;</span>
        </button>

        <div className="modal-filters-container">
          <div className="filter-section">
            <label>Price Range:</label>

            <InputRange
              minValue={600}
              maxValue={30000}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
            <div className="range-inputs">
              <input
                type="number"
                value={priceRange.min}
                onChange={handleMinInputChange}
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={handleMaxInputChange}
              />
            </div>
          </div>

          <div className="filter-section">
            <label>Property Type:</label>
            <div className="icon-box">
              {propertyTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`selectable-box ${
                    propertyType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handlePropertyTypeChange(option.value)}
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Room Type:</label>
            <div className="icon-box">
              {roomTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`selectable-box ${
                    roomType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleRoomTypeChange(option.value)}
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Amenities:</label>
            <div className="amenities-checkboxes">
              {amenitiesOptions.map((option) => (
                <div key={option.value} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={amenities.includes(option.value)}
                    onChange={() => handleAmenitiesChange(option.value)}
                  />
                  <span className="material-icons amenitieslabel">
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-buttons">
            <button className="clear-button" onClick={handleClearFilters}>
              Clear
            </button>
            <button onClick={handleFilterChange}>Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default FilterModal