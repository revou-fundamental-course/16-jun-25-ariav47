// Menunggu hingga seluruh konten halaman (DOM) selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- Pemilihan Elemen DOM ---
    // Tab buttons
    const tabLinks = document.querySelectorAll('.tab-link');

    // Konten kalkulator
    const calculatorContents = document.querySelectorAll('.calculator-content');
    
    // Form untuk Luas dan Keliling
    const luasForm = document.getElementById('luas-form');
    const kelilingForm = document.getElementById('keliling-form');
    
    // Area untuk menampilkan hasil
    const resultArea = document.getElementById('result-area');
    const resultDisplay = document.getElementById('result-display');
    
    // Input fields untuk Luas
    const alasInput = document.getElementById('alas');
    const tinggiInput = document.getElementById('tinggi');
    
    // Input fields untuk Keliling
    const sisi1Input = document.getElementById('sisi1');
    const sisi2Input = document.getElementById('sisi2');
    const sisi3Input = document.getElementById('sisi3');
    
    
    // --- Logika untuk Navigasi Tab ---
    // Fungsi untuk beralih antara kalkulator Luas dan Keliling
    window.openCalc = (calcName) => {
        // Sembunyikan semua konten kalkulator dan hapus kelas 'active' dari tab
        calculatorContents.forEach(content => content.classList.remove('active'));
        tabLinks.forEach(tab => tab.classList.remove('active'));

        // Tampilkan konten yang dipilih dan tandai tab sebagai aktif
        document.getElementById(calcName).classList.add('active');
        document.querySelector(`.tab-link[onclick="openCalc('${calcName}')"]`).classList.add('active');
        
        // Sembunyikan hasil saat beralih tab
        hideResult();
    };


    // --- Logika Kalkulator Luas ---
    luasForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah form mengirim data (reload halaman)

        // Ambil nilai dari input, ubah ke tipe float (desimal)
        const alas = parseFloat(alasInput.value);
        const tinggi = parseFloat(tinggiInput.value);

        // Validasi: Cek apakah input adalah angka yang valid dan positif
        if (isNaN(alas) || isNaN(tinggi) || alas <= 0 || tinggi <= 0) {
            displayError("Harap masukkan nilai alas dan tinggi yang valid (angka positif).");
            return; // Hentikan eksekusi jika tidak valid
        }

        // Hitung luas
        const luas = 0.5 * alas * tinggi;
        
        // Buat teks hasil perhitungan
        const resultText = `L = 1/2 x a x t\nL = 1/2 x ${alas} x ${tinggi}\nL = ${luas}`;

        // Tampilkan hasil
        displayResult(resultText);
    });

    // Event listener untuk tombol reset pada form luas
    luasForm.addEventListener('reset', () => {
        hideResult();
    });


    // --- Logika Kalkulator Keliling ---
    kelilingForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah reload halaman

        // Ambil nilai dari setiap sisi
        const sisi1 = parseFloat(sisi1Input.value);
        const sisi2 = parseFloat(sisi2Input.value);
        const sisi3 = parseFloat(sisi3Input.value);

        // Validasi: Cek apakah semua input adalah angka positif
        if (isNaN(sisi1) || isNaN(sisi2) || isNaN(sisi3) || sisi1 <= 0 || sisi2 <= 0 || sisi3 <= 0) {
            displayError("Harap masukkan nilai yang valid untuk semua sisi (angka positif).");
            return;
        }

        // Hitung keliling
        const keliling = sisi1 + sisi2 + sisi3;
        
        // Buat teks hasil perhitungan
        const resultText = `K = S1 + S2 + S3\nK = ${sisi1} + ${sisi2} + ${sisi3}\nK = ${keliling}`;
        
        // Tampilkan hasil
        displayResult(resultText);
    });
    
    // Event listener untuk tombol reset pada form keliling
    kelilingForm.addEventListener('reset', () => {
        hideResult();
    });
    
    
    // --- Fungsi Bantuan untuk Menampilkan Hasil dan Error ---

    // Menampilkan hasil yang benar
    function displayResult(resultText) {
        resultDisplay.innerText = resultText;
        resultArea.style.display = 'block'; // Tampilkan area hasil
        resultArea.style.borderColor = '#007bff'; // Warna border biru untuk sukses
        resultArea.style.backgroundColor = '#e7f3ff'; // Warna latar biru muda
    }
    
    // Menampilkan pesan error
    function displayError(errorMessage) {
        resultDisplay.innerText = errorMessage;
        resultArea.style.display = 'block'; // Tampilkan area hasil
        resultArea.style.borderColor = '#dc3545'; // Warna border merah untuk error
        resultArea.style.backgroundColor = '#f8d7da'; // Warna latar merah muda
    }

    // Menyembunyikan area hasil
    function hideResult() {
        resultArea.style.display = 'none';
        resultDisplay.innerText = ''; // Kosongkan teks hasil
    }
});
