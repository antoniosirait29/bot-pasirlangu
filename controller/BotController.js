const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

module.exports = class BotController extends Controller {
  async menu(request) {
    return Response.menu.fromArrayOfString([f("menu.sku"), f("menu.wiraswasta"), f("menu.domisili"), f("menu.kelahiran"), f("menu.kematian")], f("intro", [request.name]), f("template.menu"), f("footer"));
  }

  async greetings(request) {
    return this.reply(`*Pelayanan Desa Pasirlangu*
Selamat datang di Layanan Administrasi Desa Pasirlangu.
Silahkan ketik "*Layanan*" untuk membuka menu.
*Layanan Administrasi buka Senin s/d Jumat pukul 08.00 - 15.00 WIB, untuk hari Sabtu, Minggu, dan Tanggal Merah libur. Dokumen anda akan dilayani pada saat jam kerja di hari kerja* 
`);
  }

  async sku(request) {
    return this.reply(`ini untuk SKU
`);
  }
  async wiraswasta(request) {
    return this.reply(`ini untuk wiraswasta
`);
  }
  async domisili(request) {
    return this.reply(`ini untuk domisili
`);
  }

  async kelahiran(request) {
    return this.reply(`ini untuk kelahiran
`);
  }

  async kematian(request) {
    return this.reply(`ini untuk kematian
`);
  }
};
