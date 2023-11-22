'use client'

import React from 'react';
import GerdAkutComponent from '../components/GerdAkutComponent'; // Adjust the path accordingly

interface GerdAkutData {
    image: string;
    name: string;
    text: any;
    link: string;
}

const GerdAkutContainer: React.FC = () => {
    const akutData: GerdAkutData[] = [
        {
            image: 'https://image-cdn.medkomtek.com/DCv0wWnAqinKTNG3PxArh5hfWYc=/673x373/smart/klikdokter-media-buckets/medias/2315371/original/039919900_1591198195-Pengertian-Gerd-shutterstock_1154429653.jpg',
            name: 'GERD AKUT',
            text: `
                Kamu menderita GERD Akut. Penyebab GERD Akut adalah GERD Akut yang terjadi berulang
    
                Untuk mencegah GERD Akut:
                - Mengatur pola diet yang tidak merangsang produksi asam lambung yang berlebihan
                - Mengatur emosi, karena adrenalin juga memicu produksi asam lambung
                - Mengkonsumsi obat-obat yang menghambat pompa asam lambung jika memang sudah ada gejala GERD
                - Minuman yang berkafein tinggi atau beralkohol
                - Menggunakan pakaian yang ketat
    
                Obat-obatan yang disarankan oleh ahli:
                1. Proton Pump Inhibitor (Omeprazol, Pantoprazol, Lansoprazol, dll)
                2. Antagonis reseptor H2 (ranitidine, cimetidine)
                3. Antasida
    
                Perlu diingat, semua obat memiliki efek samping. Untuk informasi lebih lanjut, kamu bisa baca artikel di bawah ini atau konsultasikan dengan dokter.
            `,
            link: 'https://www.halodoc.com/artikel/asam-lambung-naik-bagaimana-cara-mengatasinya'
        },
    ];


    return (
        <>
            {akutData.map((data, index) => (
                <GerdAkutComponent key={index} {...data} />
            ))}
        </>
    );
};

export default GerdAkutContainer;
