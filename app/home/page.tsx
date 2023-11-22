'use client'

import { Datepicker, Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define the Dashboard component
export default function Dashboard(): JSX.Element {
    // State to manage the modal visibility and user input
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        nama: '',
        tanggal_lahir: new Date(),  // Inisialisasi dengan objek Date
        usia: '',
        jenis_kelamin: '',
        penyakit: '',
    });

    // Function to handle form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData((prevData) => ({
                ...prevData,
                tanggal_lahir: date,
            }));
        }
    };


    const handleSubmit = async () => {
        try {
            // Periksa apakah formData.tanggal_lahir tidak null
            if (formData.tanggal_lahir) {
                // Konversi tanggal_lahir ke format string yang sesuai dengan format yang diharapkan oleh server
                const formattedDate = formData.tanggal_lahir.toISOString().split('T')[0];

                // Perbarui formData.tanggal_lahir dengan tanggal yang diformat
                const response = await axios.post('http://localhost:3001/user', {
                    ...formData,
                    tanggal_lahir: formattedDate,
                });

                if (response.status === 200) {
                    console.log('Data submitted successfully:', formData);
                    setOpenModal(false);
                    window.location.href = '/checklist';
                } else {
                    console.error('Failed to submit data:', response.statusText);
                }
            } else {
                console.error('Tanggal lahir tidak valid.');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <>
            {/* Your existing content */}
            <section className="h-screen bg-gray-900 dark:bg-gray-900 flex">
                <div className="m-auto grid max-w-screen-xl px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">GERDIAGNOSE +</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-200">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
                        <Button color='blue' onClick={() => setOpenModal(true)}>Get Started</Button>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
                    </div>
                </div>
            </section>

            {/* Modal component */}
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">BIODATA</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nama" value="Nama" />
                            </div>
                            <TextInput id="nama" name="nama" value={formData.nama} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="usia" value="Usia" />
                            </div>
                            <TextInput id="usia" name="usia" value={formData.usia} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tanggal_lahir" value="Tanggal Lahir" />
                            </div>
                            <DatePicker
                                id="tanggal_lahir"
                                className='text-black rounded bg-gray-100 border-gray-300 w-auto'
                                name="tanggal_lahir"
                                selected={formData.tanggal_lahir}
                                onChange={(date: Date | null) => handleDateChange(date)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                            </div>
                            <Select id="jenis_kelamin" name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleInputChange} required>
                                <option value="Tidak Dipilih">Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="penyakit" value="Penyakit" />
                            </div>
                            <Select id="penyakit" name="penyakit" value={formData.penyakit} onChange={handleInputChange} required>
                                <option value="Tidak Dipilih">Pilih Jenis Gerd</option>
                                <option value="Gerd Akut">Gerd Akut</option>
                                <option value="Gerd Kronis">Gerd Kronis</option>
                            </Select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color='blue' onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
