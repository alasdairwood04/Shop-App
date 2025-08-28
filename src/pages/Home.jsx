import { Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch";

export default function Home() {
    // Fetch featured products
    const { data, error, loading } = useFetch('https://fakestoreapi.com/products?limit=4');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="pb-12">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
                
                <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                        Discover Amazing Products
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-8">
                        Shop the latest trends and find exactly what you need at prices you'll love.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <Link 
                            to="/shop" 
                            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
                        >
                            Shop Now
                        </Link>
                        <Link 
                            to="/cart" 
                            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
                        >
                            View Cart
                        </Link>
                    </div>
                </div>
            </section>

{/* Categories Section */}
<section className="py-16 bg-white">
    <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
                {
                    name: "Electronics",
                    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500&auto=format&fit=crop",
                    color: "from-blue-900/70"
                },
                {
                    name: "Jewelry",
                    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=500&auto=format&fit=crop",
                    color: "from-yellow-900/70"
                },
                {
                    name: "Men's Clothing",
                    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=500&auto=format&fit=crop",
                    color: "from-slate-900/70"
                },
                {
                    name: "Women's Clothing",
                    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=500&auto=format&fit=crop",
                    color: "from-pink-900/70"
                }
            ].map(category => (
                <Link 
                    key={category.name} 
                    to={`/shop?category=${category.name.toLowerCase().replace("'s", "")}`}
                    className="group"
                >
                    <div className="rounded-xl aspect-square overflow-hidden relative hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                        {/* Category image */}
                        <img 
                            src={category.image}
                            alt={`${category.name} category`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        
                        {/* Overlay with text */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent flex items-end p-4 md:p-6`}>
                            <h3 className="text-white font-medium text-lg md:text-xl group-hover:underline">
                                {category.name}
                            </h3>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
</section>
            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                        <Link to="/shop" className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                            View all
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {data.map(product => (
                                <Link key={product.id} to={`/shop/`} className="group">
                                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4">
                                        <div className="h-40 flex items-center justify-center mb-4">
                                            <img 
                                                src={product.image} 
                                                alt={product.title} 
                                                className="max-h-full max-w-full object-contain" 
                                            />
                                        </div>
                                        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600">{product.title}</h3>
                                        <p className="font-semibold">${product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Alex Johnson",
                                comment: "I love the quality of products and the fast shipping. Will definitely shop here again!",
                                rating: 5
                            },
                            {
                                name: "Sarah Miller",
                                comment: "Great selection and prices. Customer service is also fantastic when I needed help.",
                                rating: 5
                            },
                            {
                                name: "James Wilson",
                                comment: "Been shopping here for months. Always reliable and the products exceed my expectations.",
                                rating: 4
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-xl">
                                <div className="flex mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                                <p className="font-medium">— {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Join Our Newsletter</h2>
                    <p className="text-gray-300 mb-6 max-w-lg mx-auto">Stay updated with our latest products and exclusive deals delivered directly to your inbox.</p>
                    
                    <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="px-4 py-3 rounded-lg flex-grow text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            type="submit"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}