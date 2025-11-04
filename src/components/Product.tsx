import React, { memo } from 'react';
import { ProductType } from '../context/ProductsProvider';  
import { ReducerActionType, ReducerAction } from '../context/CartProvider';
import Button from './Button';

type ProductProps = {
    product: ProductType;
    isInCart: boolean;
    dispatch: React.Dispatch<ReducerAction>;
    reducerActions: ReducerActionType;
}

const Product = ({product, isInCart, dispatch, reducerActions } : ProductProps) => {

  const imgUrl: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href

  function handleAddToCart() {
    dispatch({
        type: reducerActions.ADD,
        payload: {...product, quantity: 1}
    })
  }

  return (
    <div className='flex flex-col text-center shadow-sm h-full'>
      <div className="flex items-center justify-center mb-6">
        <img src={imgUrl} alt={product.name} className="w-[430px]"/>
       </div>


       <div className='p-3'>
        <div>
          <h2 className='text-xl font-semibold'>{product.name}</h2>
        </div>
        <div>
          <p>{product.price.toFixed(2)} Kč </p>
        </div>
      </div>

    <div className='pb-5'>
      <Button onClick={() => handleAddToCart()} disabled={isInCart}> 
        {isInCart ? "In cart ✅" : "Add to cart"}
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

