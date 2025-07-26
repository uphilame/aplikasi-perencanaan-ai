import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, Identifikasi, DesainPembelajaran, PengalamanBelajar, Asesmen, PerencanaanData } from '../types';

const model = 'gemini-2.5-flash';

const callApi = async <T,>(prompt: string, responseSchema: any, apiKey: string): Promise<T> => {
    if (!apiKey) {
        throw new Error("API Key is missing. Please set it in the settings.");
    }
    const ai = new GoogleGenAI({ apiKey });

    try {
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [{ text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as T;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        if (error instanceof Error) {
            // Check for common user-facing errors
            if (error.message.includes('API key not valid')) {
                throw new Error('API Key tidak valid. Mohon periksa kembali di halaman Pengaturan.');
            }
             if (error.message.includes('429')) {
                throw new Error('Terlalu banyak permintaan. Mohon coba lagi nanti.');
            }
        }
        throw new Error("Terjadi kesalahan saat menghubungi AI. Periksa koneksi dan API Key Anda.");
    }
};

export const generateInitialPlan = async (userInput: UserInput, apiKey: string): Promise<Pick<PerencanaanData, 'identitas' | 'identifikasi' | 'desainPembelajaran'>> => {
    const prompt = `
      Anda adalah seorang ahli perancangan kurikulum dan pedagogi di Indonesia.
      Berdasarkan informasi dari guru, buatkan bagian Identitas, Identifikasi, dan Desain Pembelajaran yang detail dan komprehensif.

      Informasi Kunci dari Guru:
      - Nama Sekolah: ${userInput.namaSekolah}
      - Nama Guru: ${userInput.namaGuru}
      - Kelas: ${userInput.kelas}
      - Semester: ${userInput.semester}
      - Mata Pelajaran: ${userInput.mapel}
      - Alokasi Waktu: ${userInput.alokasiWaktuJP} JP
      - Tujuan Pembelajaran (TP) yang ingin dicapai: "${userInput.tujuanPembelajaran}"
      - Model Pembelajaran Pilihan: ${userInput.modelPembelajaran || 'Belum ditentukan'}
      - Dimensi Profil Lulusan Pilihan: ${userInput.selectedDimensi.join(', ')}

      Instruksi Detail untuk Output JSON (WAJIB DIIKUTI):
      Hasilkan JSON dengan keys "identitas", "identifikasi", dan "desainPembelajaran".
      
      1. identitas: Isi berdasarkan data guru.
         - namaSekolah: (sesuai input)
         - namaGuru: (sesuai input)
         - mataPelajaran: (sesuai input)
         - kelasSemester: Gabungkan kelas dan semester (contoh: "${userInput.kelas} / ${userInput.semester}")
         - alokasiWaktu: (sesuai input)

      2. identifikasi: Lakukan analisis mendalam berdasarkan informasi kunci.
         - analisisKesiapanMurid: **ANALISIS DAN JABARKAN** kemungkinan kesiapan murid (pengetahuan awal, minat, gaya belajar) untuk mencapai TP di atas.
         - materiPelajaran: **ANALISIS DAN JABARKAN** materi pelajaran esensial yang perlu diajarkan untuk mencapai TP tersebut.
         - dimensiProfilLulusan: Cukup salin dari input guru.

      3. desainPembelajaran: Rancang desain yang efektif untuk mencapai TP.
         - lintasDisiplinIlmu: **ANALISIS DAN SEBUTKAN** minimal satu mata pelajaran lain yang dapat dihubungkan dengan TP ini.
         - tujuanPembelajaran: Salin TP persis seperti input guru.
         - topikPembelajaran: **TENTUKAN DAN JABARKAN** topik pembelajaran yang spesifik dan menarik berdasarkan TP.
         - praktikPedagogis: **PILIH DAN JELASKAN** model/strategi/metode pembelajaran yang paling efektif (jika guru tidak memilih, pilihkan yang terbaik).
         - kemitraanPembelajaran: **SARANKAN** satu kegiatan kemitraan (dengan orang tua, guru lain, dll) yang relevan.
         - lingkunganPembelajaran: **DESKRIPSIKAN** lingkungan belajar (fisik/virtual) yang mendukung.
         - pemanfaatanDigital: **SARANKAN** satu alat/platform digital yang bisa digunakan.

      Pastikan semua string dalam JSON valid dan karakter kutip ganda (") di-escape dengan benar (\\"). Jangan gunakan markdown.
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            identitas: {
                type: Type.OBJECT, properties: {
                    namaSekolah: { type: Type.STRING },
                    namaGuru: { type: Type.STRING },
                    mataPelajaran: { type: Type.STRING },
                    kelasSemester: { type: Type.STRING },
                    alokasiWaktu: { type: Type.STRING }
                }
            },
            identifikasi: {
                type: Type.OBJECT, properties: {
                    analisisKesiapanMurid: { type: Type.STRING },
                    materiPelajaran: { type: Type.STRING },
                    dimensiProfilLulusan: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            },
            desainPembelajaran: {
                type: Type.OBJECT, properties: {
                    lintasDisiplinIlmu: { type: Type.STRING },
                    tujuanPembelajaran: { type: Type.STRING },
                    topikPembelajaran: { type: Type.STRING },
                    praktikPedagogis: { type: Type.STRING },
                    kemitraanPembelajaran: { type: Type.STRING },
                    lingkunganPembelajaran: { type: Type.STRING },
                    pemanfaatanDigital: { type: Type.STRING }
                }
            }
        }
    };

    return callApi(prompt, schema, apiKey);
};

export const generateLearningExperience = async (identifikasi: Identifikasi, desain: DesainPembelajaran, apiKey: string): Promise<{ pengalamanBelajar: PengalamanBelajar }> => {
    const prompt = `
      Berdasarkan data berikut, buatkan bagian "Pengalaman Belajar" (langkah-langkah pembelajaran) yang detail dan terstruktur.
      Data Konteks:
      - Identifikasi: ${JSON.stringify(identifikasi)}
      - Desain Pembelajaran: ${JSON.stringify(desain)}

      Instruksi Output (JSON):
      Hasilkan JSON dengan key "pengalamanBelajar".
      - "pengalamanBelajar" harus berupa OBJECT dengan keys: 'awal', 'inti_memahami', 'inti_mengaplikasi', 'inti_merefleksi', 'penutup'.
      - Setiap key berisi OBJECT dengan properti 'langkah' dan 'prinsip'.
      - 'prinsip': (string, contoh: "berkesadaran, bermakna").
      - 'langkah': **WAJIB** berupa string yang berisi daftar kegiatan. Setiap kegiatan **HARUS** diawali dengan tanda hubung (-) dan setiap kegiatan dipisahkan oleh karakter baris baru (\\n). Contoh: "- Kegiatan 1\\n- Kegiatan 2\\n- Kegiatan 3".
      - Pastikan ketiga prinsip (berkesadaran, bermakna, menggembirakan) terdistribusi dalam keseluruhan langkah.
      - Jangan gunakan markdown atau bold (**). Escape semua karakter kutip ganda (").
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            pengalamanBelajar: {
                type: Type.OBJECT, properties: {
                    awal: { type: Type.OBJECT, properties: { langkah: { type: Type.STRING }, prinsip: { type: Type.STRING } } },
                    inti_memahami: { type: Type.OBJECT, properties: { langkah: { type: Type.STRING }, prinsip: { type: Type.STRING } } },
                    inti_mengaplikasi: { type: Type.OBJECT, properties: { langkah: { type: Type.STRING }, prinsip: { type: Type.STRING } } },
                    inti_merefleksi: { type: Type.OBJECT, properties: { langkah: { type: Type.STRING }, prinsip: { type: Type.STRING } } },
                    penutup: { type: Type.OBJECT, properties: { langkah: { type: Type.STRING }, prinsip: { type: "STRING" } } }
                }
            }
        }
    };

    return callApi(prompt, schema, apiKey);
};

export const generateAssessmentAndMedia = async (desain: DesainPembelajaran, pengalaman: PengalamanBelajar, apiKey: string): Promise<{ asesmen: Asesmen; mediaSumberBelajar: string[] }> => {
    const prompt = `
      Berdasarkan data lengkap berikut, buatkan bagian "Asesmen Pembelajaran" (termasuk rubrik) dan "Media & Sumber Belajar".
      Data Konteks:
      - Tujuan Pembelajaran: "${desain.tujuanPembelajaran}"
      - Desain Pembelajaran: ${JSON.stringify(desain)}
      - Pengalaman Belajar: ${JSON.stringify(pengalaman)}

      Instruksi Output (JSON):
      Hasilkan JSON dengan keys "asesmen" dan "mediaSumberBelajar".
      1. asesmen: OBJECT dengan keys 'asesmenAwal', 'asesmenProses', 'asesmenAkhir', dan 'asesmenHasilPembelajaran'.
         - 'asesmenAwal', 'asesmenProses', 'asesmenAkhir': String penjelasan untuk setiap jenis asesmen.
         - 'asesmenHasilPembelajaran': OBJECT dengan 'deskripsi' (String) dan 'rubrik' (ARRAY of OBJECTs).
         - 'rubrik': Setiap OBJECT dalam array harus memiliki keys: "kriteria", "belumBerkembang", "mulaiBerkembang", "berkembangSesuaiHarapan", "berkembangSangatBaik".
         - **PENTING**: Kriteria dalam rubrik HARUS selaras langsung dengan Tujuan Pembelajaran yang diberikan. Buat 2-3 kriteria yang relevan.
      2. mediaSumberBelajar: ARRAY of strings.
      - Jangan gunakan markdown. Escape semua karakter kutip ganda (").
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            asesmen: {
                type: Type.OBJECT, properties: {
                    asesmenAwal: { type: Type.STRING },
                    asesmenProses: { type: Type.STRING },
                    asesmenAkhir: { type: Type.STRING },
                    asesmenHasilPembelajaran: {
                        type: Type.OBJECT, properties: {
                            deskripsi: { type: Type.STRING },
                            rubrik: {
                                type: Type.ARRAY, items: {
                                    type: Type.OBJECT, properties: {
                                        kriteria: { type: Type.STRING },
                                        belumBerkembang: { type: Type.STRING },
                                        mulaiBerkembang: { type: Type.STRING },
                                        berkembangSesuaiHarapan: { type: Type.STRING },
                                        berkembangSangatBaik: { type: Type.STRING }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            mediaSumberBelajar: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
    };

    return callApi(prompt, schema, apiKey);
};
