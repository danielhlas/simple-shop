import React, { createContext, ReactElement, useMemo, useReducer } from "react";

export type CartItemType = {
    sku: string;
    name: string;
    price: number;
    quantity: number;
}
type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }


//----- REDUCER -----
const REDUCER_ACTIONS = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT_ORDER: "SUBMIT_ORDER",
}

export type ReducerActionType = typeof REDUCER_ACTIONS

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}


function reducer(state: CartStateType, action: ReducerAction): CartStateType {
	switch(action.type){

        //add selected product to cart
		case REDUCER_ACTIONS.ADD:  {
            if (!action.payload) {throw new Error("Payload is required for ADD action")}
            //bez tohoto ověřování by TS vyhazoval chybu u dalšího řádku, kde by psal že to eventuálně nemusí jít načíst

            const { sku, name, price } = action.payload // destrukturalizace payloadu, tzn payload(data) dorazí z actionu do reduceru
            
			const filteredCart: CartItemType[] = state.cart.filter(currentItem => currentItem.sku !== sku) 
            //v filteredCart zůstanou všechny itemy, které neupdatujeme

            //kontrola zda item, který updatujeme, existuje (pokud ne, byl by undefined)
            const selectedItem: CartItemType | undefined = state.cart.find(currentItem => currentItem.sku === sku)
            
            const quantity = selectedItem ? selectedItem.quantity + 1 : 1;

            return {...state, cart: [...filteredCart, { sku, name, price, quantity }] }
        }

        
        //remove product from cart
		case REDUCER_ACTIONS.REMOVE: {
            if (!action.payload) {throw new Error("Payload is required for REMOVE action")}

            const { sku } = action.payload 
            
			const filteredCart: CartItemType[] = state.cart.filter(currentItem => currentItem.sku !== sku) 

			return {...state, cart: [...filteredCart] }
		}

        

        //update quantity of selected product in cart
		case REDUCER_ACTIONS.QUANTITY: {
            if (!action.payload) {throw new Error("Payload is required for QUANTITY action")}

            const { sku, quantity } = action.payload 
            
            const selectedItem: CartItemType | undefined = state.cart.find(currentItem => currentItem.sku === sku)
            if (!selectedItem) {
                throw new Error("Item must exist in cart to update quantity")
            }
            

			const filteredCart: CartItemType[] = state.cart.filter(currentItem => currentItem.sku !== sku) 
            const updatedItem: CartItemType = { ...selectedItem, quantity }

			return {...state, cart : [...filteredCart, updatedItem] }
		}


        //submit order (clear cart)
		case REDUCER_ACTIONS.SUBMIT_ORDER: {
			return {...state, cart: []}
		}

		default:
			throw new Error("Reducer action type not found")
	}
}




//CONTEXT (custom hook)
const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState)


    //useMemo si zapamatuje REDUCER_ACTIONS, takže to má vždy referenciální stejnost když to passujeme do komponent. To nám v budoucnu pomůže memoize komponenty, aniž bychom se museli strachovat, že by reducer actions způsoboval re-render
 const reducerActions = useMemo(() => {
    return REDUCER_ACTIONS
 }, [])

   
    const numOfCartItems: number = state.cart.reduce(function(acc, i) { 
        return acc + i.quantity	
    }, 0 )

    const orderPrice: number = state.cart.reduce(function(acc, i) { 
    return acc + (i.quantity * i.price)	
    }, 0 )   

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })


    return {dispatch, reducerActions, numOfCartItems, orderPrice, cart}
}



//CONTEXT
export type UseCartContextType = ReturnType<typeof useCartContext>

const initStateContext: UseCartContextType = {
    dispatch: () => {},
    reducerActions: REDUCER_ACTIONS,
    numOfCartItems: 0,
    orderPrice: 0,
    cart: [],
}

const CartContext = createContext<UseCartContextType>(initStateContext)



//PROVIDER
type ChildrenType = {
    children?: React.ReactElement | React.ReactElement[]
}

export const CartProvider = ({children}: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext

