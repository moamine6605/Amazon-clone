import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { useStateValue } from './StateProvider';
import { signOut } from 'firebase/auth';
import { auth } from './firebase'

function Header() {
    const navigate = useNavigate();
    const [{basket, user}] = useStateValue()

    const handleAuthentication = () => {
        if(user){
            signOut(auth)
                .then(() => {
                    navigate('/')
                })
                .catch(error => alert(error.message))
        }
    }



  return (
    <div className='header'>
        <Link to="/">
            <img 
                alt='amazon-logo'
                className='header__logo'
                src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' />
        </Link>

        <div className='header__search'>
            <input className='header__searchInput' type='text' />
            <FontAwesomeIcon className='header__searchIcon' icon={faSearch} />
        </div>

        <div className='header__nav'>

            
            <Link to='/login'>
                <div className='header__option' onClick={handleAuthentication}>

                    <span className='header__optionLineOne'>hello Guest</span>
                    <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>

                </div>
            </Link>

            <div className='header__option'>

                <span className='header__optionLineOne'>Returns</span>
                <span className='header__optionLineTwo'>& Orders</span>
                 
            </div>

            <div className='header__option'>

                <span className='header__optionLineOne'>Your</span>
                <span className='header__optionLineTwo'>Prime</span>
                
            </div>
            <Link to="/checkout">
                <div className='header__optionBasket'>

                    <FontAwesomeIcon icon={faShoppingBasket} />
                    <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
                    
                </div>
            </Link>

        </div>
    </div>
  )
}

export default Header
