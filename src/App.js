import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';

import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Login';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/login' element={<Login />} />                        
                </Routes>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/checkout' element={<Checkout />} />
                </Routes>
            </div>
        </BrowserRouter>

  );
}

export default App;
