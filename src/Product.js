import React from 'react'
import './Product.css'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStateValue } from './StateProvider'

const starStyle = {
    color: '#FFD700'
}

function Product({id, title, image, price, rating, currency}) {
    const [basket, dispatch] = useStateValue();



    function addtobasket(){
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id:id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            }
        })
    }
    return (
    <div className='product'>
        <div className='product__info'>
            <p>{title}</p>
            <p className='product__price'>
                <small>{currency}</small>
                <small>{price}</small>
            </p>
                <div className='product__rating'>
                    {Array(rating).fill(<FontAwesomeIcon icon={solidStar} />).map((item, index)=><p key={index} style={starStyle}>{item}</p>)}
                </div>
        </div>
        
        <img src={image} alt='' />

        <button onClick={addtobasket}>
            Add to Cart
        </button>
    </div>
  )
}

export default Product
