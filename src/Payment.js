import { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyInput from "react-currency-input-field";
import axios from './axios';
import { db } from './firebase';
import { collection, doc, setDoc } from "firebase/firestore";


function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [ succeeded, setSucceeded] = useState(false);
    const [ processing, setProcessing] = useState("")
    const [ error, setError] = useState(null);
    const [ disabled, setDisable] = useState(true);
    const [ clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
    const getClientSecret = async () => {
        try {
        const response = await axios.post(
            `/payments/create?total=${basket.reduce((total, item) => total + item.price, 0) * 100}`
        );
        setClientSecret(response.data.clientSecret);
        } catch (error) {
        console.error("Error fetching client secret:", error);
        }
    };

    if (basket.length > 0) {
        getClientSecret();
    }
    }, [basket]);

    console.log(clientSecret)

    const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
        card: elements.getElement(CardElement),
        },
    });

    if (!user) {
        console.error("No user signed in. Cannot save order.");
        return;
    }

    // Save order to Firestore
    await setDoc(
        doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
        {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        },
        { merge: true }
    );

    // Continue with order flow
    setSucceeded(true);
    setError(null);
    setProcessing(false);

    dispatch({ type: "EMPTY_BASKET" });
    navigate("/orders", { replace: true });
    };

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
