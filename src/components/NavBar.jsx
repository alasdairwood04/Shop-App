import { Link } from 'react-router-dom';
import { useCart } from "../context/CartContext";

function NavBar() {
    const { cartItems } = useCart();

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/shop">Shop</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                <li>
                    <span className="text-gray-300">{cartItems.length} items</span>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
