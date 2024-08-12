import React, { useEffect, useState } from "react";
import Header from "./Header";
import Cards from "./Cards";
import AddExpense from "./Modals/addExpense";
import AddIncome from "./Modals/addIncome";
import { addDoc, collection, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../src/firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "./TransactionsTable";
import Charts from "./Charts";
import NoTrans from "./NoTrans";

function DashBoard() {
  const [user, loading] = useAuthState(auth);
  const [isExpenseVis, setIsExpenseVis] = useState(false);
  const [isIncomeVis, setIsIncomeVis] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currBalance, setCurrBalance] = useState(0);

  const showExpense = () => {
    setIsExpenseVis(true);
  };
  const showIncome = () => {
    setIsIncomeVis(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseVis(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeVis(false);
  };
  const [transactions, setTransaction] = useState([]);

  const onFinish = (values, type) => {
    const newTrans = {
      type: type,
      date: values.date.format("DD-MM-YYYY"),
      amount: parseFloat(values.amount),
      name: values.name,
    };
    addTransaction(newTrans);
  };

  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );

      if (!many) toast.success("Transaction Added!!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransaction(newArr);
      calcBalance();
    } catch (e) {
      if (!many) toast.error(e.message);
    }
  };
  useEffect(() => {
    fetchTransaction();
  }, [user]);
  useEffect(() => {
    calcBalance();
  }, [transactions]);

  const calcBalance = () => {
    var totIncome = 0,
      totExpense = 0;
    transactions.forEach((transactions) => {
      if (transactions.type === "income") {
        totIncome += transactions.amount;
      } else {
        totExpense += transactions.amount;
      }
    });
    setIncome(totIncome);
    setExpense(totExpense);
    setCurrBalance(totIncome - totExpense);
  };

  const fetchTransaction = async () => {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transArray = [];
      querySnapshot.forEach((doc) => {
        transArray.push(doc.data());
      });
      setTransaction(transArray);

      toast.success("Transaction Fetched!!");
    }
  };
  var sortedTrans = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <>
      <div>
        <Header />
        {loading ? (
          ""
        ) : (
          <>
            <Cards
              income={income}
              expense={expense}
              currBalance={currBalance}
              showExpense={showExpense}
              showIncome={showIncome}
            />
            {transactions.length != 0 ? (
              <Charts sortedTrans={sortedTrans}></Charts>
            ) : (
              <NoTrans></NoTrans>
            )}

            <AddIncome
              isIncomeVis={isIncomeVis}
              handleIncomeCancel={handleIncomeCancel}
              onFinish={onFinish}
            />
            <AddExpense
              isExpenseVis={isExpenseVis}
              handleExpenseCancel={handleExpenseCancel}
              onFinish={onFinish}
            />

            <TransactionsTable transactions={transactions}></TransactionsTable>
          </>
        )}
      </div>
    </>
  );
}

export default DashBoard;
