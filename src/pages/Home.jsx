import { useState } from 'react';
import logo from '../../Logo-Astro-Nusantara.png';

const Home = () => {
    return (    
        <main className='container flex flex-col justify-center items-center '>
            <div className='bg-white p-5 rounded-md max-w-md mx-auto'>
                <img src={logo} className='w-25 h-25 rounded-md mb-3' alt="Logo Astro Nusantara"/>
                <p className='text-black mb-4'>Cari tahu penasaran dengan khodam, primbon, dan ramalan jawa di satu web</p>
                <h1 className='text-black font-bold mb-4 text-xl'>PILIH APA YANG INGIN KAMU CEK</h1>
                <div className='justify-center items-center flex flex-row gap-4 mb-3'>
                    <button type='button' className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md'>
                        <a href='/cekkhodam'>CEK KHODAM</a>
                    </button>
                    <button type='button' className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md'>
                        <a href='/cekprimbon'>CEK PRIMBON</a>
                    </button>
                </div>
            </div>

            <footer class="bg-white rounded-lg shadow m-4">
                <span class="block text-sm mt-2 mb-2 mr-3 ml-3 text-gray-500 sm:text-center dark:text-gray-400">Dibuat dengan ❤️ oleh <a href="https://github.com/ahmadirfanmarufm" class="hover:underline text-blue-500 font-bold">Ahmad Irfan Ma'ruf Maulana</a></span>
            </footer>
        </main>
    );
}

export default Home;
