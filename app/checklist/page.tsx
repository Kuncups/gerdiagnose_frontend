'use client'

import { useEffect, useState } from 'react';
import { Card, Checkbox, Label, Button } from 'flowbite-react';
import Navbar from '../components/Navbar/page';
import { useRouter } from 'next/navigation';

interface ChecklistItem {
    id: string;
    value: 'q1' | 'q2';
    label: string;
    checked: boolean;
}

interface UserData {
    id: string;
    nama: string;
    penyakithasil: string;
    // tambahkan properti lain jika diperlukan
}

const checklistData: ChecklistItem[] = [
    { id: 'symptom1', value: 'q1', label: 'Mual', checked: false },
    { id: 'symptom2', value: 'q1', label: 'Sering Sendawa', checked: false },
    { id: 'symptom3', value: 'q2', label: 'Tubuh Lemas', checked: false },
    { id: 'symptom4', value: 'q2', label: 'Perut Bagian Atas', checked: false },
    { id: 'symptom5', value: 'q1', label: 'Kembung', checked: false },
    { id: 'symptom6', value: 'q2', label: 'BAB Berdarah', checked: false },
    { id: 'symptom7', value: 'q1', label: 'Muntah', checked: false },
    { id: 'symptom8', value: 'q2', label: 'Muntah Berdarah', checked: false },
    { id: 'symptom9', value: 'q2', label: 'Mudah Lelah', checked: false },
    { id: 'symptom10', value: 'q1', label: 'Nafsu Makan Menurun', checked: false },
    { id: 'symptom11', value: 'q2', label: 'Dada Serasa Terbakar', checked: false },
    { id: 'symptom12', value: 'q1', label: 'Rasa Mengganjal di Tenggorokan', checked: false },
];

export default function ChecklistPage() {
    const [q1Count, setQ1Count] = useState<number>(0);
    const [q2Count, setQ2Count] = useState<number>(0);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3001/user');
                const userDataArray = await response.json();
                const lastUserData = userDataArray.length > 0 ? userDataArray[userDataArray.length - 1] : null;
                setUserData(lastUserData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleCheckboxChange = (value: 'q1' | 'q2', event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;

        if (value === 'q1') {
            setQ1Count((prevCount) => (checked ? prevCount + 1 : prevCount - 1));
        } else if (value === 'q2') {
            setQ2Count((prevCount) => (checked ? prevCount + 1 : prevCount - 1));
        }
    };

    const handleSubmit = async () => {
        // Set isProcessing to true to indicate that the submission is in progress
        setIsProcessing(true);

        try {
            // Check if userData is not null before proceeding
            if (userData) {
                // Prepare the updated user data
                const updatedUserData = {
                    ...userData,
                    penyakithasil: determinePenyakithasil(),
                };

                // Make a PUT request to update the user data on the server
                const response = await fetch(`http://localhost:3001/user/${userData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUserData),
                });

                if (response.ok) {
                    // Reset isProcessing state after the operation is complete
                    setIsProcessing(false);

                    // Redirect based on the determined penyakithasil
                    if (q1Count > q2Count) {
                        router.push('/gerdakut');
                    } else if (q2Count > q1Count) {
                        router.push('/gerdkronis');
                    } else {
                        router.push('/gerdkronis');
                        console.log('Counts are equal. You may want to handle this case differently.');
                    }
                } else {
                    console.error('Failed to update user data:', response.statusText);
                    // Handle the error as needed
                    setIsProcessing(false);
                }
            } else {
                console.error('userData is null. Unable to update.');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            // Handle the error as needed
            setIsProcessing(false);
        }
    };

    const determinePenyakithasil = () => {
        // Determine penyakithasil based on q1Count and q2Count
        if (q1Count > q2Count) {
            return 'gerdakut';
        } else if (q2Count > q1Count) {
            return 'gerdkronis';
        } else {
            // Set a default value or customize as needed
            return 'gerdkronis';
        }
    };



    return (
        <>
            <Navbar />
            <section className="h-screen bg-gray-900 dark:bg-gray-900 flex items-center justify-center p-4 md:p-8">
                <div className='w-full max-w-md'>
                    <p className="text-white text-3xl font-bold mb-4 mt-16">
                        {userData ? `Hello, ${userData.nama}!` : 'Loading...'}
                    </p>

                    <Card className='w-full'>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">DAFTAR GEJALA</h2>

                        {checklistData.map((item) => (
                            <div key={item.id} className="flex items-center gap-2">
                                <Checkbox
                                    id={item.id}
                                    defaultChecked={item.checked}
                                    onChange={(event) => handleCheckboxChange(item.value, event)}
                                />
                                <Label htmlFor={item.id}>{item.label}</Label>
                            </div>
                        ))}
                        <Button onClick={handleSubmit} className='w-full mt-4 bg-blue-700 hover:bg-blue-900' size={isProcessing ? 'md' : undefined} isProcessing={isProcessing}>
                            {isProcessing ? 'Processing...' : 'Submit'}
                        </Button>
                    </Card>
                </div>
            </section>
        </>
    );
}
