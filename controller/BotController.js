const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

const userSessions = new Map(); // Menggunakan Map untuk menyimpan sesi pengguna

module.exports = class BotController extends Controller {
  constructor(handler) {
    super(handler);
  }

  async executeCommand(userId, method, request) {
    // Periksa apakah pengguna ini sedang dalam mode pertanyaan
    const session = userSessions.get(userId);
    if (session && session.inQuestionMode) {
      return this.reply("Anda sedang dalam mode pertanyaan. Silakan lanjutkan percakapan dengan admin.");
    }
    // Jalankan metode yang diminta
    await method(request);
  }

  async startQuestionMode(userId, request) {
    const session = userSessions.get(userId);
    if (session && session.inQuestionMode) {
      return this.reply("Anda sudah dalam mode pertanyaan dengan admin.");
    }

    // Aktifkan mode pertanyaan untuk pengguna ini
    userSessions.set(userId, { inQuestionMode: true });

    // Setel timeout untuk mengakhiri mode pertanyaan setelah 10 menit
    setTimeout(() => {
      const currentSession = userSessions.get(userId);
      if (currentSession && currentSession.inQuestionMode) {
        userSessions.delete(userId); // Hapus session mode pertanyaan
        this.replyTo(userId, "Mode pertanyaan telah berakhir. Bot kembali ke mode otomatis.");
      }
    }, 10 * 60 * 1000); // 10 menit

    return this.reply("Anda sekarang dalam mode pertanyaan dengan admin. Silakan mulai percakapan.");
  }

  async endQuestionMode(userId) {
    const session = userSessions.get(userId);
    if (session && session.inQuestionMode) {
      userSessions.delete(userId);
      return this.reply("Mode pertanyaan telah dihentikan. Bot kembali ke mode otomatis.");
    } else {
      return this.reply("Anda tidak sedang dalam mode pertanyaan.");
    }
  }

  // Implementasi perintah lainnya
  async menu(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return Response.menu.fromArrayOfString([f("menu.sku"), f("menu.wiraswasta"), f("menu.domisili"), f("menu.kelahiran"), f("menu.kematian")], f("intro", [request.name]), f("template.menu"));
      },
      request
    );
  }

  async greetings(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply(`*Pelayanan Desa Pasirlangu*
Selamat datang di Layanan Administrasi Desa Pasirlangu.
Silahkan ketik "*Layanan*" untuk membuka menu.
*Layanan Administrasi buka Senin s/d Jumat pukul 08.00 - 15.00 WIB, untuk hari Sabtu, Minggu, dan Tanggal Merah libur. Dokumen anda akan dilayani pada saat jam kerja di hari kerja* 
`);
      },
      request
    );
  }

  async sku(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterangan Usaha (SKU)
1. KTP
2. Jenis Usaha
3. Lama Usaha
https://docs.google.com/forms/d/e/1FAIpQLSdvBDC0f8xuDwUOFKm9MzbDtZsUOqvJHQp6Rz9zNXT5LAKtsA/viewform
Silahkan isi form di atas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
      },
      request
    );
  }

  async wiraswasta(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterangan Wiraswasta
1. KTP
https://docs.google.com/forms/d/e/1FAIpQLSeFJGcm65V3gZzihGYuBy4DV4eFeg6i5QKTUqwHPtW-8JY7Sw/viewform
Silahkan isi form di atas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
      },
      request
    );
  }

  async domisili(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterangan Domisili
1. KK/KTP
2. Alamat
https://docs.google.com/forms/d/e/1FAIpQLSfR6441n7MrukmKeE0lkV_SAWKqJPXqXaPDyuYVnhNFpPXA_A/viewform
Silahkan isi form di atas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
      },
      request
    );
  }

  async kelahiran(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterangan Kelahiran
1. Kartu Keluarga (KK)
https://docs.google.com/forms/d/e/1FAIpQLSdLI6GGLi1SPXNBxzEPgYGCRFZjt4jLpSrW2shz-zUYZ_wTIw/viewform
Silahkan isi form di atas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
      },
      request
    );
  }

  async kematian(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply(`*Pelayanan Desa Pasirlangu*
Persyaratan pembuatan Surat Keterangan Kematian
1. Kartu Keluarga (KK)
https://docs.google.com/forms/d/e/1FAIpQLSfMHGUDraBEV3NBsykyZYJkypuWPp1pJQAJBDEeCCExh5qDzQ/viewform
Silahkan isi form di atas.
Jika sudah isi form, silahkan ketik "*Selesai*"
`);
      },
      request
    );
  }

  async selesai(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply(`*Pelayanan Desa Pasirlangu*
Dokumen anda akan diproses dan akan dihubungi kembali jika sudah selesai. Mohon tunggu balasan dari admin.`);
      },
      request
    );
  }

  async test(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply("berhasil");
      },
      request
    );
  }

  async nanya(request) {
    const userId = request.sender;
    await this.executeCommand(
      userId,
      async () => {
        return this.reply("SIlahkan kirimkan pertanyaan");
      },
      request
    );
  }

  async pertanyaan(request) {
    const userId = request.sender;
    await this.startQuestionMode(userId, request);
  }

  async akhiriPertanyaan(request) {
    const userId = request.sender;
    await this.endQuestionMode(userId);
  }
};
