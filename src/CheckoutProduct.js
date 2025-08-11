import React from 'react'
import './CheckoutProduct.css'
import { starStyle } from './Product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { useStateValue } from './StateProvider'


function CheckoutProduct({id, image, title, price, rating}) {

    const [, dispatch] = useStateValue();

    function removeFromBasket(){
        dispatch({
            type:'DELETE',
            id:id,
        })
    }

  return (
    <div className='CheckoutProduct'>
        <div>
            <img className='checkoutProduct__image' src={image} alt='' />
        </div>

        <div className='checkoutProduct__info'>
            <p className='checkoutProduct__title'>{title}</p>

            <p className='checkoutProduct__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>

            <div className='checkoutProduct__price'>
                {Array(rating).fill(<FontAwesomeIcon icon={solidStar} />).map((item, index)=><p key={index} style={starStyle}>{item}</p>)}
            </div>

            <button onClick={removeFromBasket}>Delete</button>

        </div>


    </div>
  )
}

export default CheckoutProduct
