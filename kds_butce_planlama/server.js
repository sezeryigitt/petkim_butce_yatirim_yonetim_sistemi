const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const baglanti = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ksd_butce_tahminleme"
});

baglanti.connect(err => {
    if (err) {
        console.error("MySQL bağlantı hatası:", err);
        return;
    }
    console.log("MySQL bağlantısı başarılı!");
});




// Chart.js ile dashboard oluşturma
app.get('/icerik/proje-karlilik', (req, res) => {
    const sql = `
        SELECT 
            ProjeAdi,
            YatirimTutari,
            BeklenenGetiri
        FROM Yatirimlar;
    `;
    baglanti.query(sql, (error, results) => {
        if (error) {
            console.error("SQL sorgu hatası:", error);
            return res.status(500).json({ hata: "Veritabanı hatası" });
        }
        res.json({ tip: 'projeKarsilastirma', veriler: results });
    });
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Uygulama ${port} portunda çalışıyor.`);
});

