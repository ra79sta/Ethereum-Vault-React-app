import React, { Component } from "react";
import AccBalance from "./accBalance";
import Transactions from "./tansactionView";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Web3 from "web3";
import "../styles/vaultAddress.css";

class VaultAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vaultAddress: "",
      privateKey: "",
      accountBalance: "",
      copied: false,
      error: null,
      isLoaded: false,
      resultOfTaransaction: [],
      apiKeyTokenEthScan: "GI657KADBXE426EEC65IGTZXF559U9ZTQK",
      // testAddressWeb3: "0xa3E675F19C83d238a822B4993763715ECA1FDE19",
      // testAddressEthScan: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
    };
  }
  
  async componentDidMount() {
    const web3 = new Web3(
      "https://rinkeby.infura.io/v3/fc6333c1eec54d779ec3a5becfb65cb4"
    );

    //creating new account with web3 and infura
    const acc = await web3.eth.accounts.create();
    this.setState({ vaultAddress: acc.address, privateKey: acc.privateKey });

    this.getBalance();
    this.getListOfTansaction();

    //update balance for new account
    this.interval = setInterval(this.getBalance, 10000);

    //update list of transaction
    this.interval = setInterval(this.getListOfTansaction, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //balance of new account with web3 and infura
  getBalance = () => {
    const web3 = new Web3(
      "https://rinkeby.infura.io/v3/fc6333c1eec54d779ec3a5becfb65cb4"
    );
    web3.eth.getBalance(this.state.vaultAddress).then(balance => {
      this.setState({ accountBalance: web3.utils.fromWei(balance, "ether") });
    });
  };

  // using etharscan api for list of transaction for address
  getListOfTansaction = () => {
    let api =
      "http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=" +
      this.state.vaultAddress +
      "&startblock=0&endblock=99999999&sort=asc&apikey=" +
      this.state.apiKeyTokenEthScan +
      "";
    fetch(api)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          resultOfTaransaction: data.result
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  };

  render() {
    const vaultAddress = this.state.vaultAddress;
    const accountBalance = this.state.accountBalance;
    const resultOfTaransaction = this.state.resultOfTaransaction;
    return (
      <div>
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
        <Transactions resultOfTaransaction={resultOfTaransaction} />
      </div>
    );
  }
}

export default VaultAddress;
