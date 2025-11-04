import React from 'react'
import CartItem from './CartItem'
import useCart from '../hooks/useCart'
import Button from './Button';


function Cart() {
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const { cart, numOfCartItems, orderPrice, dispatch, reducerActions } = useCart();


  function handlePlaceOrder() {
    dispatch({ type: reducerActions.SUBMIT_ORDER })
    setOrderPlaced(true);
  }


  if (cart.length === 0 && !orderPlaced) { 
    return <h1 className='text-xl font-bold text-center'> Your cart is empty! </h1>
  }

  return (
    <>
        <ul className="flex flex-col gap-4 mb-10">
          {cart.map(item => (
            <CartItem 
              key={item.sku}
              item={item}
              dispatch={dispatch}
              reducerActions={reducerActions}
            />
          ))}
        </ul>




            {orderPlaced ? (
              <h1 className='text-2xl font-semibold text-center'> Thank you for your order! </h1>
            ) : (
              <div className='flex flex-col gap-1 text-right'>
                <div>
                  Items in cart: {numOfCartItems}
                </div>
                <div>
                  Order price: {orderPrice.toFixed(2)} Kč
                </div>
                <div>
                  <Button onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </div>
            </div>
            )}
    
     </>
  )
}

export default Cart