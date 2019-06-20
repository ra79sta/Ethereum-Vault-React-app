import React, { Component } from "react";
import "./App.css";
import VaultAddress from "./components/vaultAddress";
import Header from "./components/header";

class App extends Component {
  render() {
    return (
      <div className="container App">
        <Header />
        <VaultAddress />
      </div>
    );
  }
}
export default App;
