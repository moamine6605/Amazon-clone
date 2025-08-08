import React from 'react'
import CurrencyInput from "react-currency-input-field";
import './Subtotal.css'


function Subtotal() {
  return (
    <div className='subtotal'>
        <p>
        Subtotal (0 items):{" "}
        <strong>
          <CurrencyInput
            value={0}
            decimalsLimit={2}
            groupSeparator=","
            prefix="$"
            readOnly
            disableGroupSeparators={false}
          />
        </strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>

        <button>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal
