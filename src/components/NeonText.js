import React from "react";
import "./NeonText.scss";

class NeonText extends React.Component {
  render() {
    return (
      <ul className="NeonText">
        {this.props.text
          .toUpperCase()
          .split("")
          .map(i => (
            <li className="NeonText__letter">{i}</li>
          ))}
      </ul>
    );
  }
}

export default NeonText;
