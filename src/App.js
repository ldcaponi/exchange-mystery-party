import React, { Component } from "react";
import NeonText from "./components/NeonText";
import "./App.scss";

class App extends Component {
  state = {
    minutes: "",
    seconds: "",
    secondsRemaining: 60 * 30,
    saved: false
  };

  componentDidMount() {
    setInterval(this.tick, 1000);
  }

  tick = () => {
    this.setState({ secondsRemaining: this.state.secondsRemaining - 1 }, () => {
      const { secondsRemaining } = this.state;
      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = secondsRemaining - minutes * 60;
      this.setState({
        minutes: minutes < 10 ? "0" + minutes : minutes,
        seconds: seconds < 10 ? "0" + seconds : seconds
      });
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  unlock = e => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8].map(i => this.state[`val${i}`]);
    if (
      numbers
        .sort(function(a, b) {
          return a - b;
        })
        .join("") === "01234589"
    ) {
      this.setState({ saved: true });
    }
  };

  render() {
    const { minutes, seconds, saved } = this.state;
    return (
      <div className="App">
        <button
          style={{ position: "absolute", top: 3, right: 3 }}
          type="button"
          onClick={() =>
            this.setState({
              secondsRemaining: this.state.secondsRemaining + 60 * 5
            })
          }
        >
          +5
        </button>
        <div className="neon-container">
          <NeonText text="Save" />
          <NeonText text="the" />
          <NeonText text="exchange" />
        </div>

        <div className="container">
          <div className="left">
            <div className="center-box">
              {!saved && (
                <img className="lock shake" src="/bomb.svg" alt="lock" />
              )}
              {saved && (
                <img className="lock spin" src="/victory.svg" alt="unlock" />
              )}
            </div>
          </div>
          <div className="right">
            <div className="center-box timer">
              {!saved && (
                <span>
                  {" "}
                  {minutes}: {seconds}
                </span>
              )}
              {saved && <span>YOU SAVED THE EXCHANGE!!!</span>}
            </div>
          </div>
        </div>

        <div className="input-container">
          <div style={{ minHeight: 153 }}>
            {!saved && (
              <button
                onClick={this.unlock}
                type="button"
                className="unlock-button"
              >
                DIFFUSE BOMB
              </button>
            )}

            {saved && <div className="victory">WOOOOO!!!!</div>}
          </div>

          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <input
              name={`val${i}`}
              onChange={this.handleChange}
              value={this.state[`val${i}`]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
