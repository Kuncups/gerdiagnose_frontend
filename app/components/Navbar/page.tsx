'use client';

import { Button, Navbar } from 'flowbite-react';

function NavigationBar() {
    return (
        <Navbar className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md" fluid rounded>
            <Navbar.Brand>
                <span className="self-center text-green-800 whitespace-nowrap text-xl font-bold dark:text-white">GERDIAGNOSE +</span>
            </Navbar.Brand>
            <div className="flex md:order-2 p-6">
                {/* <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 border border-gray-300 rounded-lg hover:text-white hover:bg-blue-900 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    Get Started
                </a> */}
                {/* <Navbar.Toggle /> */}
            </div>
            {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
            Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
    </Navbar.Collapse> */}
        </Navbar>
    );
}

export default NavigationBar;