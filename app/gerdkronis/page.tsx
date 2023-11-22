import React from 'react';
import GerdKronisComponent from '../components/GerdKronisComponent'; // Adjust the path accordingly

interface GerdKronisData {
    image: string;
    name: string;
    text: React.ReactNode; // Change 'any' to 'React.ReactNode' for better type checking
    link: string;
}

const GerdKronisContainer: React.FC = () => {
    const gerdKronisData: GerdKronisData[] = [
        {
            image: 'https://image-cdn.medkomtek.com/DCv0wWnAqinKTNG3PxArh5hfWYc=/673x373/smart/klikdokter-media-buckets/medias/2315371/original/039919900_1591198195-Pengertian-Gerd-shutterstock_1154429653.jpg',
            name: 'GERD KRONIS',
            text: `
                Kamu menderita GERD Kronis. Penyebab GERD Kronis adalah GERD Akut yang terjadi berulang
    
                Untuk mencegah GERD Kronis:
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
            {gerdKronisData.map((data, index) => (
                <GerdKronisComponent key={index} {...data} />
            ))}
        </>
    );
};

export default GerdKronisContainer;