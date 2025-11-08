import useProducts from "../hooks/useProducts"
import useCart from "../hooks/useCart";
import Product from "./Product";

const ProductList = () => {

  const { products } = useProducts();
  const { cart,  dispatch, reducerActions} = useCart();

  if (products.length === 0) {
    return <p>Loading products...</p>
  }
 
  return (
    <div className="container max-w-3xl mx-auto flex gap-6 pt-26 pb-16">

      {products.map(product => (
          <Product 
            key={product.sku} 
            product={product}
            isInCart={cart.some(item => item.sku === product.sku)}
            item={cart.find(i => i.sku === product.sku) }
            dispatch={dispatch}
            reducerActions ={reducerActions }
            />
      ))} 

    </div>
  )
}

export default ProductList
