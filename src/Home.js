import React from 'react'
import './Home.css'
import './Product'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img
            className='home__image'
            src="https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg"
            alt=""
            />

            <div className='home__row'>
                <Product 
                    title="The lean startup"
                    price={19.99}
                    image="https://m.media-amazon.com/images/I/41Ag4WE7uyL.jpg"
                    rating={5}
                    currency={'$'}
                />
                <Product
                    title="Logitech MX Master 3S Wireless Mouse"
                    price={99.99}
                    image="https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SX679_.jpg"
                    rating={5}
                    currency={'$'}
                />
            </div>
            
            <div className='home__row'>
                <Product
                    title="Apple iPhone 14 Pro (128GB) – Space Black"
                    price={999.00}
                    image="https://m.media-amazon.com/images/I/61nzPMNY8zL._AC_SX679_.jpg"
                    rating={4}
                    currency={'$'}
                />
                <Product
                    title="LEVN Hybrid Active Noise Cancelling Headphones, Wireless Headphones Bluetooth 5.4 with Transparent Mode, Hi-Res Audio, Deep Bass, 70H Playtime Over Ear Bluetooth Headset for Work/Travel/Home/Office"
                    price={398.00}
                    image="https://m.media-amazon.com/images/I/61-Yy70QCyL._AC_SX679_.jpg"
                    rating={5}
                    currency={'$'}
                />
                <Product
                    title="Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, Warmer & Sterilizer, Includes App With Over 800 Recipes, Stainless Steel, 8 Quart"
                    price={89.00}
                    image="https://m.media-amazon.com/images/I/71YfFzJ+ySL._AC_SX679_.jpg"
                    rating={4}
                    currency={'$'}
                />
            </div>

            <div className='home__row'>
                <Product
                    title="Amazon Kindle Paperwhite 16GB (newest model) – Our fastest Kindle ever, with new 7' glare-free display, and weeks of battery life – Without lockscreen ads – Black"
                    price={139.99}
                    image="https://m.media-amazon.com/images/I/61MdbBO+SEL._AC_UY218_.jpg"
                    rating={5}
                    currency={'$'}
                />
                    <Product
                    title="Nike Men's Sneaker Shoes"
                    price={130.00}
                    image="https://m.media-amazon.com/images/I/61JJ7+mfVzL._AC_UL320_.jpg"
                    rating={4}
                    currency={'$'}
                />
            </div>
        </div>

    </div>
  )
}

export default Home
