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