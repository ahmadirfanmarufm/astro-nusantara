import React, { useState } from 'react';

const CekPrimbon = () => {
  return(
    <main className='container flex flex-col min-h-[80vh] justify-center items-center'>
      <div className='bg-white p-5 rounded-md max-w-md mx-auto'>
          <h1 className='text-red-500 font-bold mb-4 text-xl'>COMING SOON</h1>
          <p className='flex flex-row text-gray-700 mb-4 text-md'>Halaman ini sedang dalam proses pembuatan, jadi mohon tunggu. Yang buat sendiri soalnya 😔</p>
          <div className='flex flex-row justify-center items-center gap-3 mb-3'>
              <a className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md' href='/'>HALAMAN UTAMA</a>
              <a className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md' href='/cekkhodam'>CEK KHODAM</a>
          </div>
      </div>

      <footer class="bg-white rounded-lg shadow m-4">
        <span class="block text-sm mt-2 mb-2 mr-3 ml-3 text-gray-500 sm:text-center dark:text-gray-400">Dibuat dengan ❤️ oleh <a href="https://github.com/ahmadirfanmarufm" class="hover:underline text-blue-500 font-bold">Ahmad Irfan Ma'ruf Maulana</a></span>
      </footer>
    </main>
  )
}

export default CekPrimbon;
