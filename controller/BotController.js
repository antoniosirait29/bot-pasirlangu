const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

module.exports = class BotController extends Controller {
  constructor(options) {
    super(options);
    this.isProcessing = false; // Flag untuk menandakan apakah bot sedang dalam proses
  }

  async handleRequestWithDelay(request, handler) {
    if (this.isProcessing && request.body !== "test") {
      // Jika bot sedang dalam proses delay, abaikan semua perintah kecuali 'test'
      return;
    }

    this.isProcessing = true; // Set flag menjadi true untuk menandakan proses sedang berlangsung

    // Jalankan fungsi handler yang diterima dengan delay 5 detik
    await new Promise((resolve) => setTimeout(resolve, 15000));

    await handler(request);

    this.isProcessing = false; // Set flag menjadi false setelah proses selesai
  }

  async menu(request) {
    if (this.isProcessing) return;
    return Response.menu.fromArrayOfString([f("menu.sku"), f("menu.wiraswasta"), f("menu.domisili"), f("menu.kelahiran"), f("menu.kematian")], f("intro", [request.name]), f("template.menu"));
  }

  async greetings(request) {
    if (this.isProcessing) return;
    return this.reply(`*Pelayanan Desa Pasirlangu*
Selamat datang di Layanan Administrasi Desa Pasirlangu.
Silahkan ketik "*Layanan*" untuk membuka menu.
*Layanan Administrasi buka Senin s/d Jumat pukul 08.00 - 15.00 WIB, untuk hari Sabtu, Minggu, dan Tanggal Merah libur. Dokumen anda akan dilayani pada saat jam kerja di hari kerja* 
`);
  }

  async sku(request) {
    if (this.isProcessing) return;
    return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterarngan Usaha (SKU)
1. KTP
2. Jenis Usaha
3. Lama Usaha
https://docs.google.com/forms/d/e/1FAIpQLSdvBDC0f8xuDwUOFKm9MzbDtZsUOqvJHQp6Rz9zNXT5LAKtsA/viewform
Silahkan isi form diatas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
  }
  async wiraswasta(request) {
    if (this.isProcessing) return;
    return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterarngan Wiraswasta
1. KTP
https://docs.google.com/forms/d/e/1FAIpQLSeFJGcm65V3gZzihGYuBy4DV4eFeg6i5QKTUqwHPtW-8JY7Sw/viewform
Silahkan isi form diatas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
  }
  async domisili(request) {
    if (this.isProcessing) return;
    return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterarngan Domisili
1. KK/KTP
2. Alamat
https://docs.google.com/forms/d/e/1FAIpQLSfR6441n7MrukmKeE0lkV_SAWKqJPXqXaPDyuYVnhNFpPXA_A/viewform
Silahkan isi form diatas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
  }

  async kelahiran(request) {
    if (this.isProcessing) return;
    return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterarngan Kelahiran
1. Kartu Keluarga (KK)
https://docs.google.com/forms/d/e/1FAIpQLSdLI6GGLi1SPXNBxzEPgYGCRFZjt4jLpSrW2shz-zUYZ_wTIw/viewform
Silahkan isi form diatas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
  }

  async kematian(request) {
    if (this.isProcessing) return;
    return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterarngan Kelahiran
1. Kartu Keluarga (KK)
https://docs.google.com/forms/d/e/1FAIpQLSfMHGUDraBEV3NBsykyZYJkypuWPp1pJQAJBDEeCCExh5qDzQ/viewform
Silahkan isi form diatas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
  }

  async selesai(request) {
    if (this.isProcessing) return;
    return this.reply(`*Pelayanan Desa Pasirlangu*
Dokumen anda akan diproses dan akan dihubungi kembali jika sudah selesai. Mohon tunggu balasan dari admin.
`);
  }

  async test(request) {
    await this.handleRequestWithDelay(request, async () => {
      await this.reply("berhasil");
    });
  }
};
