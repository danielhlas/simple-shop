import useCart from "../hooks/useCart";
import Button from "./Button";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";



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
    <header className="flex justify-between items-center px-16 py-4 bg-white border-b-1 border-gray-300 mb-10">
        <div className="flex items-center gap-2"> 
            <IoBagHandleOutline className="text-3xl text-blue-500"/>
            <h1 className="text-2xl font-bold">Trendovo.cz</h1>
        </div>

    
    <div className="flex items-center gap-4">

       {view === "productList" && <span>Cart ({numOfCartItems} items) - {formattedOrderPrice} Kč</span>}

       <Button onClick={() => changeView()} color="blue">
         {view === "productList" ?     
            <span className="flex items-center gap-2">
                <MdOutlineShoppingCart />
                <span>View cart</span>
            </span>
        : "Show products"}
       </Button>
       
    </div>

    </header>
  )
}

export default Header
