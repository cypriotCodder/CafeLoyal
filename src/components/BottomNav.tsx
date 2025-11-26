import { Home, Star, Scan, Coffee, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path: string) => currentPath === path ? 'text-blue-500' : 'text-gray-400';

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
            <div className="flex justify-around items-center p-2">
                <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/')} hover:text-blue-400 transition-colors`}>
                    <Home size={24} />
                    <span className="text-xs mt-1">Home</span>
                </Link>
                <Link to="/rewards" className={`flex flex-col items-center p-2 ${isActive('/rewards')} hover:text-blue-400 transition-colors`}>
                    <Star size={24} />
                    <span className="text-xs mt-1">Reward</span>
                </Link>
                <Link to="/scan" className={`flex flex-col items-center p-2 ${isActive('/scan')} hover:text-blue-400 transition-colors`}>
                    <div className="bg-black text-white p-3 rounded-full -mt-8 shadow-lg border-4 border-white">
                        <Scan size={24} />
                    </div>
                    <span className="text-xs mt-1 font-bold text-black">Scan</span>
                </Link>
                <Link to="/menu" className={`flex flex-col items-center p-2 ${isActive('/menu')} hover:text-blue-400 transition-colors`}>
                    <Coffee size={24} />
                    <span className="text-xs mt-1">Menu</span>
                </Link>
                <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive('/profile')} hover:text-blue-400 transition-colors`}>
                    <User size={24} />
                    <span className="text-xs mt-1">Profile</span>
                </Link>
            </div>
        </nav>
    );
}

export default BottomNav;
