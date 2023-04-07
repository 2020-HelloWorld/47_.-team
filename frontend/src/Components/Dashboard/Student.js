import React from 'react'
import { Redirect } from 'react-router-dom';
import { getUser } from '../../Utils/Common';

function Student() {
  const [CoinAmount, setCoinAmount] = useState(0);
  const [loading, setLoading] = useState(true)
    const user = getUser()      
    if (user.role === 'admin') {
        return <Redirect to={{ pathname: '/dashboard/admin' }} />
    }

    useEffect(() => {
      const token = getToken();
      if (!token) {
        return;
      }
      setLoading(true)
      axios
        .post(`${process.env.REACT_APP_HOST}/fetch/userbalance`, {token: token})
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
  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <p>Name: {name}</p>
      <p>SRN: {srn}</p>
      <p>Email: {email}</p>
      <p>$G Coin Count: {CoinAmount.$G}</p>
      <p>$S Coin Count: {CoinAmount.$S}</p>
      <label>
        Convert $G to $S:
        <input
          type="number"
          value={gCoinAmount}
          onChange={(event) => setGCoinAmount(Number(event.target.value))}
        />
        <button onClick={handleConvertToSCoins}>Convert</button>
      </label>
      <button onClick={handlePrintTransactions}>Print Transactions</button>
    </div>
  )
}

export default Student