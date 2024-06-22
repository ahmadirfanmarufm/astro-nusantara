import React, { useState } from 'react';
import axios from 'axios';

// const CekPrimbon = () => {
//   const [tanggal, setTanggal] = useState('');
//   const [bulan, setBulan] = useState('');
//   const [tahun, setTahun] = useState('');
//   const [primbonResult, setPrimbonResult] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Mengirim data tanggal, bulan, tahun ke backend untuk scraping
//       const response = await axios.post('http://localhost:8888/api/primbon', {
//         tgl: tanggal,
//         bln: bulan,
//         thn: tahun
//       });
//       console.log(response)
//       setPrimbonResult(response.data.primbonResult);
//     } catch (error) {
//       console.error('Error fetching primbon:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Scrape Primbon</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Tanggal"
//           value={tanggal}
//           onChange={(e) => setTanggal(e.target.value)}
//         />
//         <select value={bulan} onChange={(e) => setBulan(e.target.value)}>
//           <option value="">Bulan</option>
//           <option value="1">Januari</option>
//           <option value="2">Februari</option>
//           <option value="3">Maret</option>
//           <option value="4">April</option>
//           <option value="5">Mei</option>
//           <option value="6">Juni</option>
//           <option value="7">Juli</option>
//           <option value="8">Agustus</option>
//           <option value="9">September</option>
//           <option value="10">Oktober</option>
//           <option value="11">November</option>
//           <option value="12">Desember</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Tahun"
//           value={tahun}
//           onChange={(e) => setTahun(e.target.value)}
//         />
//         <button type="submit">Cek Primbon</button>
//       </form>
//       {loading ? (
//         <p className='text-white'>Loading...</p>
//       ) : (
//         <div dangerouslySetInnerHTML={{ __html: primbonResult }}></div>
//       )}
//     </div>
//   );
// };

const CekPrimbon = () => {
  return(
    <main className='container flex flex-col min-h-[80vh] justify-center items-center'>
      <div className='bg-white p-5 rounded-md max-w-md mx-auto'>
          <h1 className='text-red-500 font-bold mb-4 text-xl'>COMING SOON</h1>
          <p className='flex flex-row text-gray-700 mb-4 text-md'>Halaman ini sedang dalam proses pembuatan, jadi mohon tunggu. Yang buat sendiri soalnya 😔</p>
          <div className='flex flex-row justify-center items-center gap-3 mb-3'>
              <button type='button' className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md'>
                  <a href='/'>HALAMAN UTAMA</a>
              </button>
              <button type='button' className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md'>
                  <a href='/cekkhodam'>CEK KHODAM</a>
              </button>
          </div>
      </div>

      <footer class="bg-white rounded-lg shadow m-4">
        <span class="block text-sm mt-2 mb-2 mr-3 ml-3 text-gray-500 sm:text-center dark:text-gray-400">Dibuat dengan ❤️ oleh <a href="https://github.com/ahmadirfanmarufm" class="hover:underline text-blue-500 font-bold">Ahmad Irfan Ma'ruf Maulana</a></span>
      </footer>
    </main>
  )
}

export default CekPrimbon;
