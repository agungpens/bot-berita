const fs = require("fs");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");

const token = "6799605302:AAGL1oSownAexPPRlXTTTnqBai8mihVkM5I"; // Ganti dengan token bot Telegram kamu
const bot = new TelegramBot(token, { polling: true });

console.log("SCHEDULER BERITA SEDANG BERJALAN, SETIAP JAM 07-19 WIB");

// Fungsi untuk mengambil berita dari NewsAPI
async function dapatkanBerita() {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=id&apiKey=413d559999e14d7882628ec6f050315c"
    );
    const artikel = response.data.articles[0]; // Mengambil artikel pertama dari hasil
    return artikel;
  } catch (error) {
    console.error("Gagal mengambil berita:", error);
    return null;
  }
}

// Fungsi untuk mengirim pesan dengan artikel berita ke banyak chat ID
function kirimPesanKeBanyakOrang(chatIds, artikel) {
  chatIds.forEach((chatId) => {
    if (artikel) {
      const pesan = `Hari ini, berita terbaru: \n${artikel.title}\n${artikel.url}`;
      bot.sendMessage(chatId, pesan);

      // Catat log waktu pengiriman pesan
      const waktuSekarang = new Date().toLocaleString();
      const logPesan = `${artikel.title} | ${waktuSekarang}\n`;
      fs.appendFile("log.txt", logPesan, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Log berhasil disimpan ke dalam file.");
        }
      });
    }
  });
}

// Daftar chat ID yang ingin kamu kirim pesan
const daftarChatIds = ["840020460"]; // Ganti dengan chat ID yang kamu miliki
// 840020460
// 1511213315

// Atur jadwal pengiriman pesan menggunakan cron
cron.schedule("56 7-19 * * *", async () => {
  const artikel = await dapatkanBerita();
  kirimPesanKeBanyakOrang(daftarChatIds, artikel);
});
