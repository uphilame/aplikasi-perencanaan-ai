import React from 'react';
import ResultCard from '../components/ResultCard';
import PageHeader from '../components/Header';

const History = () => {
    return (
        <div>
            <PageHeader
                title="Riwayat Perencanaan"
                subtitle="Lihat kembali semua perencanaan yang pernah Anda buat."
            />
            <ResultCard>
                <div className="text-center py-12">
                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-slate-400 mb-4"><path d="M12 20v-6M12 8V4m0 0H9m3 0h3M4 14h16M5 10h14M8 20l-4-4 4-4m8 8l4-4-4-4"/></svg>
                    <h2 className="text-xl font-semibold text-slate-700">Fitur Dalam Pengembangan</h2>
                    <p className="text-slate-500 mt-2">Kemampuan untuk menyimpan dan melihat riwayat perencanaan akan segera hadir setelah backend terhubung sepenuhnya!</p>
                </div>
            </ResultCard>
        </div>
    );
};

export default History;
