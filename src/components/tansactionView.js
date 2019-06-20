import React, { Component } from "react";
import "../styles/transactionView.css";

class Transactions extends Component {
  render() {
    return (
      <div className="transBox">
        <div className="transHis">
          <p>History of transactions</p>
        </div>
        <div className="wraper">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>From Address</th>
                <th>To Address</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.props.resultOfTaransaction.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.from}</td>
                    <td>{data.to}</td>
                    <td>{data.value / 1000000000000000000} ETH</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Transactions;
