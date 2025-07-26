
export interface AuthUser {
  email: string;
}

export interface UserInput {
  namaSekolah: string;
  namaGuru: string;
  kelas: string;
  semester: string;
  mapel: string;
  alokasiWaktuJP: string;
  tujuanPembelajaran: string;
  modelPembelajaran: string;
  selectedDimensi: string[];
}

export interface Identitas {
  namaSekolah: string;
  namaGuru: string;
  mataPelajaran: string;
  kelasSemester: string;
  alokasiWaktu: string;
}

export interface Identifikasi {
  analisisKesiapanMurid: string;
  materiPelajaran: string;
  dimensiProfilLulusan: string[];
}

export interface DesainPembelajaran {
  lintasDisiplinIlmu: string;
  tujuanPembelajaran: string;
  topikPembelajaran: string;
  praktikPedagogis: string;
  kemitraanPembelajaran: string;
  lingkunganPembelajaran: string;
  pemanfaatanDigital: string;
}

export interface PengalamanBelajarItem {
  langkah: string;
  prinsip: string;
}

export interface PengalamanBelajar {
  awal: PengalamanBelajarItem;
  inti_memahami: PengalamanBelajarItem;
  inti_mengaplikasi: PengalamanBelajarItem;
  inti_merefleksi: PengalamanBelajarItem;
  penutup: PengalamanBelajarItem;
}

export interface RubrikItem {
  kriteria: string;
  belumBerkembang: string;
  mulaiBerkembang: string;
  berkembangSesuaiHarapan: string;
  berkembangSangatBaik: string;
}

export interface AsesmenHasilPembelajaran {
  deskripsi: string;
  rubrik: RubrikItem[];
}

export interface Asesmen {
  asesmenAwal: string;
  asesmenProses: string;
  asesmenAkhir: string;
  asesmenHasilPembelajaran: AsesmenHasilPembelajaran;
}

export interface PerencanaanData {
  identitas: Identitas;
  identifikasi: Identifikasi;
  desainPembelajaran: DesainPembelajaran;
  pengalamanBelajar: PengalamanBelajar;
  asesmen: Asesmen;
  mediaSumberBelajar: string[];
}
