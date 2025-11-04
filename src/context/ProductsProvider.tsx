import { createContext, ReactElement, useEffect, useState } from "react";


export type ProductType = {
    sku: string;
    name: string;
    price: number;
}
//POZOR
//pro snažší deploy použijeme seznam produktů níže, kvůli čemuž nepotřebujeme ani celý useEffect s fetch
//pokud bychom chtěli používat seznam produktů ze serveru (zde data/products.json), museli bychom tento useEffect nechat

const initState: ProductType[] = [ 
    //initState použijeme v provideru
    {
        "sku": "item0001", 
        "name": "Widget",
        "price": 9.99
    },
    {
        "sku": "item0002",
        "name": "Premium Widget",
        "price": 19.99
    },
    {
        "sku": "item0003",
        "name": "Deluxe Widget",
        "price": 29.99
    }
]




//---- Context ----
export type UseProductsContextType = { products: ProductType[] }
//Oproti ProductType tento type plně odpovídá struktuře contextu, 
//tj. je to objekt s property products

const initContextState: UseProductsContextType = { products: [] }

const ProductsContext = createContext<UseProductsContextType>(initContextState)




//---- Provider ---
type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ProductsProvider = ({children}: ChildrenType): ReactElement => { 
    const [products, setProducts] = useState<ProductType[]>(initState)

    //useState stačí, reducer by byl zbytečný
    //initState není třeba pass jako parametr do komp, ptž je v lexical scope

    //fetch products from server
    useEffect(function () {
        const controller = new AbortController();

        async function fetchProducts(): Promise<void> {
            try {
                const res = await fetch(`https://localhost:3500`);
                const data = await res.json();

                if (!res.ok) throw new Error("Fetch products failed");
                setProducts(data);
            }  
            catch (err) {
                if (err instanceof Error) {
                    console.log(err.message)
			    }
            }
        }
        fetchProducts()

       return () => {
        controller.abort();
        };
    }, []);



    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext


//JSON lokální server lze spustit pomocí příkazového řádku vs code:
//npx json-server -w C:\Users\danie\Desktop\reactTypesriptCart\public\data\products.json -p 3500
//spuštěný server zabírá okno příkazového řádku, takže aplikaci spouštíme v jiném okně terminálu