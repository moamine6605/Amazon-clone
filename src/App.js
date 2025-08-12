import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51Rv9oYHuZjs8grUMiRQghL4YyCcRf2tn5wR2W2nuFiUF3cLASGnWvvP7RS7poHBURl0b9SO74UEDrBehqaSq5oQM00aKvB5PLy")

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/login' && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        } />
      </Routes>
    </div>
  );
}

function App() {

    const [, dispatch] = useStateValue()

    useEffect(()=>{
        onAuthStateChanged(auth, authUser =>{

            if(authUser){
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            } else {
                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })
        
    }, [dispatch])


  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

