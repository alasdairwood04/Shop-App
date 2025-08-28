import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    
    // Calculate cart total
    const cartTotal = cartItems.reduce((total, item) => 
        total + item.price * item.quantity, 0).toFixed(2);
    
    // If cart is empty, show empty state
    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-800">Your cart is empty</h2>
                    <p className="mt-2 text-gray-600">Looks like you haven't added anything to your cart yet</p>
                    <Link to="/shop" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                {/* Cart header */}
                <div className="px-6 py-4 bg-gray-50 border-gray-600 flex">
                    <span className="flex-grow font-medium">Product</span>
                    <span className="w-24 text-center font-medium">Quantity</span>
                    <span className="w-24 text-center font-medium">Price</span>
                    <span className="w-16"></span> {/* For the remove button */}
                </div>
                
                {/* Cart items */}
                <div className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                        <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                            {/* Product image and info */}
                            <div className="flex flex-grow items-center gap-4">
                                <div className="w-16 h-16 rounded-lg bg-gray-100 p-2 flex-shrink-0">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-contain" 
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium text-gray-800 line-clamp-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                                </div>
                            </div>
                            
                            {/* Quantity controls - UPDATED */}
                            <div className="w-24 flex items-center justify-center">
                                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 text-center min-w-[30px]">
                                        {item.quantity}
                                    </span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            {/* Total price */}
                            <div className="w-24 text-center font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            
                            {/* Remove button */}
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="w-16 flex justify-center text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Remove item"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Order summary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>${cartTotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${cartTotal}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                        <button 
                            className="flex-grow py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                        <Link 
                            to="/shop"
                            className="py-3 px-5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}