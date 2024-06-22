import { useState, useRef } from 'react';
import axios from 'axios';

const CekKhodam = () => {
    const [inputValueTemp, setInputValueTemp] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [khodamResult, setKhodamResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const previousName = useRef('');
    const previousKhodam = useRef('');
    const descriptionKhodam = useRef('');

    const khodamName = [
        "Kadal Sakti", "Mio Trondol", "Nyi Roro Kidol", "Naga Tunduk", "Nyi Blorong", "Harimau Joget", "Kuda Nyetrum", "Semut Genius", 
        "Babi Terbang", "Lele Loncat", "Kelelawar Terbang Malam", "Kambing Guling", "Kura-kura Kilat", "Katak Bernyanyi", "Cacing Super", 
        "Domba Bernyanyi", "Hiu Berdansa", "Rusa Lincah", "Serigala Kelaparan", "Ular Melilit", "Katak Melompat", "Elang Penjaga", 
        "Angsa Anggun", "Kucing Liar", "Tikus Jalanan", "Naga Tidur", "Lebah Berbisa", "Bebek Emas", "Tikus Hitam", "Burung Hantu", 
        "Kuda Emas", "Kuda Hitam", "Kucing Putih", "Elang Perkasa", "Harimau Perkasa", "Kuda Baja", "Buaya Laut", "Buaya Darat", 
        "Macan Ompong", "Harimau Ambisius", "Ular Bipolar", "Kuda Gaul", "Kucing Manja", "Gajah Pemberani", "Sedotan Ajaib", "Sendok Ajaib", 
        "Gorilla Cengeng", "Kelinci Pemalu", "Kuda Hyperaktif", "Burung Kepo", "Kura-kura Santai", "Elang Visioner", "Beruang Mager", 
        "Jerapah Pengintai", "Kucing Sok Pinter", "Ular Misterius", "Ikan Sok Suci", "Burung Penguasa", "Harimau Putih", "Banteng Merah", 
        "Macan Oranye", "Kucing Oranye", "Belut Elektrik", "Kijang Lompat", "Bunglon Kamuflase", "Kosong",
    ];

    const messageKhodamNull = [
        "Sepertinya khodamnya lagi jalan-jalan ke dimensi lain untuk mencari inspirasi baru. Kembali cek nanti ya!",
        "Khodamnya lagi ngecek ramalan bintang untuk dirinya sendiri. Setelah selesai, dia akan kembali untuk Anda.",
        "Khodamnya sedang update status di media sosial tentang pengalaman terbarunya. Tunggu sampai dia selesai posting.",
        "Sepertinya khodamnya lagi ngumpet main petak umpet. Kita harus menunggu sampai dia bosan bersembunyi.",
        "Khodamnya lagi ngopi sambil baca koran. Setelah selesai membaca berita terbaru, dia akan siap membantu Kamu.",
        "Khodamnya lagi merem sebentar",
        "Khodamnya lagi sibuk mengurus khodam-khodam lain."
    ];

    useEffect(() => {
        setInputValue(inputValueTemp);
    }, [inputValueTemp]);


    const handleSubmit = async () => {
        if (!inputValue.trim()) {
            setToastMessage('Nama jangan kosong!');
            setShowToast(true);
        } else if (inputValue.trim().length < 3) {
            setToastMessage('Nama minimal berisi 3 huruf');
            setShowToast(true);
        } else if (/\d/.test(inputValue)) {
            setToastMessage('Nama jangan pakai angka atau karakter lain');
            setShowToast(true); 
        } else {
            setLoading(true);
            let generateKhodam;
            if (inputValue === previousName.current) {
                generateKhodam = previousKhodam.current;
                descriptionKhodam.current = descriptionKhodam.current;
            } else {
                const randomKhodamIndex = Math.floor(Math.random() * khodamName.length);
                generateKhodam = khodamName[randomKhodamIndex];
                previousKhodam.current = generateKhodam;
                descriptionKhodam.current = ''; 
            }
            previousName.current = inputValue;

            const prompt = `Mohon jelaskan khodam ${generateKhodam} dalam Bahasa indonesia hanya 15 kata saja menggunakan lelucon dan berikan arti yang terlihat meyakinkan dengan mengaitkannya pada karakteristik hewan atau makhluk astral yang terkait dari nama ${inputValue}, contohnya jika khodamnya adalah Khodam kadal sakti maka contoh jawabanya kamu suka bersembunyi dengan cepat dan sangat lincah memikat hati wanita.`
            
            if(generateKhodam === "Kosong" && !descriptionKhodam.current) {
                const randomMessageIndex = Math.floor(Math.random() * messageKhodamNull.length);
                descriptionKhodam.current = messageKhodamNull[randomMessageIndex]
            }

            try {
                const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
                    messages: [{ role: "user", content: prompt }],
                    model: "mixtral-8x7b-32768",
                },{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer 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",
                    },
                });

                if (!descriptionKhodam.current) {
                    descriptionKhodam.current = response.data.choices[0].message.content.trim();
                }            
                setInputValueTemp(inputValueTemp);
                setKhodamResult(generateKhodam);
                setShowResult(true);
                setLoading(false);
            } catch(err) {
                setToastMessage('Terjadi kesalahan saat memproses permintaan kamu');
                setShowToast(true);
                setLoading(false);
            }
        }
    }

    return (
        <main className='container flex flex-col justify-center items-center'>
                {showToast && (
                    <div className='mb-3 flex flex-col justify-center items-center'>
                        <div 
                            id="toast-warning" 
                            className="flex items-center w-full max-w-xs p-3 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" 
                            role="alert"
                        >
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-700 dark:text-blue-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                            </svg>
                            <span className="sr-only">Warning icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{toastMessage}</div>
                        <button 
                            type="button" 
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                            data-dismiss-target="#toast-warning" 
                            aria-label="Close"
                            onClick={() => setShowToast(false)}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" stroke="currentColor" onClick={() => setShowToast(false)} style={{ cursor: 'pointer' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                )}
            <div className="container flex flex-col justify-center items-center bg-white p-5 rounded-md max-w-md mx-auto">
                <h1 className='text-4xl text-blue-500 font-bold'>CEK KHODAM</h1>
                <form className='flex flex-col gap-4 py-4' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <span className="text-xl font-medium font-semibold text-slate-700">Cek khodam yang ada di dalam diri kamu</span>
                    <input 
                        type='text' 
                        className='py-2 px-4 text-md rounded-md border border-gray-500' 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='Masukkan namamu'
                    />
                    <button type='button' className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md' onClick={handleSubmit}>
                        {loading ? (
                            <div className='flex flex-col justify-center items-center'>
                                <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                            </div>
                        ) : (
                            'Terawang Khodam Kamu'
                        )}
                    </button>
                    <button type='button' className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md'><a href='/cekprimbon'>Cek Primbon Kamu</a></button>
                </form>
                {!loading && showResult && (
                    <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                        <p className="font-bold text-lg text-xl">
                            Dalam diri <span className='text-lg text-blue-500'>{inputValue}</span>, bersemanyamlah Khodam:
                        </p>
                        <p className="text-lg text-blue-500 font-bold text-xl">{khodamResult}</p>
                        <p className='text-lg text-gray-700'>{descriptionKhodam.current}</p>
                    </div>
                )}
            </div>

            <footer class="bg-white rounded-lg shadow m-4">
                <span class="block text-sm mt-2 mb-2 mr-3 ml-3 text-gray-500 sm:text-center dark:text-gray-400">Dibuat dengan ❤️ oleh <a href="https://github.com/ahmadirfanmarufm" class="hover:underline text-blue-500 font-bold">Ahmad Irfan Ma'ruf Maulana</a></span>
            </footer>
        </main>
    )
}

export default CekKhodam;
