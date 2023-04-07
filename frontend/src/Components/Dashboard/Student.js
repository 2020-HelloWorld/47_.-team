import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser,getToken,removeUserSession } from '../../Utils/Common';
import { useState,useEffect } from 'react';
import axios from 'axios';
import TransactionTable from '../TransactionsTable';
import Claimcredits from './Claimcredits';


function Student() {
  const [CoinAmount, setCoinAmount] = useState(0);
  const [convertAmount, setConvertAmount] = useState(0);
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(null);
  const [history , setHistory] = useState(null)
    const user = getUser()      
    
    const handleConvertToSCoins = () => {
      // TODO: Implement conversion logic here
      setLoading(true)
      axios
        .post(`${process.env.REACT_APP_HOST}/convert/credits`, {token: getToken(), amount: convertAmount })
        .then((response) => {
          setLoading(false);
          setSuccess(response.data.ok)
        })
        .catch((error) => {
          if (error?.response?.status === 401 ) removeUserSession();
          setLoading(false);
          setSuccess(error.response.data.ok)
        });
    };
  
    const handlePrintTransactions = () => {
      // TODO: Implement printing logic here
      axios
        .post(`${process.env.REACT_APP_HOST}/fetchHistory`, {token: getToken()})
        .then((response) => {
          setLoading(false);
          setHistory(response.data.history)
        })
        .catch((error) => {
          if (error?.response?.status === 401 ) removeUserSession();
          setLoading(false);
        });
    };
    useEffect(() => {
      const token = getToken();
      if (!token) {
        return;
      }
      setLoading(true)
      axios
        .post(`${process.env.REACT_APP_HOST}/fetchBalance`, {token: getToken()})
        .then((response) => {
          setLoading(false);
          setCoinAmount( response.data );
        })
        .catch((error) => {
          if (error?.response?.status === 401 ) removeUserSession();
          setLoading(false);
          setCoinAmount({"$G": null, "$S": null});
        });
        return () => {
        }
    }, []);
    if (user.role === 'admin') {
      return <Redirect to={{ pathname: '/dashboard/admin' }} />
  }
  if (loading && getToken()) {
    return <> <div className="container">
  <div className="loader" />
</div> </>;   }
  return (
    <Switch>
        <Route exact path="/dashboard/student">
        <div className="profile-container">
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>SRN: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>$G Coin Count: {CoinAmount.$G}</p>
      <p>$S Coin Count: {CoinAmount.$S}</p>
      <label>
        Convert $G to $S:
        <input
          type="number"
          defaultValue={CoinAmount.$G}
          onChange={(event) => setConvertAmount(Number(event.target.value))}
        />
        <button onClick={handleConvertToSCoins}>Convert</button>
        {success && <><small style={{ color: 'green' }}>{success}</small><br /></>}<br />
      </label>
      <button onClick={handlePrintTransactions}>Print Transactions</button>
      {history && <TransactionTable transactions={history} />}
    </div>
        </Route>
        <Route path="/dashboard/student/claim">
          <Claimcredits />
        </Route>
      </Switch>
    
  )
}

export default Student