
import { PerencanaanData } from '../types';

const generateTextForCopy = (p: PerencanaanData): string => {
    let text = `PERENCANAAN PEMBELAJARAN\n=========================\n\n`;
    
    if (p.identitas) {
        text += `IDENTITAS\n`;
        text += `----------\n`;
        text += `Nama Sekolah: ${p.identitas.namaSekolah}\n`;
        text += `Nama Guru: ${p.identitas.namaGuru}\n`;
        text += `Mata Pelajaran: ${p.identitas.mataPelajaran}\n`;
        text += `Kelas / Semester: ${p.identitas.kelasSemester}\n`;
        text += `Alokasi Waktu: ${p.identitas.alokasiWaktu}\n\n`;
    }

    if (p.identifikasi) {
        text += `IDENTIFIKASI\n`;
        text += `-------------\n`;
        text += `Kesiapan Murid: ${p.identifikasi.analisisKesiapanMurid}\n`;
        text += `Materi Pelajaran: ${p.identifikasi.materiPelajaran}\n`;
        text += `Dimensi Profil Lulusan: ${p.identifikasi.dimensiProfilLulusan.join(', ')}\n\n`;
    }

    if (p.desainPembelajaran) {
        text += `DESAIN PEMBELAJARAN\n`;
        text += `--------------------\n`;
        text += `Tujuan Pembelajaran: ${p.desainPembelajaran.tujuanPembelajaran}\n`;
        text += `Topik Pembelajaran: ${p.desainPembelajaran.topikPembelajaran}\n\n`;
    }

    if (p.pengalamanBelajar) {
        text += `PENGALAMAN BELAJAR\n`;
        text += `---------------------\n`;
        Object.entries(p.pengalamanBelajar).forEach(([key, value]) => {
            text += `${key.replace('_', ' ').toUpperCase()}:\n${value.langkah.replace(/^- /gm, '  - ')}\n\n`;
        });
    }

    if (p.asesmen) {
        text += `ASESMEN PEMBELAJARAN\n`;
        text += `-----------------------\n`;
        text += `Asesmen Awal: ${p.asesmen.asesmenAwal}\n`;
        text += `Asesmen Proses: ${p.asesmen.asesmenProses}\n`;
        text += `Asesmen Akhir: ${p.asesmen.asesmenAkhir}\n`;
        if (p.asesmen.asesmenHasilPembelajaran?.rubrik?.length > 0) {
            text += `\nRUBRIK PENILAIAN\n`;
            p.asesmen.asesmenHasilPembelajaran.rubrik.forEach(item => {
                text += `Kriteria: ${item.kriteria}\n - Belum Berkembang: ${item.belumBerkembang}\n ...\n`;
            });
        }
        text += `\n`;
    }

    if (p.mediaSumberBelajar) {
        text += `MEDIA & SUMBER BELAJAR\n`;
        text += `-------------------------\n`;
        text += p.mediaSumberBelajar.join('\n');
    }

    return text;
};

