import { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
    const [expanded, setExpanded] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const maxLength = 125;
    const isLongDescription = product.description.length > maxLength;
    const displayDescription = expanded || !isLongDescription 
        ? product.description 
        : `${product.description.substring(0, maxLength)}...`;
        
    const handleAddToCart = () => {
        // Add the product with the selected quantity
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        
        setJustAdded(true);
        
        // Reset button and quantity after 1.5 seconds
        setTimeout(() => {
            setJustAdded(false);
            setQuantity(1); // Reset quantity after adding
        }, 1500);
    };
    
    const incrementQuantity = () => setQuantity(prev => prev + 1);
    
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="rounded-xl p-4 bg-gray-100 shadow-sm w-full h-auto flex flex-col hover:shadow-lg">
            {/* Image container with fixed height */}
            <div className="h-40 flex items-center justify-center mb-3">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain" 
                />
            </div>
            
            {/* Title with fixed height and truncation */}
            <h2 className="text-lg font-bold mb-2 line-clamp-2 h-14">
                {product.title}
            </h2>
            
            {/* Description with conditional expansion */}
            <div className={`text-sm text-gray-700 mb-2 ${expanded ? '' : 'h-24 overflow-hidden'}`}>
                <p>{displayDescription}</p>
                
                {isLongDescription && (
                    <button 
                        onClick={() => setExpanded(!expanded)} 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>
            
            {/* Price, quantity selector, and add button */}
            <div className="mt-auto">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-lg font-semibold">${product.price}</p>
                    
                    {/* Quantity selector */}
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
                        <button 
                            onClick={decrementQuantity} 
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span className="px-3 py-1 min-w-[30px] text-center">
                            {quantity}
                        </span>
                        <button 
                            onClick={incrementQuantity}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
                        >
                            +
                        </button>
                    </div>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className={`w-full py-2 px-4 rounded transition-colors duration-300 ${
                        justAdded 
                            ? 'bg-green-500 hover:bg-green-600 active:bg-green-700' 
                            : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                    } text-white flex items-center justify-center`}
                >
                    {justAdded 
                        ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Added
                            </>
                        ) 
                        : (
                            <>
                                Add {quantity > 1 ? `${quantity} items` : 'to cart'}
                            </>
                        )
                    }
                </button>
            </div>
        </div>
    );
}

export default ProductCard;