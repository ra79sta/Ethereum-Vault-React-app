import React, { Component } from "react";
import image from "../images/6250754.png";
import "../styles/header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.deposit = this.deposit.bind(this);
  }
  deposit = () => {
    const url = "https://www.rinkeby.io/#faucet";
    window.open(url, "_blank");
  };
  render() {
    return (
      <div className="app-header">
        <div className="content">
          <span className="headings">
            {<img className="ethImage" src={image} alt="ETH" />}Vault
          </span>
          <div className="buttons">
            <button
              type="button"
              onClick={this.deposit}
              className="btn btn-primary m-2 btn-sm"
            >
              Deposit
            </button>
            <button type="button" className="btn btn-success m-2 btn-sm">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
