import { useState } from "react";
import { useCart } from "../context/CartContext";


function ProductCard({ product }) {
    const [expanded, setExpanded] = useState(false);
    const { addToCart } = useCart();
   const [justAdded, setJustAdded] = useState(false);


    const maxLength = 125;
    const isLongDescription = product.description.length > maxLength;
    const displayDescription = expanded || !isLongDescription 
        ? product.description 
        : `${product.description.substring(0, maxLength)}...`;

        
    const handleAddToCart = () => {
        addToCart(product);
        setJustAdded(true);
        
        // Reset button after 1.5 seconds
        setTimeout(() => {
            setJustAdded(false);
        }, 1500);
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
            
            {/* Price and button at bottom */}
            <div className="mt-auto">
                <p className="text-lg font-semibold mb-2">${product.price}</p>
                <button 
                    onClick={handleAddToCart}
                    className={`w-full py-2 px-4 rounded transition-colors duration-300 ${
                        justAdded 
                            ? 'bg-green-500 hover:bg-green-600 active:bg-green-700' 
                            : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                    } text-white`}
                >
                    {justAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
export default ProductCard;