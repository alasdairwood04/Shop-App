import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFound() {
    const navigate = useNavigate();
    
    // Auto-redirect after 10 seconds
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 10000);
        
        return () => clearTimeout(redirectTimer);
    }, [navigate]);
    
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center max-w-md">
                <div className="mb-8 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                
                <h1 className="text-4xl font-bold mb-2 text-gray-900">Page Not Found</h1>
                <p className="text-xl text-gray-600 mb-8">
                    We couldn't find the page you're looking for.
                </p>
                
                <div className="space-y-4">
                    <Link 
                        to="/"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                        Return to Homepage
                    </Link>
                    
                    <Link 
                        to="/shop"
                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
                
                <p className="text-sm text-gray-500 mt-8">
                    You'll be automatically redirected to the homepage in a few seconds.
                </p>
            </div>
        </div>
    );
}