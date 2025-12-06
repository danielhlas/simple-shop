import useProducts from "../hooks/useProducts"
import useCart from "../hooks/useCart";
import Product from "./Product";

const ProductList = () => {

  const { products } = useProducts();
  const { cart, dispatch, reducerActions } = useCart();

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Latest Collection
        </h2>
        <p className="text-lg text-gray-500">
          Discover our premium selection of products designed just for you. Quality meets style.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {products.map(product => (
          <div key={product.sku} className="w-72 max-w-full">
            <Product
              product={product}
              isInCart={cart.some(item => item.sku === product.sku)}
              item={cart.find(i => i.sku === product.sku)}
              dispatch={dispatch}
              reducerActions={reducerActions}
            />
          </div>
        ))}
      </div>

    </main>
  )
}

export default ProductList
