const { Router, Response } = require("pepesan");
const BotController = require("./controller/BotController");
const f = require("./utils/Formatter");

const router = new Router();

router.menu(f("menu.sku"), [BotController, "sku"]);
router.menu(f("menu.wiraswasta"), [BotController, "wiraswasta"]);
router.menu(f("menu.domisili"), [BotController, "domisili"]);
router.menu(f("menu.kelahiran"), [BotController, "kelahiran"]);
router.menu(f("menu.kematian"), [BotController, "kematian"]);
router.keyword("Layanan", [BotController, "menu"]);
router.keyword("selesai", [BotController, "selesai"]);
router.keyword("test", [BotController, "test"]);
router.keyword("*", [BotController, "greetings"]);

module.exports = router;
