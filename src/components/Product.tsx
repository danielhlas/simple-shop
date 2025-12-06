import React, { memo } from 'react';
import { ProductType } from '../context/ProductsProvider';
import { ReducerActionType, ReducerAction, CartItemType } from '../context/CartProvider';
import Button from './Button';
import { SiTicktick } from "react-icons/si";


type ProductProps = {
  product: ProductType;
  isInCart: boolean;
  dispatch: React.Dispatch<ReducerAction>;
  reducerActions: ReducerActionType;
  item?: CartItemType;
}

const Product = ({ product, item, isInCart, dispatch, reducerActions }: ProductProps) => {

  const imgUrl: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href

  function handleAddToCart() {
    dispatch({
      type: reducerActions.ADD,
      payload: { ...product, quantity: 1 }
    })
  }

  function handleRemoveItem() {
    dispatch({
      type: reducerActions.REMOVE,
      payload: item
    })
  }

  return (
    <article className='group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100'>

      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={imgUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />

        {isInCart && (
          <div className='absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in duration-300'>
            <SiTicktick className='text-[10px]' />
            Added
          </div>
        )}
      </div>


      <div className='p-5 flex flex-col flex-grow'>

        <div className="flex justify-between items-start mb-2">
          <h2 className='text-lg font-bold text-gray-900 leading-tight line-clamp-2'>{product.name}</h2>
        </div>

        <p className='text-2xl font-bold text-gray-900 mb-4'>{new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(product.price)}</p>

        <div className="mt-auto">
          <Button
            onClick={() => isInCart ? handleRemoveItem() : handleAddToCart()}
            color={isInCart ? "danger" : "blue"}
            fullWidth={true}
            className={isInCart ? "opacity-80 hover:opacity-100" : ""}
          >
            {isInCart ? "Remove from cart" : "Add to cart"}
          </Button>
        </div>
      </div>

    </article>
  )
}

function areProductsEqual({ product: prevProduct, isInCart: prevIsInCart }: ProductProps, { product: nextProduct, isInCart: nextIsInCart }: ProductProps) {
  return Object.keys(prevProduct).every(key => {
    return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType] && prevIsInCart === nextIsInCart
  })
}


const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct

