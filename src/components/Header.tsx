import useCart from "../hooks/useCart";
import Button from "./Button";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";

type HeaderProps = {
    view: 'productList' | 'cart';
    setView: React.Dispatch<React.SetStateAction<'productList' | 'cart'>>;
}

const Header = ({ view, setView }: HeaderProps) => {

    const { numOfCartItems, orderPrice } = useCart();
    const formattedOrderPrice = orderPrice === 0 ? "0" : orderPrice.toFixed(2);

    function changeView() {
        if (view === 'cart') {
            setView('productList');
        }
        else {
            setView('cart');
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setView('productList')}
                >
                    <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105">
                        <IoBagHandle className="text-xl" />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
                        Trendovo<span className="text-blue-600">.cz</span>
                    </h1>
                </div>

                <div className="flex items-center gap-6">

                    {view === "productList" && (
                        <div className="hidden sm:flex flex-col items-end mr-2 text-sm">
                            <span className="text-gray-500 text-xs uppercase tracking-wide font-semibold">Total</span>
                            <span className="font-bold text-gray-900">{formattedOrderPrice} Kč</span>
                        </div>
                    )}

                    <Button
                        onClick={() => changeView()}
                        color={view === 'productList' ? 'gradient' : 'grey'}
                        className="relative"
                    >
                        {view === "productList" ?
                            <span className="flex items-center gap-2">
                                <MdOutlineShoppingCart className="text-lg" />
                                <span>Cart</span>
                                {numOfCartItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-white">
                                        {numOfCartItems}
                                    </span>
                                )}
                            </span>
                            : "Continue Shopping"}
                    </Button>

                </div>
            </div>
        </header>
    )
}

export default Header
