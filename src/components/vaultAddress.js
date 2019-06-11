import React, { Component } from "react";
import AccBalance from "./accBalance";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./vaultAddress.css";

class VaultAddress extends Component {
  render() {
    const vaultAddress = this.props.vaultAddress;
    const accountBalance = this.props.accountBalance;
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
        <AccBalance balance={accountBalance} />
      </div>
    );
  }
}

export default VaultAddress;
