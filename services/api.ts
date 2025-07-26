
// Alamat URL Web App dari Google Apps Script Anda
const BACKEND_API_URL = "https://script.google.com/macros/s/AKfycbxaqrGXoakdmz8WIL8zRiJxGY6HkXeL16NtKnZPARyvagZhdj2dfSObOQhU2vOnqOD7/exec";

/**
 * Fungsi untuk memanggil backend Google Apps Script.
 * @param route Nama rute/fungsi yang dituju di backend (misal: 'login', 'register').
 * @param payload Data yang ingin dikirim ke backend.
 * @returns Promise yang berisi respons dari backend.
 */
export const callBackend = async (route: string, payload: object): Promise<any> => {
  try {
    const response = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ route, ...payload }),
      // mode: 'no-cors' telah dihapus untuk memungkinkan pembacaan respons
    });

    // Sekarang kita bisa membaca respons dan menangani error HTTP
    if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.message || errorMessage;
        } catch (e) {
            // Abaikan jika body bukan JSON, gunakan pesan status default
        }
        throw new Error(errorMessage);
    }

    const result = await response.json();
    
    if (result.status === 'error') {
      throw new Error(result.message || 'Terjadi kesalahan pada server backend.');
    }

    return result;

  } catch (error) {
    console.error("Error calling backend:", error);
    if (error instanceof Error) {
        // Teruskan error yang sudah spesifik
        throw error;
    }
    throw new Error('Terjadi kesalahan yang tidak diketahui saat memanggil backend.');
  }
};
