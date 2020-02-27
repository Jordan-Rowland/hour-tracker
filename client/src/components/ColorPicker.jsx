import React from "react";
import "../styles/ColorPicker.css";


function ColorPicker(props) {
  const colors = {
    items: ["grey", "red", "green", "aqua", "skyblue", "lavender", "yellow"],
    grey: "rgb(191, 191, 191)",
    red: "rgb(218, 59, 59)",
    green: "rgb(142, 211, 81)",
    aqua: "rgb(81, 211, 181)",
    skyblue: "rgb(81, 144, 211)",
    lavender: "rgb(98, 81, 211)",
    yellow: "rgb(255, 232, 54)"
  }

  function dispatchColorSelected(e) {
    const colorCode = e.target.style.backgroundColor
    const selectedColorKey = colors.items.find(color => colors[color] === colorCode)
    props.onDispatchColorSelected(selectedColorKey)
  }

  return(
    <div className="color-picker">
      {colors.items.map(color => (
        <div
          className="color"
          key={color}
          style={{
            backgroundColor: colors[color],
            height: "20px",
            width: "100px"
          }}
          onClick={dispatchColorSelected}
        >
        </div>
      ))}
    </div>
  );
}

export default ColorPicker;