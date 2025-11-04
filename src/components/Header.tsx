import useCart from "../hooks/useCart";
import Button from "./Button";

type HeaderProps = {
    view: 'productList' | 'cart';
    setView: React.Dispatch<React.SetStateAction<'productList' | 'cart'>>;
}

const Header = ({view, setView}: HeaderProps) => {

    const { numOfCartItems, orderPrice } = useCart();
    const formattedOrderPrice = orderPrice === 0 ? 0 : orderPrice.toFixed(2);
     
    function changeView() {
        if (view === 'cart') {
            setView('productList');
        }
        else {
            setView('cart');
        }
    }

  return (
    <header className="flex justify-between items-center py-4 border-b-1 border-gray-300 mb-10">
        <div className=""> 
            <h1 className="text-2xl font-semibold">Trendovo.cz</h1>
        </div>

    
    <div className="flex items-center gap-4">

       {view === "productList" &&
            <div className="flex flex-col">
                <p>Items in cart: {numOfCartItems}</p>
                <p>Order price: {formattedOrderPrice} Kč</p>
            </div>
        }

        <div>  
            <Button onClick={() => changeView()}>
                {view === "productList" ? "Show cart" : "Show products"}
            </Button>
        </div>
    </div>

    </header>
  )
}

export default Header
