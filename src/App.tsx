import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { useState } from 'react';
import { CartProvider } from "./context/CartProvider";
import { ProductsProvider } from "./context/ProductsProvider";
import Layout from "./components/Layout";


function App() {
  const [view, setView] = useState<'productList' | 'cart'>('productList');

  return (
    <ProductsProvider>
      <CartProvider>
        <Layout>
          <Header view={view} setView={setView}/>
          {view === 'productList' ? <ProductList /> : <></>}
          {view === 'cart' ? <Cart /> : <></>}
          <Footer view={view}  />
        </Layout>
    
      </CartProvider>
    </ProductsProvider>
  )
}

export default App
