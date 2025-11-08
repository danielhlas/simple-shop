import React, { memo } from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
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
    <tr className='border-t border-gray-200 text-left'>

      <td className='w-1/8 p-4'>
        <img src={imgUrl} alt={item.name} className='rounded'/>
      </td>

      <td className='font-semibold'>{item.name}</td>

      <td className='text-gray-600'>{item.price.toFixed(2)} Kč</td>

      <td>
          <select 
            value={item.quantity} 
            onChange={(e) => handleQuantityChange(e)} >
              {Array.from({length: 20}, (_, i) => i + 1 ) 
              .map( (num) => (<option value={num} key={num}> {num} </option>))}
          </select>
      </td>

      <td className='font-semibold'>{itemTotalPrice.toFixed(2)} Kč</td>

      <td className='pr-3'>
        <button onClick={() => handleRemoveItem()}> 
          <IoTrashBinOutline className='text-red-600 cursor-pointer'/>
        </button>
      </td>
    </tr>
  )
}

function areItemsEqual({ item: prevItem }: CartItemProps, { item: nextItem }: CartItemProps) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  })
}


const MemoizedCartItem  = memo<typeof CartItem>(CartItem, areItemsEqual)

export default MemoizedCartItem 




