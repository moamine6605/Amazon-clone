import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Only show Header if not on /login */}
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
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

