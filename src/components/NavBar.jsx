import { Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { useState } from 'react';

function NavBar() {
    const { cartItems } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Calculate total items in cart
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="font-bold text-xl text-blue-600">
                        Store Front
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">
                            Home
                        </Link>
                        <Link to="/shop" className="text-gray-700 hover:text-blue-600">
                            Shop
                        </Link>
                        <Link to="/cart" className="text-gray-700 hover:text-blue-600 flex items-center">
                            Cart
                            {itemCount > 0 && (
                                <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                    
                    {/* Mobile menu button */}
                    <button 
                        className="md:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>
            </div>
            
            {/* Mobile Navigation - Simplified slide-down menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t shadow-sm">
                    <div className="container mx-auto px-4">
                        <Link 
                            to="/" 
                            className="block py-3 text-gray-700 border-b"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/shop" 
                            className="block py-3 text-gray-700 border-b"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link 
                            to="/cart" 
                            className="block py-3 text-gray-700 flex items-center justify-between"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Cart
                            {itemCount > 0 && (
                                <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default NavBar;