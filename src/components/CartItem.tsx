import React, { memo } from 'react';
import {CartItemType, ReducerAction, ReducerActionType  } from '../context/CartProvider';

type CartItemProps = {
    item: CartItemType;
    dispatch: React.Dispatch<ReducerAction>;
    reducerActions: ReducerActionType;
}

function CartItem({item, dispatch, reducerActions}: CartItemProps) {
    const imgUrl: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href
    const itemTotalPrice: number = item.price * item.quantity;

    function handleQuantityChange(e: React.ChangeEvent<HTMLSelectElement>) {
      dispatch({type: reducerActions.QUANTITY, payload: {...item, quantity: Number(e.target.value)}})
    }

    function handleRemoveItem() {
      dispatch({type: reducerActions.REMOVE, payload: item})
    }

  return (
    <li className='flex justify-between items-center border-b-1 pb-1'>
      <div className='flex items-center gap-x-5'>
        <div>
          <img src={imgUrl} alt={item.name} className='w-25'/>
        </div>

        <div>
          <label> Quantity: </label>
          <select 
            value={item.quantity} 
            onChange={(e) => handleQuantityChange(e)} >
              {Array.from({length: 20}, (_, i) => i + 1 ) 
              .map( (num) => (<option value={num} key={num}> {num} </option>))}
          </select>
          <button onClick={() => handleRemoveItem()}> ❌ </button>
        </div>
      </div>


      <div className='text-right'>
        <div>
          Price per item: {item.price.toFixed(2)} Kč
        </div>
        <div>
          Total price: {itemTotalPrice.toFixed(2)} Kč
        </div>
      </div>

    </li>
  )
}

function areItemsEqual({ item: prevItem }: CartItemProps, { item: nextItem }: CartItemProps) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  })
}


const MemoizedCartItem  = memo<typeof CartItem>(CartItem, areItemsEqual)

export default MemoizedCartItem 




