import React from 'react'
import CartItem from './CartItem'
import useCart from '../hooks/useCart'
import Button from './Button';


function Cart() {
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const { cart, numOfCartItems, orderPrice, dispatch, reducerActions } = useCart();

  const shippingPrice: number = 89;
  const totalPrice = orderPrice + shippingPrice;

  function handlePlaceOrder() {
    dispatch({ type: reducerActions.SUBMIT_ORDER })
    setOrderPlaced(true);
  }


  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center text-gray-500">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-green-100 p-6 rounded-full mb-6 text-green-600">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>Thank you!</h1>
        <p className="text-xl text-gray-600">Your order has been placed successfully.</p>
      </div>
    )
  }

  return (
    <main className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
      <h2 className='text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3'>
        Shopping Cart
        <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-600">{numOfCartItems} items</span>
      </h2>

      <div className='lg:grid lg:grid-cols-12 lg:gap-12'>

        {/* Cart Items Section */}
        <div className='lg:col-span-8'>
          <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden'>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className='bg-gray-50/50'>
                  <tr>
                    <th scope="col" className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Product</th>
                    <th scope="col" className='px-6 py-4'></th>
                    <th scope="col" className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                    <th scope="col" className='px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Quantity</th>
                    <th scope="col" className='px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                    <th scope="col" className='px-6 py-4'></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
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
          </div>
        </div>

        {/* Order Summary Section */}
        <div className='lg:col-span-4 mt-8 lg:mt-0'>
          <div className='bg-white shadow-lg ring-1 ring-gray-900/5 rounded-2xl p-6 sticky top-24'>
            <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>

            <dl className='space-y-4 text-sm text-gray-600'>
              <div className='flex justify-between'>
                <dt>Subtotal</dt>
                <dd className='font-medium text-gray-900'>{orderPrice.toFixed(2)} Kč</dd>
              </div>

              <div className='flex justify-between'>
                <dt>Shipping estimate</dt>
                <dd className='font-medium text-gray-900'>{shippingPrice} Kč</dd>
              </div>

              <div className='border-t border-gray-200 pt-4 flex justify-between items-center'>
                <dt className='text-base font-bold text-gray-900'>Order Total</dt>
                <dd className='text-2xl font-bold text-blue-600'>{totalPrice.toFixed(2)} Kč</dd>
              </div>
            </dl>

            <div className='mt-8 space-y-3'>
              <Button onClick={handlePlaceOrder} color="gradient" fullWidth={true} className="py-4 text-lg">
                Checkout
              </Button>
              <p className='text-xs text-center text-gray-500'>
                Secure checkout powered by Trendovo.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Cart