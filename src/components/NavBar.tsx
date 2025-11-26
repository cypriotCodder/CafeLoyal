import { Home, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:block bg-black text-white p-4">
                <div className="container mx-auto grid grid-cols-3 items-center">
                    <div className="text-lg font-bold justify-self-start">Cafe Loyal</div>
                    <div className="flex space-x-8 justify-self-center items-center">
                        <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
                        <Link to="/menu" className="hover:text-gray-300 transition-colors">Menu</Link>
                        <Link to="/rewards" className="hover:text-gray-300 transition-colors">Rewards</Link>
                        <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
                    </div>
                    <div></div>
                </div>
            </nav>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-black text-white p-4 z-50 shadow-md">
                <div className="text-center text-lg font-bold">Cafe Loyal</div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black text-white border-t border-gray-800 z-50">
                <div className="flex justify-around items-center p-2">
                    <Link to="/" className="flex flex-col items-center p-2 hover:text-gray-300 transition-colors">
                        <Home size={24} />
                        <span className="text-xs mt-1">Home</span>
                    </Link>
                    <Link to="/menu" className="flex flex-col items-center p-2 hover:text-gray-300 transition-colors">
                        <ShoppingCart size={24} />
                        <span className="text-xs mt-1">Menu</span>
                    </Link>
                    <Link to="/rewards" className="flex flex-col items-center p-2 hover:text-gray-300 transition-colors">
                        <Star size={24} />
                        <span className="text-xs mt-1">Rewards</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
