import React, { memo } from 'react';
import { IoTrashBinOutline } from "react-icons/io5";
import { CartItemType, ReducerAction, ReducerActionType } from '../context/CartProvider';

type CartItemProps = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  reducerActions: ReducerActionType;
}

function CartItem({ item, dispatch, reducerActions }: CartItemProps) {
  const imgUrl: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href
  const itemTotalPrice: number = item.price * item.quantity;

  function handleQuantityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: reducerActions.QUANTITY, payload: { ...item, quantity: Number(e.target.value) } })
  }

  function handleRemoveItem() {
    dispatch({ type: reducerActions.REMOVE, payload: item })
  }

  return (
    <tr className='border-t border-gray-100 hover:bg-gray-50/50 transition-colors duration-200'>

      <td className='px-6 py-4 whitespace-nowrap'>
        <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
          <img src={imgUrl} alt={item.name} className='w-full h-full object-cover' />
        </div>
      </td>

      <td className='px-6 py-4'>
        <div className="text-sm font-bold text-gray-900 line-clamp-2 w-48">{item.name}</div>
        <div className="text-xs text-gray-500 mt-1">SKU: {item.sku}</div>
      </td>

      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        {new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(item.price)}
      </td>

      <td className='px-6 py-4 whitespace-nowrap text-center'>
        <div className="inline-flex items-center">
          <select
            value={item.quantity}
            onChange={(e) => handleQuantityChange(e)}
            className="block w-20 rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 cursor-pointer bg-white"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((num) => (<option value={num} key={num}> {num} </option>))}
          </select>
        </div>
      </td>

      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900'>
        {new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(itemTotalPrice)}
      </td>

      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
        <button
          onClick={() => handleRemoveItem()}
          className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Remove item"
        >
          <IoTrashBinOutline className='text-xl' />
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


const MemoizedCartItem = memo<typeof CartItem>(CartItem, areItemsEqual)

export default MemoizedCartItem




