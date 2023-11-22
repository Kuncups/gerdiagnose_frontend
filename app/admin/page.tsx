'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/page';

interface User {
    id: number;
    nama: string;
    tanggal_lahir: string;
    usia: string;
    jenis_kelamin: string;
    penyakit: string;
}

const Admin: React.FC = () => {
    const [tableData, setTableData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of users to display per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<User[]>('http://localhost:3001/user');
                setTableData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = tableData.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-20 p-4 sm:p-8">
                <h1 className="text-3xl font-bold mb-6">Data User</h1>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden">
                        {/* Your table header here */}
                        <thead className="text-xs text-gray-900 uppercase bg-gray-400 dark:text-gray-400">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 sm:py-4">Nama</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4">Tanggal Lahir</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4">Usia</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4">Jenis Kelamin</th>
                                <th className="px-4 sm:px-6 py-3 sm:py-4">Penyakit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((row) => (
                                <tr key={row.id} className="bg-white dark:bg-gray-800 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {row.nama}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">{row.tanggal_lahir}</td>
                                    <td className="px-4 sm:px-6 py-4">{row.usia}</td>
                                    <td className="px-4 sm:px-6 py-4">{row.jenis_kelamin}</td>
                                    <td className="px-4 sm:px-6 py-4">{row.penyakit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastUser >= tableData.length}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
