import React from "react";
import Button from "./Button";

const Cards = ({ showExpense, showIncome, currBalance, income, expense }) => {
  return (
    <div className="album py-5 bg-body-tertiary __web-inspector-hide-shortcut__">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div className="col card-col">
            <div className="card shadow-sm">
              <p className="card-title">Current Balance</p>

              <div className="card-body">
                <p className="card-text">₹{currBalance}</p>
                <div className="d-grid gap-2"></div>
              </div>
            </div>
          </div>
          <div className="col card-col">
            <div className="card shadow-sm">
              <p className="card-title">Total Income</p>

              <div className="card-body">
                <p className="card-text">₹{income}</p>
                <div className="d-grid gap-2">
                  <Button text="Add Income" onClick={showIncome}></Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col card-col">
            <div className="card shadow-sm">
              <p className="card-title">Total Expenses</p>

              <div className="card-body">
                <p className="card-text">₹{expense}</p>
                <div className="d-grid gap-2">
                  <Button text="Add Expenses" onClick={showExpense}></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
