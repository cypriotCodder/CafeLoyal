import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

function Menu() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        fetch(`${API_URL}/api/menu`)
            .then(res => res.json())
            .then(data => setMenuItems(data))
            .catch(err => console.error("Failed to fetch menu:", err));
    }, []);

    return (
        <div className="container mx-auto p-4 pb-24 md:pb-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Our Menu</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
                        <div className="h-48 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
                                </div>
                                <span className="font-bold text-lg text-gray-900">${item.price.toFixed(2)}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                            <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                <Plus size={18} />
                                Add to Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
