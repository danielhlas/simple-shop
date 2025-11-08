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

const Product = ({product, item, isInCart, dispatch, reducerActions } : ProductProps) => {

  const imgUrl: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href

  function handleAddToCart() {
    dispatch({
        type: reducerActions.ADD,
        payload: {...product, quantity: 1}
    })
  }

  function handleRemoveItem() {
    dispatch({
      type: reducerActions.REMOVE, 
      payload: item
    })
  }

  return (
    <div className='flex flex-col text-left shadow-sm bg-white rounded-lg pb-2'>

        <div className="relative flex items-center justify-center mb-2">
          <img src={imgUrl} alt={product.name} className="w-[430px]"/>
          {isInCart && 
          <span className='text-xs font-semibold absolute top-3 right-3 flex items-center gap-x-2 bg-green-600 rounded-xl px-3 py-2 shadow text-white'>
            <SiTicktick className='mt-0.5'/>
            In Cart
          </span>
 }
        </div>


        <div className='p-3 flex flex-col'>
          
          <h2 className='text-lg font-semibold mb-1'>{product.name}</h2>
      
          <p className='text-gray-600 mb-4'>{product.price.toFixed(2)} Kč </p>

          <Button 
            onClick={() => isInCart ? handleRemoveItem() : handleAddToCart()}
            color={isInCart ? "grey" : "blue"}
            >
              {isInCart ? "Remove from cart" : "Add to cart" }
          </Button>
       </div>

 

    </div>
  )
}

function areProductsEqual({ product: prevProduct, isInCart: prevIsInCart } : ProductProps, { product: nextProduct, isInCart: nextIsInCart }: ProductProps) {
  return Object.keys(prevProduct).every(key => {
    return prevProduct[key as keyof ProductType] === nextProduct[key as keyof ProductType] && prevIsInCart === nextIsInCart
  })
}


const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct

