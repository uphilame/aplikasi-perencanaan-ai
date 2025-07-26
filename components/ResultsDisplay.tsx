
import React from 'react';
import { PerencanaanData } from '../types';
import ResultCard from './ResultCard';

interface ResultsDisplayProps {
  data: Partial<PerencanaanData>;
}

const formatBulletToHTML = (text?: string): React.ReactNode => {
  if (typeof text !== 'string' || !text.trim()) return <p>Data tidak tersedia.</p>;
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.some(line => line.trim().startsWith('-'))) {
    return (
      <ul className="space-y-1">
        {lines.map((line, index) => (
          <li key={index} className="ml-4 list-disc">{line.replace(/^- /, '').trim()}</li>
        ))}
      </ul>
    );
  }
  return <p>{text}</p>;
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  return (
    <div id="output-container" className="mt-8 space-y-6">
      {data.identitas && data.identifikasi && data.desainPembelajaran && (
        <ResultCard>
          <div className="space-y-8">
            <Section title="Identitas" content={<IdentitasContent data={data.identitas} />} />
            <Section title="Identifikasi" content={<IdentifikasiContent data={data.identifikasi} />} />
            <Section title="Desain Pembelajaran" content={<DesainContent data={data.desainPembelajaran} />} />
          </div>
        </ResultCard>
      )}

      {data.pengalamanBelajar && (
        <ResultCard>
          <Section title="Pengalaman Belajar (Langkah-Langkah Pembelajaran)" content={<PengalamanContent data={data.pengalamanBelajar} />} />
        </ResultCard>
      )}

      {data.asesmen && data.mediaSumberBelajar && (
        <ResultCard>
            <div className="space-y-8">
                <Section title="Asesmen Pembelajaran" content={<AsesmenContent data={data.asesmen} />} />
                <Section title="Media & Sumber Belajar" content={<MediaContent data={data.mediaSumberBelajar} />} />
            </div>
        </ResultCard>
      )}
    </div>
  );
};

const Section: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => (
  <div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <div className="space-y-3 text-slate-700 pl-4 border-l-4 border-purple-200">{content}</div>
  </div>
);

const IdentitasContent: React.FC<{ data: PerencanaanData['identitas'] }> = ({ data }) => (
  <div className="grid-table text-sm">
    <strong>Nama Sekolah</strong><span>: {data.namaSekolah}</span>
    <strong>Nama Guru</strong><span>: {data.namaGuru}</span>
    <strong>Mata Pelajaran</strong><span>: {data.mataPelajaran}</span>
    <strong>Kelas / Semester</strong><span>: {data.kelasSemester}</span>
    <strong>Alokasi Waktu</strong><span>: {data.alokasiWaktu}</span>
  </div>
);

const IdentifikasiContent: React.FC<{ data: PerencanaanData['identifikasi'] }> = ({ data }) => (
    <>
        <p><strong>Kesiapan Murid:</strong> {data.analisisKesiapanMurid}</p>
        <p><strong>Materi Pelajaran:</strong> {data.materiPelajaran}</p>
        <div>
            <p className="font-semibold">Dimensi Profil Lulusan:</p>
            <ul className="list-disc list-inside ml-4">
                {data.dimensiProfilLulusan?.length > 0 ? 
                    data.dimensiProfilLulusan.map(d => <li key={d}>{d}</li>) : 
                    <li>Tidak ada dimensi profil lulusan yang dipilih.</li>}
            </ul>
        </div>
    </>
);

const DesainContent: React.FC<{ data: PerencanaanData['desainPembelajaran'] }> = ({ data }) => (
    <>
        <p><strong>Lintas Disiplin Ilmu:</strong> {data.lintasDisiplinIlmu}</p>
        <p><strong>Tujuan Pembelajaran:</strong> {data.tujuanPembelajaran}</p>
        <p><strong>Topik Pembelajaran:</strong> {data.topikPembelajaran}</p>
        <p><strong>Praktik Pedagogis:</strong> {data.praktikPedagogis}</p>
        <p><strong>Kemitraan Pembelajaran:</strong> {data.kemitraanPembelajaran}</p>
        <p><strong>Lingkungan Pembelajaran:</strong> {data.lingkunganPembelajaran}</p>
        <p><strong>Pemanfaatan Digital:</strong> {data.pemanfaatanDigital}</p>
    </>
);

const PengalamanContent: React.FC<{ data: PerencanaanData['pengalamanBelajar'] }> = ({ data }) => (
    <div className="space-y-4">
        <div>
            <h4 className="font-semibold text-slate-800">1. Kegiatan Awal ({data.awal?.prinsip})</h4>
            <div className="text-slate-600 pt-1">{formatBulletToHTML(data.awal?.langkah)}</div>
        </div>
        <div>
            <h4 className="font-semibold text-slate-800">2. Kegiatan Inti</h4>
            <div className="ml-4 space-y-3 mt-1 border-l-2 border-slate-200 pl-4 pt-2">
                <div>
                    <p className="font-semibold">Memahami ({data.inti_memahami?.prinsip}):</p>
                    <div className="text-slate-600 pt-1">{formatBulletToHTML(data.inti_memahami?.langkah)}</div>
                </div>
                <div>
                    <p className="font-semibold">Mengaplikasi ({data.inti_mengaplikasi?.prinsip}):</p>
                    <div className="text-slate-600 pt-1">{formatBulletToHTML(data.inti_mengaplikasi?.langkah)}</div>
                </div>
                <div>
                    <p className="font-semibold">Merefleksi ({data.inti_merefleksi?.prinsip}):</p>
                    <div className="text-slate-600 pt-1">{formatBulletToHTML(data.inti_merefleksi?.langkah)}</div>
                </div>
            </div>
        </div>
        <div>
            <h4 className="font-semibold text-slate-800">3. Kegiatan Penutup ({data.penutup?.prinsip})</h4>
            <div className="text-slate-600 pt-1">{formatBulletToHTML(data.penutup?.langkah)}</div>
        </div>
    </div>
);

const AsesmenContent: React.FC<{ data: PerencanaanData['asesmen'] }> = ({ data }) => (
    <div className="space-y-4">
        <div>
            <h4 className="font-semibold text-slate-800">Asesmen Awal (Diagnostik)</h4>
            <p className="text-slate-600">{data.asesmenAwal}</p>
        </div>
        <div>
            <h4 className="font-semibold text-slate-800">Asesmen Proses (Formatif)</h4>
            <p className="text-slate-600">{data.asesmenProses}</p>
        </div>
        <div>
            <h4 className="font-semibold text-slate-800">Asesmen Akhir (Sumatif)</h4>
            <p className="text-slate-600">{data.asesmenAkhir}</p>
        </div>
        {data.asesmenHasilPembelajaran?.rubrik?.length > 0 && (
            <div className="mt-4">
                <h4 className="font-semibold text-slate-800">Rubrik Penilaian</h4>
                <p className="text-slate-600 mb-2 text-sm">{data.asesmenHasilPembelajaran.deskripsi}</p>
                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left text-slate-500 border-collapse">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                            <tr>
                                <th scope="col" className="px-2 py-2 border border-slate-200">Kriteria</th>
                                <th scope="col" className="px-2 py-2 border border-slate-200">Belum Berkembang</th>
                                <th scope="col" className="px-2 py-2 border border-slate-200">Mulai Berkembang</th>
                                <th scope="col" className="px-2 py-2 border border-slate-200">Berkembang Sesuai Harapan</th>
                                <th scope="col" className="px-2 py-2 border border-slate-200">Berkembang Sangat Baik</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.asesmenHasilPembelajaran.rubrik.map((item, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-2 py-2 border border-slate-200 font-medium text-slate-900">{item.kriteria}</td>
                                    <td className="px-2 py-2 border border-slate-200">{item.belumBerkembang}</td>
                                    <td className="px-2 py-2 border border-slate-200">{item.mulaiBerkembang}</td>
                                    <td className="px-2 py-2 border border-slate-200">{item.berkembangSesuaiHarapan}</td>
                                    <td className="px-2 py-2 border border-slate-200">{item.berkembangSangatBaik}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
);

const MediaContent: React.FC<{ data: string[] }> = ({ data }) => (
    <ul className="list-disc list-inside">
        {data?.length > 0 ? data.map((m, i) => <li key={i}>{m}</li>) : <li>Tidak ada data.</li>}
    </ul>
);

export default ResultsDisplay;
