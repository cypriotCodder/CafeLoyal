import type { User } from '../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
    // Mock login for now
    const handleLoginClick = () => {
        const mockUser: User = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com'
        };
        onLogin(mockUser);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen grid-row-2 md:grid-row-1 md:grid-cols-1">
            <div className="bg-gray-300 p-10 rounded-lg">
                <div className="flex flex-col justify-center items-center mb-10">
                    <h1 className="text-2xl font-bold text-center">Login Page</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <input type="text" placeholder="Email" className="p-2 border border-gray-300 rounded-lg mb-4" />
                    <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded-lg mb-4" />
                    <button onClick={handleLoginClick} className="justify-self-center items-center px-6 py-2 bg-sky-800 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">Login</button>
                </div>
            </div>
        </div>
    );
}


export default LoginPage;