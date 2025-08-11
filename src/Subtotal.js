import React from 'react'
import CurrencyInput from "react-currency-input-field";
import './Subtotal.css'
import { useStateValue } from './StateProvider'



function Subtotal() {

      const [{basket}] = useStateValue();

  return (
    <div className='subtotal'>
        <p>
        Subtotal ({basket.length} items):{" "}
        <strong>
          <CurrencyInput
            name="total"
            value={basket.reduce((total, item)=> total + item.price, 0)}
            decimalsLimit={2}
            decimalSeparator="."
            groupSeparator=","
            prefix="$"
            readOnly
            disableGroupSeparators={false}
            className="currency-input"
          />
        </strong>
      </p>
      <small className="subtotal__gift">
        <input name="gift" type="checkbox" /> This order contains a gift
      </small>

        <button>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal
