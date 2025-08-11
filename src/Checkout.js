import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import CurrencyInput from "react-currency-input-field";


function Checkout() {

    const [{basket}] = useStateValue()

  return (
    <div className='checkout'>
        <div className='checkout__left'>

            <div>
                <h2 className='checkout__title'>Shopping Cart</h2>

                {basket.map((item,index) => {
                    return (
                        <CheckoutProduct
                            key={index}
                            id={item.id}
                            title={item.title} 
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                )
                })}

            </div>

            <div className='checkout-subtotal'>
                <p>
                Subtotal ({basket.length} items):{" "}
                <strong>
                    <CurrencyInput
                    value={basket.reduce((total, item)=> total + item.price, 0)}
                    decimalsLimit={2}
                    groupSeparator=","
                    prefix="$"
                    readOnly
                    disableGroupSeparators={false}
                    className="currency-input"
                    />
                </strong>
                </p>
            </div>


        </div>

        <div className='checkout__right'>
            <Subtotal/>
        </div>
    </div>
  )
}

export default Checkout