export const handleCopy = (data: PerencanaanData) => {
    const textToCopy = generateTextForCopy(data);
    navigator.clipboard.writeText(textToCopy).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

const createHtmlSection = (title: string, content: string) => `
    <div>
        <h3 class="text-xl font-bold text-slate-800 mb-3">${title}</h3>
        <div class="space-y-3 text-slate-700 pl-4 border-l-4 border-purple-200">${content}</div>
    </div>
`;

const formatList = (text: string = '') => `<ul>${text.split('\n').filter(Boolean).map(line => `<li class="ml-4 list-disc">${line.replace(/^- /, '')}</li>`).join('')}</ul>`;

export const handleExportHTML = (p: PerencanaanData) => {
    const identitasHTML = p.identitas ? `<div class="grid-table text-sm"><strong>Nama Sekolah</strong><span>: ${p.identitas.namaSekolah}</span><strong>Nama Guru</strong><span>: ${p.identitas.namaGuru}</span><strong>Mata Pelajaran</strong><span>: ${p.identitas.mataPelajaran}</span><strong>Kelas / Semester</strong><span>: ${p.identitas.kelasSemester}</span><strong>Alokasi Waktu</strong><span>: ${p.identitas.alokasiWaktu}</span></div>` : '';
    const identifikasiHTML = p.identifikasi ? `<p><strong>Kesiapan Murid:</strong> ${p.identifikasi.analisisKesiapanMurid}</p><p><strong>Materi Pelajaran:</strong> ${p.identifikasi.materiPelajaran}</p><div><p class="font-semibold">Dimensi Profil Lulusan:</p><ul class="list-disc list-inside ml-4">${p.identifikasi.dimensiProfilLulusan.map(d => `<li>${d}</li>`).join('')}</ul></div>` : '';
    const desainHTML = p.desainPembelajaran ? `<p><strong>Lintas Disiplin Ilmu:</strong> ${p.desainPembelajaran.lintasDisiplinIlmu}</p><p><strong>Tujuan Pembelajaran:</strong> ${p.desainPembelajaran.tujuanPembelajaran}</p><p><strong>Topik Pembelajaran:</strong> ${p.desainPembelajaran.topikPembelajaran}</p><p><strong>Praktik Pedagogis:</strong> ${p.desainPembelajaran.praktikPedagogis}</p><p><strong>Kemitraan Pembelajaran:</strong> ${p.desainPembelajaran.kemitraanPembelajaran}</p><p><strong>Lingkungan Pembelajaran:</strong> ${p.desainPembelajaran.lingkunganPembelajaran}</p><p><strong>Pemanfaatan Digital:</strong> ${p.desainPembelajaran.pemanfaatanDigital}</p>` : '';
    const pengalamanHTML = p.pengalamanBelajar ? `<div class="space-y-4"><div><h4 class="font-semibold text-slate-800">1. Kegiatan Awal (${p.pengalamanBelajar.awal?.prinsip})</h4><div class="text-slate-600">${formatList(p.pengalamanBelajar.awal?.langkah)}</div></div><div><h4 class="font-semibold text-slate-800">2. Kegiatan Inti</h4><div class="ml-4 space-y-3 mt-1 border-l-2 border-slate-200 pl-4"><div><p class="font-semibold">Memahami (${p.pengalamanBelajar.inti_memahami?.prinsip}):</p><div class="text-slate-600">${formatList(p.pengalamanBelajar.inti_memahami?.langkah)}</div></div><div><p class="font-semibold">Mengaplikasi (${p.pengalamanBelajar.inti_mengaplikasi?.prinsip}):</p><div class="text-slate-600">${formatList(p.pengalamanBelajar.inti_mengaplikasi?.langkah)}</div></div><div><p class="font-semibold">Merefleksi (${p.pengalamanBelajar.inti_merefleksi?.prinsip}):</p><div class="text-slate-600">${formatList(p.pengalamanBelajar.inti_merefleksi?.langkah)}</div></div></div></div><div><h4 class="font-semibold text-slate-800">3. Kegiatan Penutup (${p.pengalamanBelajar.penutup?.prinsip})</h4><div class="text-slate-600">${formatList(p.pengalamanBelajar.penutup?.langkah)}</div></div></div>` : '';
    const rubrikHTML = p.asesmen?.asesmenHasilPembelajaran?.rubrik?.length > 0 ? `<div class="overflow-x-auto mt-4"><table class="w-full text-sm text-left text-slate-500 border-collapse"><thead class="text-xs text-slate-700 uppercase bg-slate-100"><tr><th scope="col" class="px-2 py-2 border border-slate-200">Kriteria</th><th scope="col" class="px-2 py-2 border border-slate-200">Belum Berkembang</th><th scope="col" class="px-2 py-2 border border-slate-200">Mulai Berkembang</th><th scope="col" class="px-2 py-2 border border-slate-200">Berkembang Sesuai Harapan</th><th scope="col" class="px-2 py-2 border border-slate-200">Berkembang Sangat Baik</th></tr></thead><tbody>${p.asesmen.asesmenHasilPembelajaran.rubrik.map(item => `<tr><td class="px-2 py-2 border border-slate-200 font-medium text-slate-900">${item.kriteria}</td><td class="px-2 py-2 border border-slate-200">${item.belumBerkembang}</td><td class="px-2 py-2 border border-slate-200">${item.mulaiBerkembang}</td><td class="px-2 py-2 border border-slate-200">${item.berkembangSesuaiHarapan}</td><td class="px-2 py-2 border border-slate-200">${item.berkembangSangatBaik}</td></tr>`).join('')}</tbody></table></div>` : '';
    const asesmenHTML = p.asesmen ? `<div class="space-y-4"><div><h4 class="font-semibold text-slate-800">Asesmen Awal (Diagnostik)</h4><p class="text-slate-600">${p.asesmen.asesmenAwal}</p></div><div><h4 class="font-semibold text-slate-800">Asesmen Proses (Formatif)</h4><p class="text-slate-600">${p.asesmen.asesmenProses}</p></div><div><h4 class="font-semibold text-slate-800">Asesmen Akhir (Sumatif)</h4><p class="text-slate-600">${p.asesmen.asesmenAkhir}</p></div>${rubrikHTML}</div>` : '';
    const mediaHTML = p.mediaSumberBelajar ? `<ul class="list-disc list-inside">${p.mediaSumberBelajar.map(m => `<li>${m}</li>`).join('')}</ul>` : '';

    const htmlContent = `
        <!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Perencanaan Pembelajaran - ${p.desainPembelajaran?.topikPembelajaran || 'Draf'}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body { font-family: 'Inter', sans-serif; }
            .print-container { max-width: 800px; margin: auto; }
            .grid-table { display: grid; grid-template-columns: max-content auto; gap: 0.25rem 0.5rem; }
            .grid-table strong { grid-column: 1; } .grid-table span { grid-column: 2; }
        </style></head><body class="bg-slate-100 p-8">
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 print-container">
            <h2 class="text-2xl font-bold text-slate-800 text-center w-full mb-6 border-b pb-4">Perencanaan Pembelajaran</h2>
            <div class="space-y-8">
                ${createHtmlSection('Identitas', identitasHTML)}
                ${createHtmlSection('Identifikasi', identifikasiHTML)}
                ${createHtmlSection('Desain Pembelajaran', desainHTML)}
                ${createHtmlSection('Pengalaman Belajar (Langkah-Langkah Pembelajaran)', pengalamanHTML)}
                ${createHtmlSection('Asesmen Pembelajaran', asesmenHTML)}
                ${createHtmlSection('Media & Sumber Belajar', mediaHTML)}
            </div>
        </div></body></html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Perencanaan_Pembelajaran_Lengkap.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
