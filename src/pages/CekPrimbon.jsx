import { useState, useEffect } from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import { format } from 'date-fns';
import axios from 'axios';

const CekPrimbon = () => {
  const [selected, setSelected] = useState('');
  const [showResultHoroskop, setShowResultHoroskop] = useState('');
  const [showResultArtiNama, setShowResultArtiNama] = useState('');
  const [showResultTafsirMimpi, setShowResultTafsirMimpi] = useState('');
  const [showResultJodoh, setShowResultJodoh] = useState({});
  const [showResultRamalanJodoh, setShowResultRamalanJodoh] = useState('');
  const [showResultTanggalJadi, setShowResultTanggalJadi] = useState('');
  const [showResultRamalanRejeki, setShowResultRamalanRejeki] = useState({});
  const [showResultKecocokanNama, setShowResultKecocokanNama] = useState('');
  const [showResultHariBaik, setShowResultHariBaik] = useState('');
  const [showResultHariLarangan, setShowResultHariLarangan] = useState('');
  const [loading, setLoading] = useState(false);
  const [dateErrorHoroskop, setDateHoroskopError] = useState('');
  const [dateTanggalJadiError, setDateTanggalJadiError] = useState('');
  const [dateRamalanJodohError, setDateRamalanJodohError] = useState('');
  const [dateRamalanRejekiError, setDateRamalanRejekiError] = useState('');
  const [dateHariBaikError, setDateHariBaikError] = useState('');
  const [dateHariLaranganError, setDateHariLaranganError] = useState('');
  const [nameArtiNamaError, setNameArtiNamaError] = useState('');
  const [textTafsirMimpiError, setTextTafsirMimpiError] = useState('');
  const [textJodohError, setTextJodohError] = useState('');
  const [textRamalanJodohError, setTextRamalanJodohError] = useState('');
  const [textAndDateKecocokanNama, setTextAndDateKecocokanNamaError] = useState('');
  const [valueDateHoroskop, setValueDateHoroskop] = useState({
    startDate: null,
    endDate: null
  });
  const [valueDateTanggalJadi, setValueDateTanggalJadi] = useState({
    startDate: null,
    endDate: null
  });
  const [valueDateRamalanJodoh1, setValueDateRamalanJodoh1] = useState({
    startDate: null,
    endDate: null
  });
    const [valueDateRamalanJodoh2, setValueDateRamalanJodoh2] = useState({
    startDate: null,
    endDate: null
  });
  const [valueDateRamalanRejeki, setValueDateRamalanRejeki] = useState({
    startDate: null,
    endDate: null
  });
  const [valueDateKecocokanNama, setValueDateKecocokanNama] = useState({
    startDate: null,
    endDate: null
  });
  const [valueDateHariBaik, setValueDateHariBaik] = useState({
    startDate: null,
    endDate: null
  });
  const [valueDateHariLarangan, setValueDateHariLarangan] = useState({
    startDate: null,
    endDate: null
  });
  const [displayValueArtiNama, setDisplayValueArtiNama] = useState('');
  const [displayValueTafsirMimpi, setDisplayValueTafsirMimpi] = useState('');
  const [displayValueJodoh1, setDisplayValueJodoh1] = useState('');
  const [displayValueJodoh2, setDisplayValueJodoh2] = useState('');
  const [displayValueRamalanJodoh1, setDisplayValueRamalanJodoh1] = useState('');
  const [displayValueRamalanJodoh2, setDisplayValueRamalanJodoh2] = useState('');
  const [displayValueKecocokanNama, setDisplayValueKecocokanNama] = useState('');

  // Handle Value Date Horoskop
  const handleValueDateHoroskopChange = (newValueDateHoroskop) => {
      setValueDateHoroskop(newValueDateHoroskop);
      setDateHoroskopError('');
  };

  // Handle Value Date Tanggal Jadian Pernikahan atau Pacaran
  const handleValueDateTanggalJadiChange = (newValueDateTanggalJadi) => {
      setValueDateTanggalJadi(newValueDateTanggalJadi);
      setDateTanggalJadiError('');
  };

  // Handle Value Date Jodoh
  const handleValueDateRamalanJodohChange1 = (newValueDateRamalanJodoh) => {
    setValueDateRamalanJodoh1(newValueDateRamalanJodoh);
    setDateRamalanJodohError('');
  };

    const handleValueDateRamalanJodohChange2 = (newValueDateRamalanJodoh) => {
    setValueDateRamalanJodoh2(newValueDateRamalanJodoh);
    setDateRamalanJodohError('');
  };

  // Handle Value Date Rejeki
  const handleValueDateRejekiChange = (newValueDateRejeki) => {
    setValueDateRamalanRejeki(newValueDateRejeki);
    setDateRamalanRejekiError('');
  };

  // Handle Value Date Kecocokan Nama
  const handleValueDateKecocokanNamaChange = (newValueDateKecocokanNama) => {
    setValueDateKecocokanNama(newValueDateKecocokanNama);
    setTextAndDateKecocokanNamaError('');
  };

  // Handle Value Date Hari Baik
  const handleValueDateHariBaikChange = (newValueDateHariBaik) => {
    setValueDateHariBaik(newValueDateHariBaik);
    setDateHariBaikError('');
  };

  // Handle Value Date Hari Larangan
  const handleValueDateHariLaranganChange = (newValueDateHariLarangan) => {
    setValueDateHariLarangan(newValueDateHariLarangan);
    setDateHariLaranganError('');
  };

  // Handle Submit Horoskop
  const handleSubmitHoroskop = async(e) => {
    e.preventDefault();
    if (!valueDateHoroskop || valueDateHoroskop.startDate === null) {
      setDateHoroskopError('Tanggal lahir kamu harus diisi');
      return;
    }

    try {
      setLoading(true);
      const formattedDate = format(new Date(valueDateHoroskop.startDate), 'dd-MM-yyyy');

      const response = await axios.get(`https://primbon-api.glitch.me/api/horoskop/${formattedDate}`);

      setShowResultHoroskop(response.data.horoskop);

      setLoading(false);
    } catch (error) {
      setDateHoroskopError('Terjadi kesalahan saat memproses permintaan kamu');
      setLoading(false);
    }
  }

  // Handle Submit Arti Nama
  const handleSubmitArtiNama = async(e) => {
    e.preventDefault();
    if (!displayValueArtiNama.trim()) {
      setNameArtiNamaError('Nama jangan kosong!');
    } else if (displayValueArtiNama.trim().length < 3) {
      setNameArtiNamaError('Nama minimal berisi 3 huruf');
    } else if (/\d/.test(displayValueArtiNama)) {
      setNameArtiNamaError('Nama jangan pakai angka atau karakter lain');
    } else {
      try {
        setLoading(true);
        const response = await axios.get(`https://primbon-api.glitch.me/api/arti-nama/${displayValueArtiNama}`);
        setShowResultArtiNama(response.data.artiNama);
  
        setLoading(false);
      } catch (error) {
        setNameArtiNamaError('Terjadi kesalahan saat memproses permintaan kamu');
        setLoading(false);
      }
    }
  }

  // Handle Submit Tafsir Mimpi
  const handleSubmitTafsirMimpi = async(e) => {
    e.preventDefault();
    if (!displayValueTafsirMimpi.trim()) {
      setTextTafsirMimpiError('Nama jangan kosong!');
    } else if (displayValueTafsirMimpi.trim().length < 3) {
      setTextTafsirMimpiError('Nama minimal berisi 3 huruf');
    } else if (/\d/.test(displayValueTafsirMimpi)) {
      setTextTafsirMimpiError('Nama jangan pakai angka atau karakter lain');
    } else {
      try {
        setLoading(true);
        const response = await axios.get(`https://primbon-api.glitch.me/api/tafsir-mimpi/${displayValueTafsirMimpi}`);
        setShowResultTafsirMimpi(response.data.tafsirMimpi);
  
        setLoading(false);
      } catch (error) {
        setTextTafsirMimpiError('Terjadi kesalahan saat memproses permintaan kamu');
        setLoading(false);
      }
    }
  }

  // Handle Submit Jodoh
  const handleSubmitJodoh = async (e) => {
    e.preventDefault();
    if (!displayValueJodoh1.trim() || !displayValueJodoh2.trim()) {
        setTextJodohError('Nama jangan kosong!');
    } else if (displayValueJodoh1.trim().length < 3 || displayValueJodoh2.trim().length < 3) {
        setTextJodohError('Nama minimal berisi 3 huruf');
    } else if (/\d/.test(displayValueJodoh1) || /\d/.test(displayValueJodoh2)) {
        setTextJodohError('Nama jangan pakai angka atau karakter lain');
    } else {
        try {
            setLoading(true);
            const response = await axios.get(`https://primbon-api.glitch.me/api/jodoh/${displayValueJodoh1}/${displayValueJodoh2}`);
            setShowResultJodoh(response.data.jodoh);

            setLoading(false);
        } catch (error) {
            setTextJodohError('Terjadi kesalahan saat memproses permintaan kamu');
            setLoading(false);
        }
    }
}

  // Handle Submit Tanggal Jadi
  const handleSubmitTanggalJadi = async(e) => {
    e.preventDefault();
    if (!valueDateTanggalJadi || valueDateTanggalJadi.startDate === null) {
      setDateTanggalJadiError('Tanggal jadian atau pernikahaan kamu harus diisi');
      return;
    }

    try {
      setLoading(true);
      const formattedDate = format(new Date(valueDateTanggalJadi.startDate), 'dd-MM-yyyy');

      const response = await axios.get(`https://primbon-api.glitch.me/api/tanggal-jadi/${formattedDate}`);

      setShowResultTanggalJadi(response.data.tanggalJadi);

      setLoading(false);
    } catch (error) {
      setDateTanggalJadiError('Terjadi kesalahan saat memproses permintaan kamu');
      setLoading(false);
    }
  }

  // Handle Submit Ramalan Jodoh
    const handleSubmitRamalanJodoh = async(e) => {
    e.preventDefault();
    if (!displayValueRamalanJodoh1.trim() && !displayValueRamalanJodoh2.trim()) {
      setTextRamalanJodohError('Nama kamu dan pasanganmu jangan kosong!');
    } else if (displayValueRamalanJodoh1.trim().length < 3 || displayValueRamalanJodoh2.trim().length < 3) {
      setTextRamalanJodohError('Nama minimal berisi 3 huruf');
    } else if (/\d/.test(displayValueRamalanJodoh1) || /\d/.test(displayValueRamalanJodoh2)) {
      setTextRamalanJodohError('Nama jangan pakai angka atau karakter lain');
    } else if(valueDateRamalanJodoh1.startDate === null && valueDateRamalanJodoh2.startDate === null) {
      setDateRamalanJodohError('Tanggal lahir kamu dan pasanganmu harus di isi!')
    }

    try {
      setLoading(true);
      const formattedDate = format(new Date(valueDateRamalanJodoh1.startDate), 'dd-MM-yyyy');
      const formattedDate2 = format(new Date(valueDateRamalanJodoh2.startDate), 'dd-MM-yyyy');

      const response = await axios.get(`https://primbon-api.glitch.me/api/ramalan-jodoh/${displayValueRamalanJodoh1}/${formattedDate}/${displayValueRamalanJodoh2}/${formattedDate2}`);

      setShowResultRamalanJodoh(response.data.ramalanJodoh.replace(/\n/g, '<br/>'));

      setLoading(false);
    } catch (error) {
      setDateTanggalJadiError('Terjadi kesalahan saat memproses permintaan kamu');
      setLoading(false);
    }
  }

  // Handle Submit Ramalan Rejeki
  const handleSubmitRamalanRejeki = async(e) => {
    e.preventDefault();
    if (!valueDateRamalanRejeki || valueDateRamalanRejeki.startDate === null) {
      setDateRamalanRejekiError('Tanggal lahir kamu harus diisi');
      return;
    }

    try {
      setLoading(true);
      const formattedDate = format(new Date(valueDateRamalanRejeki.startDate), 'dd-MM-yyyy');

      const response = await axios.get(`https://primbon-api.glitch.me/api/rejeki-weton/${formattedDate}`);

      setShowResultRamalanRejeki(response.data.rejekiWeton);

      setLoading(false);
    } catch (error) {
      setDateRamalanRejekiError('Terjadi kesalahan saat memproses permintaan kamu');
      setLoading(false);
    }
  }

  // Handle Submit Kecocokan Nama
  const handleSubmitKecocokanNama = async(e) => {
    e.preventDefault();
    if(!displayValueKecocokanNama || displayValueKecocokanNama === null) {
      setTextAndDateKecocokanNamaError('Nama kamu harus diisi!');
      return;
    } else if (!valueDateKecocokanNama || valueDateKecocokanNama.startDate === null) {
      setTextAndDateKecocokanNamaError('Tanggal lahir kamu harus diisi');
      return;
    }

    try {
      setLoading(true);
      const formattedDate = format(new Date(valueDateKecocokanNama.startDate), 'dd-MM-yyyy');

      const response = await axios.get(`https://primbon-api.glitch.me/api/kecocokan-nama/${displayValueKecocokanNama}/${formattedDate}`);

      let formattedResult = response.data.kecocokanNama
        .replace(/\n/g, '<br/>')
        .replace(/Tanggal Lahir: (.*?)<br\/>/g, '<strong class="uppercase">Tanggal Lahir: $1</strong><br/>')
        .replace(/Nama: (.*?)<br\/>/g, '<strong class="uppercase">Nama: $1</strong><br/>')
        .replace(/PERSENTASE KECOCOKAN/g, '<strong>PERSENTASE KECOCOKAN</strong>')
        .replace(/RATA-RATA\*/g, '<strong>RATA-RATA:</strong>');

        const rataRataMatch = formattedResult.match(/<strong>RATA-RATA\:<\/strong>\s*([\d.]+)%/);
        if (rataRataMatch) {
          const percentage = parseFloat(rataRataMatch[1].trim());
          let colorClass = '';
          if (percentage >= 60) {
            colorClass = 'text-green-500 font-bold';
          } else if (percentage >= 40) {
            colorClass = 'text-yellow-500 font-bold';
          } else {
            colorClass = 'text-red-500 font-bold';
          }
          formattedResult = formattedResult.replace(rataRataMatch[0], `<strong>RATA-RATA:</strong> <span class="${colorClass}">${percentage}%</span>`);
        }
    
        setShowResultKecocokanNama(formattedResult);
      setLoading(false);
    } catch (error) {
      setTextAndDateKecocokanNamaError('Terjadi kesalahan saat memproses permintaan kamu');
      setLoading(false);
    }
  }

    // Handle Submit Hari Baik
    const handleSubmitHariBaik = async(e) => {
      e.preventDefault();
      if (!valueDateHariBaik || valueDateHariBaik.startDate === null) {
        setDateHariBaikError('Tanggal Waktu harinya harus diisi');
        return;
      }
  
      try {
        setLoading(true);
        const formattedDate = format(new Date(valueDateHariBaik.startDate), 'dd-MM-yyyy');
  
        const response = await axios.get(`https://primbon-api.glitch.me/api/hari-baik/${formattedDate}`);
  
        setShowResultHariBaik(response.data.hariBaik);
  
        setLoading(false);
      } catch (error) {
        setDateHariBaikError('Terjadi kesalahan saat memproses permintaan kamu');
        setLoading(false);
      }
    }

    // Handle Submit Hari Larangan
    const handleSubmitHariLarangan = async(e) => {
      e.preventDefault();
      if (!valueDateHariLarangan || valueDateHariLarangan.startDate === null) {
        setDateHariLaranganError('Tanggal Lahir Kamu harus diisi');
        return;
      }
  
      try {
        setLoading(true);
        const formattedDate = format(new Date(valueDateHariLarangan.startDate), 'dd-MM-yyyy');
  
        const response = await axios.get(`https://primbon-api.glitch.me/api/hari-larangan/${formattedDate}`);
  
        setShowResultHariLarangan(response.data.hariLarangan);
  
        setLoading(false);
      } catch (error) {
        setDateHariLaranganError('Terjadi kesalahan saat memproses permintaan kamu');
        setLoading(false);
      }
    }

  return (
    <main className='container flex flex-col justify-center items-center'>
      <div className='container flex flex-col justify-center items-center bg-white p-5 rounded-md max-w-md mx-auto mb-5'>
        <div className="flex items-center">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
            </svg>
          </div>
          <h2 className='ms-3 text-md font-bold'>DISCLAIMER</h2>
        </div>
        <span className='ms-3 mt-2 text-sm font-normal'>
          Cek Primbon ini untuk hiburan saja. Ramalannya bukan jaminan! INGAT!!! Ramalan ini bukan prediksi pasti, hanya sebagai tradisi dari warisan budaya leluhur Jawa. Gunakan dengan bijak!
        </span>
      </div>

      <div className='container flex flex-col justify-center items-center bg-white p-5 gap-2 py-3 rounded-md max-w-md mx-auto'>
        <h1 className='text-4xl text-blue-500 font-bold mt-2'>CEK PRIMBON KAMU</h1>
        <form className="flex flex-col gap-4 py-4">
          <h1 className='text-2xl font-medium font-semibold text-slate-700'>Pilih apa yang ingin diterawang</h1>
          <select 
            id="primbonOptions" 
            value={selected} 
            onChange={(e) => setSelected(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih</option>
            <option value="Horoskop">Horoskop</option>
            <option value="Arti Nama">Arti Nama</option>
            <option value="Tafsir Mimpi">Tafsir Mimpi</option>
            <option value="Jodoh">Jodoh</option>
            <option value="Tanggal Jadian atau Pernikahan">Tanggal Jadian atau Pernikahan</option>
            <option value="Ramalan Jodoh">Ramalan Jodoh</option>
            <option value="Ramalan Rezeki">Ramalan Rezeki</option>
            <option value="Kecocokan Nama">Kecocokan Nama</option>
            <option value="Hari Baik">Hari Baik</option>
            <option value="Hari Larangan">Hari Larangan</option>
          </select>
        </form>
        
        {selected === 'Horoskop' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Kenali Karakter Melalui Horoskop</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitHoroskop}>
                <Datepicker 
                  className={`py-2 px-4 text-md rounded-md border ${dateErrorHoroskop ? 'border-red-500' : 'border-gray-500'} w-full pr-12 pl-10`}
                  useRange={false}
                  asSingle={true} 
                  value={valueDateHoroskop} 
                  onChange={handleValueDateHoroskopChange}
                  placeholder='Masukkan Tanggal Lahir Kamu >>' 
                /> 
                {dateErrorHoroskop && <p className="text-red-600 text-md">{dateErrorHoroskop}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Terawang'
                  )}
                </button>
              </form>
              {!loading && showResultHoroskop && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                  <p className='text-lg text-gray-700'>{showResultHoroskop}</p>
              </div>
              )}
            </div>
          </div>
        )}

          {selected === 'Arti Nama' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Ketahui Rahasia di Balik Namamu</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitArtiNama}>
                <input 
                  type='text' 
                  className={`py-2 px-4 text-md rounded-md border ${nameArtiNamaError ? 'border-red500' : 'border-gray500'}`} 
                  value={displayValueArtiNama}
                  onChange={(e) => setDisplayValueArtiNama(e.target.value)}
                  placeholder='Masukkan Nama Kamu'
                />
                {nameArtiNamaError && <p className="text-red-600 text-md">{nameArtiNamaError}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Ketahui'
                  )}
                </button>
              </form>
              {!loading && showResultArtiNama && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                  <p className='text-lg text-gray-700'>{showResultArtiNama}</p>
              </div>
              )}
            </div>
          </div>
          )}

          {selected === 'Tafsir Mimpi' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Kenali Pesan Mimpi Kamu</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitTafsirMimpi}>
                <input 
                  type='text' 
                  className={`py-2 px-4 text-md rounded-md border ${textTafsirMimpiError ? 'border-red500' : 'border-gray500'}`} 
                  value={displayValueTafsirMimpi}
                  onChange={(e) => setDisplayValueTafsirMimpi(e.target.value)}
                  placeholder='Masukkan Kata Kunci Mimpi Kamu'
                />
                {textTafsirMimpiError && <p className="text-red-600 text-md">{textTafsirMimpiError}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Ketahui'
                  )}
                </button>
              </form>
              {!loading && showResultTafsirMimpi && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                  <p className='text-lg text-gray-700'>{showResultTafsirMimpi}</p>
              </div>
              )}
            </div>
          </div>
          )}

          {selected === 'Jodoh' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Ketahui Kecocokan Kamu dan Pasanganmu</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitJodoh}>
                <input 
                  type='text' 
                  className={`py-2 px-4 text-md rounded-md border ${textJodohError ? 'border-red500' : 'border-gray500'}`} 
                  value={displayValueJodoh1}
                  onChange={(e) => setDisplayValueJodoh1(e.target.value)}
                  placeholder='Masukkan Nama Kamu'
                />
                <input 
                  type='text' 
                  className={`py-2 px-4 text-md rounded-md border ${textJodohError ? 'border-red500' : 'border-gray500'}`} 
                  value={displayValueJodoh2}
                  onChange={(e) => setDisplayValueJodoh2(e.target.value)}
                  placeholder='Masukkan Pasangan Kamu'
                />
                {textJodohError && <p className="text-red-600 text-md">{textJodohError}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Ramalkan'
                  )}
                </button>
              </form>
              {!loading && showResultJodoh.namaAnda && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                <div className='flex flex-col items-center'>
                  <img src={showResultJodoh.love} className='w-25 h-25 rounded-md my-3' alt="Gambar Presentase Love" />
                    <p className='text-lg text-gray-700'>
                        <span className='font-bold'>Hal Positif pada kalian berdua adalah:</span><br />
                        {showResultJodoh.positif}
                    </p>
                    <p className='text-lg text-gray-700'>
                      <span className='font-bold'>Hal Negatif pada kalian berdua adalah:</span><br />
                        {showResultJodoh.negatif}
                    </p>
                    <p className='text-lg text-gray-700'>
                      <span className='font-bold'>Penjelasan:</span><br />
                        {showResultJodoh.penjelasan}
                    </p>
                </div>
              </div>
              )}
            </div>
          </div>
          )}

          {selected === 'Tanggal Jadian atau Pernikahan' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Ketahui Tanggal Spesialmu</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitTanggalJadi}>
                <Datepicker 
                  className={`py-2 px-4 text-md rounded-md border ${dateTanggalJadiError ? 'border-red-500' : 'border-gray-500'} w-full pr-12 pl-10`}
                  useRange={false}
                  asSingle={true} 
                  value={valueDateTanggalJadi} 
                  onChange={handleValueDateTanggalJadiChange}
                  placeholder='Masukkan Tanggal Jadian Kamu >>' 
                /> 
                {dateTanggalJadiError && <p className="text-red-600 text-md">{dateTanggalJadiError}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Ramalkan'
                  )}
                </button>
              </form>
              {!loading && showResultTanggalJadi && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                  <p className='text-lg text-gray-700'>{showResultTanggalJadi}</p>
              </div>
              )}
            </div>
          </div>
          )}

          {selected === 'Ramalan Jodoh' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Ramalan Jodoh untukmu dan Pasanganmu</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitRamalanJodoh}>
                <input 
                  type='text' 
                  className={`py-2 px-4 text-md rounded-md border ${textRamalanJodohError ? 'border-red500' : 'border-gray500'}`} 
                  value={displayValueRamalanJodoh1}
                  onChange={(e) => setDisplayValueRamalanJodoh1(e.target.value)}
                  placeholder='Masukkan Nama Kamu'
                />
                <Datepicker 
                  className={`py-2 px-4 text-md rounded-md border ${dateRamalanJodohError ? 'border-red-500' : 'border-gray-500'} w-full pr-12 pl-10`}
                  useRange={false}
                  asSingle={true} 
                  value={valueDateRamalanJodoh1} 
                  onChange={handleValueDateRamalanJodohChange1}
                  placeholder='Masukkan Tanggal Lahir Kamu >>' 
                /> 
                <input 
                  type='text' 
                  className={`py-2 px-4 text-md rounded-md border ${textRamalanJodohError ? 'border-red500' : 'border-gray500'}`} 
                  value={displayValueRamalanJodoh2}
                  onChange={(e) => setDisplayValueRamalanJodoh2(e.target.value)}
                  placeholder='Masukkan Nama Pasangan Kamu'
                />
                <Datepicker 
                  className={`py-2 px-4 text-md rounded-md border ${dateRamalanJodohError ? 'border-red-500' : 'border-gray-500'} w-full pr-12 pl-10`}
                  useRange={false}
                  asSingle={true} 
                  value={valueDateRamalanJodoh2} 
                  onChange={handleValueDateRamalanJodohChange2}
                  placeholder='Masukkan Tanggal Lahir Pasanganmu >>' 
                /> 
                {textRamalanJodohError || dateRamalanJodohError && <p className="text-red-600 text-md">{textRamalanJodohError || dateRamalanJodohError}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Ramalkan'
                  )}
                </button>
              </form>
              {!loading && showResultRamalanJodoh && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                <div className='flex flex-col items-center'>
                    <p className='text-lg text-gray-700' dangerouslySetInnerHTML={{ __html: showResultRamalanJodoh }}/>
                </div>
              </div>
              )}
            </div>
          </div>
          )}

          {selected === 'Ramalan Rezeki' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Ketahui Keuangan Kamu</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitRamalanRejeki}>
                <Datepicker 
                  className={`py-2 px-4 text-md rounded-md border ${dateRamalanRejekiError ? 'border-red-500' : 'border-gray-500'} w-full pr-12 pl-10`}
                  useRange={false}
                  asSingle={true} 
                  value={valueDateRamalanRejeki} 
                  onChange={handleValueDateRejekiChange}
                  placeholder='Masukkan Tanggal Lahir Kamu >>' 
                /> 
                {dateRamalanRejekiError && <p className="text-red-600 text-md">{dateRamalanRejekiError}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Ramalkan'
                  )}
                </button>
              </form>
              {!loading && showResultRamalanRejeki.penjelasan && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                  <p className='text-lg text-gray-700'>{showResultRamalanRejeki.penjelasan}</p>
                  <img src={showResultRamalanRejeki.statistik} className='w-25 h-25 rounded-md my-3' alt="Gambar Statistik Rezeki" />
              </div>
              )}
            </div>
          </div>
          )}

          {selected === 'Kecocokan Nama' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Temukan Kecocokan Namamu</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitKecocokanNama}>
                <input 
                  type='text' 
                  className={`py-2 px-4 text-md rounded-md border ${textAndDateKecocokanNama ? 'border-red500' : 'border-black-500'}`} 
                  value={displayValueKecocokanNama}
                  onChange={(e) => setDisplayValueKecocokanNama(e.target.value)}
                  placeholder='Masukkan Nama Kamu'
                />
                <Datepicker 
                  className={`py-2 px-4 text-md rounded-md border ${textAndDateKecocokanNama ? 'border-red-500' : 'border-black-700'} w-full pr-12 pl-10`}
                  useRange={false}
                  asSingle={true} 
                  value={valueDateKecocokanNama} 
                  onChange={handleValueDateKecocokanNamaChange}
                  placeholder='Masukkan Tanggal Lahir Kamu >>' 
                /> 
                {textAndDateKecocokanNama && <p className="text-red-600 text-md">{textAndDateKecocokanNama}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Terawang'
                  )}
                </button>
              </form>
              {!loading && showResultKecocokanNama && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                  <p className='text-lg text-gray-700' dangerouslySetInnerHTML={{ __html: showResultKecocokanNama }}/>
              </div>
              )}
            </div>
          </div>
          )}

          {selected === 'Hari Baik' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Cari tahu hari baik</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitHariBaik}>
                <Datepicker 
                  className={`py-2 px-4 text-md rounded-md border ${dateHariBaikError ? 'border-red-500' : 'border-gray-500'} w-full pr-12 pl-10`}
                  useRange={false}
                  asSingle={true} 
                  value={valueDateHariBaik} 
                  onChange={handleValueDateHariBaikChange}
                  placeholder='Masukkan Waktu harinya >>' 
                /> 
                {dateHariBaikError && <p className="text-red-600 text-md">{dateHariBaikError}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Temukan'
                  )}
                </button>
              </form>
              {!loading && showResultHariBaik && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                  <p className='text-lg text-gray-700'>{showResultHariBaik}</p>
              </div>
              )}
            </div>
          </div>
          )}

          {selected === 'Hari Larangan' && (
          <div className="flex flex-col items-center w-full">
            <h1 className='text-2xl font-medium font-semibold text-slate-700'>Cari tahu Hari Laranganmu</h1>
            <div className="flex flex-col gap-4 py-4 w-full">
              <form className='flex flex-col gap-4' onSubmit={handleSubmitHariLarangan}>
                <Datepicker 
                  className={`py-2 px-4 text-md rounded-md border ${dateHariLaranganError ? 'border-red-500' : 'border-gray-500'} w-full pr-12 pl-10`}
                  useRange={false}
                  asSingle={true} 
                  value={valueDateHariLarangan} 
                  onChange={handleValueDateHariLaranganChange}
                  placeholder='Masukkan Tanggal Lahir Kamu >>' 
                /> 
                {dateHariLaranganError && <p className="text-red-600 text-md">{dateHariLaranganError}</p>}
                <button
                  type='submit'
                  className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full'
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <svg className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full' viewBox='0 0 24 24'></svg>
                    </div>
                  ) : (
                    'Temukan'
                  )}
                </button>
              </form>
              {!loading && showResultHariLarangan && (
              <div className="bg-gray-100 p-5 rounded-md mt-2 text-center">
                  <p className='text-lg text-gray-700'>{showResultHariLarangan}</p>
              </div>
              )}
            </div>
          </div>
          )}

          <a className='bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-4 font-bold text-white rounded-md w-full mb-1' href='/cekkhodam'>Cek Khodam Kamu</a>
      </div>

      <footer className="bg-white rounded-lg shadow m-4">
        <span className="block text-sm mt-2 mb-2 mr-3 ml-3 text-gray-500 sm:text-center dark:text-gray-500">Dibuat dengan ❤️ oleh <a href="https://github.com/ahmadirfanmarufm" className="hover:underline text-blue-500 font-bold">Ahmad Irfan Ma'ruf Maulana</a></span>
      </footer>
    </main>
  );
};

export default CekPrimbon;
