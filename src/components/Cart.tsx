import React from 'react'
import CartItem from './CartItem'
import useCart from '../hooks/useCart'
import Button from './Button';


function Cart() {
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const { cart, numOfCartItems, orderPrice, dispatch, reducerActions } = useCart();

  const shippingPrice: number = 89;

  function handlePlaceOrder() {
    dispatch({ type: reducerActions.SUBMIT_ORDER })
    setOrderPlaced(true);
  }


  if (cart.length === 0 && !orderPlaced) { 
    return <h1 className='text-xl font-bold text-center py-50'> Your cart is empty! </h1>
  }

  return (
    <div className='bg-gray-100 pt-10 pb-20 px-16'>

      <h2 className='text-3xl font-bold mb-9'>My Cart</h2>

      <div className='flex gap-x-10'>
        <div className='w-7/10 bg-white border border-gray-300 rounded-md'>

          <table className="table-auto text-left">
          <thead className='px-5 mb-12'>
            <tr className='px-5 border-b border-gray-200'>
              <th className='font-normal w-1/8 p-5'>Product</th>
              <th className='font-normal'></th>
              <th className='font-normal'>Price</th>
              <th className='font-normal'>Quantity</th>
              <th className='font-normal'>Total</th>
              <th className='font-normal'></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <CartItem 
                key={item.sku}
                item={item}
                dispatch={dispatch}
                reducerActions={reducerActions}
              />
            ))}
          </tbody>
        </table>

        </div>


      <div className='w-3/10 bg-white border-1 border-gray-300 rounded-md px-5 py-7'>
        <h2 className='text-lg font-bold mb-4'>Order Summary</h2>
        
        <div className='flex justify-between  py-2'>
          <p className='text-gray-500'>Subtotal ({numOfCartItems} items)</p>
          {orderPrice.toFixed(2)} Kč
        </div>

        <div className='flex justify-between py-2'>
          <p className='text-gray-500'>Shipping</p>
          <p>{shippingPrice} Kč</p>
        </div>

        <hr className='text-gray-300 pt-1'/>

        <div className='flex justify-between py-2'>
          <h2 className='text-lg font-bold'>Order Total </h2>
          <p className='font-bold'>{(orderPrice+shippingPrice).toFixed(2)} Kč</p>
        </div>

        <div className='text-sm text-gray-500 pb-7 pt-1'>
          Shipping and taxes calculated at checkout.
        </div>
        
        <Button onClick={handlePlaceOrder} color="blue" fullWidth={true}>
          Place Order
        </Button>
      </div>

      {orderPlaced ? (
        <h1 className='text-2xl font-semibold text-center'> Thank you for your order! </h1>
      ) : ( null )}
    
       </div>


     </div>
  )
}

export default Cart