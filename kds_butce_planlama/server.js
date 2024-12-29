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

app.get('/icerik/gelir-gider-tablosu', (req, res) => {
    const sql = `
        SELECT 
            TesisAdi, 
            GelirButcesi, 
            GiderButcesi,
            GelirBeklentisi
        FROM butce
        JOIN tesisler ON butce.TesisID = tesisler.TesisID
        WHERE tesisler.TesisAdi="PETKİM Aliağa Petrokimya Fabrikası";
    `;
    baglanti.query(sql, (error, results) => {
        if (error) {
            console.error("SQL sorgu hatası:", error);
            return res.status(500).json({ hata: "Veritabanı hatası" });
        }
        res.json({ tip: 'gelir_gider', veriler_1: results });
    });
});

app.get('/icerik/gelir-gider-tablosu2', (req, res) => {
    const sql = `
        SELECT 
            GelirButcesi, 
            GiderButcesi,
            GelirBeklentisi
        FROM butce
        JOIN tesisler ON butce.TesisID = tesisler.TesisID
        WHERE tesisler.TesisAdi="PETKİM Satış Ofisi İstanbul";
    `;
    baglanti.query(sql, (error, results) => {
        if (error) {
            console.error("SQL sorgu hatası:", error);
            return res.status(500).json({ hata: "Veritabanı hatası" });
        }
        res.json({ tip: 'gelir_gider2', veriler_2: results });
    });
});

app.get('/icerik/gelir-gider-tablosu3', (req, res) => {
    const sql = `
        SELECT 
            GelirButcesi, 
            GiderButcesi,
            GelirBeklentisi
        FROM butce
        JOIN tesisler ON butce.TesisID = tesisler.TesisID
        WHERE tesisler.TesisAdi="PETKİM Satış Ofisi İstanbul";
    `;
    baglanti.query(sql, (error, results) => {
        if (error) {
            console.error("SQL sorgu hatası:", error);
            return res.status(500).json({ hata: "Veritabanı hatası" });
        }
        res.json({ tip: 'gelir_gider3', veriler_3: results });
    });
});

app.get('/icerik/gelir-gider-tablosu4', (req, res) => {
    const sql = `
        SELECT 
            GelirButcesi, 
            GiderButcesi,
            GelirBeklentisi
        FROM butce
        JOIN tesisler ON butce.TesisID = tesisler.TesisID
        WHERE tesisler.TesisAdi="PETKİM Satış Ofisi İstanbul";
    `;
    baglanti.query(sql, (error, results) => {
        if (error) {
            console.error("SQL sorgu hatası:", error);
            return res.status(500).json({ hata: "Veritabanı hatası" });
        }
        res.json({ tip: 'gelir_gider4', veriler_4: results });
    });
});

app.get('/icerik/gelir-gider-tablosu5', (req, res) => {
    const sql = `
        SELECT 
            GelirButcesi, 
            GiderButcesi,
            GelirBeklentisi
        FROM butce
        JOIN tesisler ON butce.TesisID = tesisler.TesisID
        WHERE tesisler.TesisAdi="PETKİM Teknik Bakım Merkezi";
    `;
    baglanti.query(sql, (error, results) => {
        if (error) {
            console.error("SQL sorgu hatası:", error);
            return res.status(500).json({ hata: "Veritabanı hatası" });
        }
        res.json({ tip: 'gelir_gider5', veriler_5: results });
    });
});











app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});
