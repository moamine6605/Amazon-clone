import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyInput from "react-currency-input-field";
import axios from './axios';

function Payment() {

    const [{basket, user}] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [ succeeded, setSucceeded] = useState(false);
    const [ processing, setProcessing] = useState("")
    const [ error, setError] = useState(null);
    const [ disabled, setDisable] = useState(true);
    const [ clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${basket.reduce((total, item)=> total + item.price, 0) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log(clientSecret)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            navigate('/orders', {replace:true})
        })
    }

    const handleChange = event => {
        setDisable(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout(<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Adress</h3>
                    </div>
                    <div className='patment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map((item,index) =>{
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

                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement name="card" onChange={handleChange}/>

                            <div className='payment__priceContainer'>
                                <label>Order Total: </label>
                                <CurrencyInput
                                    name="total-order"
                                    value={basket.reduce((total, item)=> total + item.price, 0)}
                                    decimalsLimit={2}
                                    groupSeparator=","
                                    decimalSeparator="."
                                    prefix="$"
                                    readOnly
                                    disableGroupSeparators={false}
                                    className="currency-input"
                                />

                                <button disabled={processing || disabled || succeeded }>
                                    <span>{processing ? <p>processing</p> : "Buy Now" }</span>
                                </button>
                                
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
