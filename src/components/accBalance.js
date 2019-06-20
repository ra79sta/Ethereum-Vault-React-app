import React, { Component } from "react";
import "../styles/accBalance.css";
import image from "../images/6250754.png";

class AccBalance extends Component {
  render() {
    return (
      <div className="balanceBox">
        <span>{<img className="ethImage" src={image} alt="ETH" />}</span>
        <span className="balanceTag">
          Account Balance: {this.props.balance} ETH
        </span>
      </div>
    );
  }
}

export default AccBalance;
