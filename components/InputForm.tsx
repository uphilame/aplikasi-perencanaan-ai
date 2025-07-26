
import React, { useState, FormEvent } from 'react';
import { UserInput } from '../types';
import { MATA_PELAJARAN_SD, PROFIL_LULUSAN, MODEL_PEMBELAJARAN_OPTIONS } from '../constants';
import ActionButton from './ActionButton';

interface InputFormProps {
    onSubmit: (data: UserInput) => void;
    error: string | null;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, error }) => {
    const [formData, setFormData] = useState<UserInput>({
        namaSekolah: '',
        namaGuru: '',
        kelas: '',
        semester: '',
        mapel: '',
        alokasiWaktuJP: '',
        tujuanPembelajaran: '',
        modelPembelajaran: '',
        selectedDimensi: [],
    });
    const [formError, setFormError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const newDimensi = checked
                ? [...prev.selectedDimensi, value]
                : prev.selectedDimensi.filter(d => d !== value);
            return { ...prev, selectedDimensi: newDimensi };
        });
    };

    const validateForm = () => {
        const requiredFields: (keyof UserInput)[] = ['namaSekolah', 'namaGuru', 'kelas', 'semester', 'mapel', 'alokasiWaktuJP', 'tujuanPembelajaran'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setFormError(null);
            onSubmit(formData);
        } else {
            setFormError("Mohon lengkapi semua kolom yang wajib diisi (*).");
        }
    };

    return (
        <div id="form-container" className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200">
            <form id="planner-form" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="namaSekolah">Nama Sekolah <span className="text-red-500">*</span></label>
                        <input type="text" id="namaSekolah" value={formData.namaSekolah} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Contoh: SD Negeri 1 Tasikmalaya" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="namaGuru">Nama Guru <span className="text-red-500">*</span></label>
                        <input type="text" id="namaGuru" value={formData.namaGuru} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Contoh: Budi Santoso, S.Pd." />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="kelas">Kelas <span className="text-red-500">*</span></label>
                        <select id="kelas" value={formData.kelas} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                            <option value="" disabled>Pilih Kelas</option>
                            {[1, 2, 3, 4, 5, 6].map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="semester">Semester <span className="text-red-500">*</span></label>
                        <select id="semester" value={formData.semester} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                            <option value="" disabled>Pilih Semester</option>
                            <option value="1">1 (Ganjil)</option>
                            <option value="2">2 (Genap)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="mapel">Mata Pelajaran <span className="text-red-500">*</span></label>
                        <select id="mapel" value={formData.mapel} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                            <option value="" disabled>Pilih Mata Pelajaran</option>
                            {MATA_PELAJARAN_SD.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="alokasiWaktuJP">Alokasi Waktu (JP) <span className="text-red-500">*</span></label>
                        <select id="alokasiWaktuJP" value={formData.alokasiWaktuJP} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                            <option value="" disabled>Pilih JP</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(jp => <option key={jp} value={jp}>{jp} JP</option>)}
                        </select>
                        <p className="text-xs text-slate-500 mt-1">*1 JP = 35 menit</p>
                    </div>
                    <div className="md:col-span-2 mt-6">
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="tujuanPembelajaran">Tujuan Pembelajaran <span className="text-red-500">*</span></label>
                        <textarea id="tujuanPembelajaran" value={formData.tujuanPembelajaran} onChange={handleChange} rows={3} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500" placeholder="Contoh: Murid dapat mengidentifikasi ciri-ciri makhluk hidup."></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="modelPembelajaran">Model Pembelajaran</label>
                        <select id="modelPembelajaran" value={formData.modelPembelajaran} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500">
                            <option value="">Pilih Model (opsional)</option>
                            {MODEL_PEMBELAJARAN_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2 mt-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Dimensi Profil Lulusan</label>
                        <div id="dimensi-container" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {PROFIL_LULUSAN.map(d => (
                                <label key={d} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-slate-100/50">
                                    <input type="checkbox" name="dimensi" value={d} onChange={handleCheckboxChange} className="h-4 w-4 rounded text-purple-600 border-slate-300 focus:ring-purple-500"/>
                                    <span className="text-sm text-slate-600">{d}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <ActionButton text="Buat Perencanaan Awal" isLoading={false} type="submit" />
                {(formError || error) && <div className="text-center mt-4 text-red-600 font-medium">{formError || error}</div>}
            </form>
        </div>
    );
};

export default InputForm;
