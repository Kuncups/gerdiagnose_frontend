'use client'

import React from 'react';

interface GerdKronisData {
    image: string;
    name: string;
    text: React.ReactNode; // Change 'any' to 'React.ReactNode' for better type checking
    link: string;
}

const GerdKronisComponent: React.FC<GerdKronisData> = ({ image, name, text, link }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="lg:w-1/2 lg:mr-5">
                        <img src={image} alt={name} className="w-full h-auto" />
                    </div>
                    <div className="lg:w-1/2">
                        <h1 className="text-3xl lg:text-5xl text-black tracking-tight font-extrabold mb-4">{name}</h1>
                        <p className="text-gray-700 mb-4">{text}</p>
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            Read More
                        </a>
                        <a href="/" className="text-blue-500 underline ml-4">
                            Coba Lagi
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GerdKronisComponent;