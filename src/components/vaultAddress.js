import React, { Component } from "react";
import AccBalance from "./accBalance";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./vaultAddress.css";
import Web3 from "web3";

class VaultAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vaultAddress: "",
      privateKey: "",
      accountBalance: "",
      copied: false,
    };
  }

  componentDidMount() {
    const web3 = new Web3(
      "https://rinkeby.infura.io/v3/fc6333c1eec54d779ec3a5becfb65cb4"
    );
    //creating new account with web3 and infura
    const acc = web3.eth.accounts.create();
    this.setState({ vaultAddress: acc.address });
    this.setState({ privateKey: acc.privateKey });
    // console.log(acc);

    //balance of new account with web3 and infura
    setTimeout(() => {
      web3.eth.getBalance(this.state.vaultAddress).then(balance => {
        this.setState({ accountBalance: web3.utils.fromWei(balance, "ether") });
      });
    }, 1);
  }

  render() {
    const vaultAddress = this.state.vaultAddress;
    return (
      <div className="addressBox">
        <span className="addressOf">Vault address</span> <br />
        <div className="address">
          <CopyToClipboard
            text={vaultAddress}
            onCopy={() => this.setState({ copied: true })}
          >
            <span title="Copy to clipboard">{vaultAddress}</span>
          </CopyToClipboard>
        </div>
        <br />
        <AccBalance balance={this.state.accountBalance} />
      </div>
    );
  }
}

export default VaultAddress;
