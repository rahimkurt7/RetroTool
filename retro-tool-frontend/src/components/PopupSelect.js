import React, { useState, useRef, useEffect } from "react";

const PopupSelect = ({ label, items, selectedItems, onChange, disabledItems = [] }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (item) => {
    if (disabledItems.includes(item)) return; // kilitliyse işlem yapma

    if (selectedItems.includes(item)) {
      onChange(selectedItems.filter((i) => i !== item));
    } else {
      onChange([...selectedItems, item]);
    }
  };

  return (
    <div style={styles.wrapper} ref={popupRef}>
      <button style={styles.button} onClick={() => setShowPopup(!showPopup)}>
        {label}
      </button>

      {showPopup && (
        <div style={styles.popup}>
          {items.map((item, index) => {
            const isDisabled = disabledItems.includes(item);
            return (
              <label key={item} style={{ ...styles.option, opacity: isDisabled ? 0.5 : 1 }}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  disabled={isDisabled}
                  onChange={() => toggleItem(item)}
                />
                {item}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    position: "relative",
  },
  button: {
    padding: "8px 14px",
    backgroundColor: "#5271ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  popup: {
    position: "absolute",
    top: "110%",
    left: 0,
    backgroundColor: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "10px",
    borderRadius: "8px",
    zIndex: 1000,
    minWidth: "150px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "6px",
    fontSize: "14px",
  },
};

export default PopupSelect;
