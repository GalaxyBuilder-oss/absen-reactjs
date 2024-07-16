const AboutPage = () => {
  return (
    <main className="w-[96vw] h-[76vh] mx-2 bg-green-600 px-4 border-green-600 transition-all">
      <div className="h-[76vh] rounded-lg bg-white relative py-2">
        <div className="h-[74vh] bg-gray-50 px-8 py-8 rounded-xl overflow-y-scroll">
          <h1 className="font-bold text-2xl uppercase text-center">
            Absensi Sholat Program Beasiswa PUB
          </h1>

          <p className="indent-4 text-justify py-2">
            Aplikasi berbasis Web ini berfungsi sebagai sistem manajemen
            kehadiran sholat yang komprehensif untuk lingkungan Program Beasiswa
            PUB.
          </p>
          <hr className="my-4" />
          <h2 className="font-semibold text-xl">Fitur</h2>
          <ul className="features text-justify flex flex-col gap-4 indent-4 list-decimal">
            <li>
              Pengelolaan Mahasiswa: Menyimpan dan mengelola informasi
              mahasiswa, termasuk nama, ID, dan afiliasi Program Beasiswa PUB.
            </li>
            <li>
              Pelacakan Kehadiran Sholat: Memungkinkan pelacakan kehadiran
              mahasiswa secara waktu nyata untuk berbagai waktu sholat (Subuh,
              Zuhur, Asar, Magrib, Isya). Menyediakan opsi untuk menandai
              kehadiran sebagai hadir, alfa, atau dengan seizin (ijin).
            </li>
            <li>
              Integrasi Data: Terhubung dengan basis data yang aman (Menggunakan
              Google Firebase) untuk memastikan penyimpanan data dan pengambilan
              data yang efisien.
            </li>
            <li>
              Antarmuka Ramah Pengguna: Menyediakan bilah navigasi terstruktur
              dengan baik untuk memudahkan akses ke fungsionalitas seperti
              menambahkan mahasiswa baru, melihat bagian tentang yang
              informatif, dan memilih Program Beasiswa PUB yang relevan.
            </li>
            <li>
              Pelaporan Kehadiran: Membuat laporan terformat yang mencantumkan
              mahasiswa yang tidak hadir dan yang diberi izin untuk waktu sholat
              dan Program Beasiswa PUB tertentu. Laporan ini dapat dengan mudah
              disalin ke clipboard untuk disebarkan lebih lanjut.
            </li>
            <li>
              Pemfilteran Dinamis: Memfilter daftar mahasiswa berdasarkan Asrama
              yang dipilih saat ini, memungkinkan pengelolaan kehadiran yang
              terfokus.
            </li>
            <li>
              Pemilihan Waktu Sholat: Memungkinkan pengguna untuk beralih di
              antara waktu sholat yang berbeda untuk melacak kehadiran.
            </li>
            <li>
              Keamanan dan Privasi: Aplikasi ini kemungkinan mematuhi praktik
              keamanan terbaik untuk melindungi data mahasiswa yang disimpan
              dalam basis data.
            </li>
          </ul>

          <hr className="my-4" />
          <h2 className="font-semibold text-xl">Manfaat</h2>
          <ul className="benefits text-justify indent-4 list-decimal">
            <li>
              Pengelolaan Kehadiran yang Disederhanakan: Mempermudah proses
              pencatatan dan pelacakan kehadiran sholat mahasiswa.
            </li>
            <li>
              Efisiensi yang Ditingkatkan: Menghilangkan kebutuhan untuk
              pencatatan manual, sehingga menghemat waktu dan sumber daya.
            </li>
            <li>
              Pelaporan yang Ditingkatkan: Menawarkan pelaporan yang nyaman dan
              akurat tentang pola kehadiran sholat mahasiswa.
            </li>
            <li>
              Transparansi dan Akuntabilitas: Mempromosikan transparansi dalam
              pelacakan kehadiran dan menumbuhkan akuntabilitas di antara para
              mahasiswa.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
