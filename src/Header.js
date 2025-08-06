import React from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div className='header'>
        <img 
        alt='amazon-logo'
        className='header__logo'
        src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' />

        <div className='header__search'>
            <input className='header__searchInput' type='text' />
            <FontAwesomeIcon className='header__searchIcon' icon={faSearch} />
        </div>

        <div className='header__nav'>

            <div className='header__option'>

                <span className='header__optionLineOne'>hello Guest</span>
                <span className='header__optionLineTwo'>Sign in</span>

            </div>

            <div className='header__option'>

                <span className='header__optionLineOne'>Returns</span>
                <span className='header__optionLineTwo'>& Orders</span>
                 
            </div>

            <div className='header__option'>

                <span className='header__optionLineOne'>Your</span>
                <span className='header__optionLineTwo'>Prime</span>
                
            </div>

            <div className='header__optionBasket'>

                <FontAwesomeIcon icon={faShoppingBasket} />
                <span className='header__optionLineTwo header__basketCount'>0</span>
                
            </div>

        </div>
    </div>
  )
}

export default Header
