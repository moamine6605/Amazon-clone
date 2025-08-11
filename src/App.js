import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './StateProvider';

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/login' && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
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

