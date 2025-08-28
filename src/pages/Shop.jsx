// import { useState } from "react"
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";


export default function Shop() {

    const { data, error, loading } = useFetch("https://fakestoreapi.com/products");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {data.map(product => (
                    <li key={product.id} className="py-2">
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
