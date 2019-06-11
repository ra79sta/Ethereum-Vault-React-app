import React, { Component } from "react";
import "./App.css";
import VaultAddress from "./components/vaultAddress";
import Transactions from "./components/tansactionView";
import image from "./images/6250754.png";
import Web3 from "web3";

class App extends Component {
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
    this.deposit = this.deposit.bind(this);
  }
  async componentDidMount() {
    const web3 = await new Web3(
      "https://rinkeby.infura.io/v3/fc6333c1eec54d779ec3a5becfb65cb4"
    );

    //creating new account with web3 and infura
    const acc = await web3.eth.accounts.create();
    this.setState({ vaultAddress: acc.address, privateKey: acc.privateKey });

    //balance of new account with web3 and infura
    setTimeout(() => {
      this.getBalance();
      this.getListOfTansaction();
    }, 1);

    //update balance for new account
    setTimeout(() => {
      this.interval = setInterval(this.getBalance, 10000);
    }, 3);
    //update list of transaction
    setTimeout(() => {
      this.interval = setInterval(this.getListOfTansaction, 10000);
    }, 3);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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
    console.log(this.state);
    let api =
      "http://api.etherscan.io/api?module=account&action=txlist&address=" +
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

  deposit = () => {
    const url = "https://www.rinkeby.io/#faucet";
    window.open(url, "_blank");
  };
  render() {
    return (
      <div className="container App">
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
        <VaultAddress
          vaultAddress={this.state.vaultAddress}
          accountBalance={this.state.accountBalance}
        />
        <Transactions resultOfTaransaction={this.state.resultOfTaransaction} />
      </div>
    );
  }
}
export default App;
