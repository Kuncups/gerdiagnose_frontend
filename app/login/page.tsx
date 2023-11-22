'use client'

// Import necessary libraries
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Login component
const Login: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // Add your authentication logic here (e.g., check if username and password match)
        if (username === 'admin' && password === 'admin') {
            setLoggedIn(true);
            router.push('/admin'); // Redirect to the Admin page on successful login
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="bg-white w-full max-w-md p-6 rounded-md shadow-md">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">Login</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="border text-black border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
