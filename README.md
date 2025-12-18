# PETKİM Bütçe ve Yatırım Yönetim Sistemi

Yatırım projeleri için karlılık analizi, bütçe planlaması ve finansal risk değerlendirmesi yapan web tabanlı yönetim sistemi. Dashboard üzerinden tesis bazlı gelir-gider takibi, operasyonel maliyet analizi ve raporlama özellikleri sunar.

## Kurulum

### Gereksinimler

Sistemi çalıştırmak için aşağıdaki yazılımların kurulu olması gerekir:

- **Node.js** v16 veya üzeri
- **MySQL** 8.0 veya üzeri

### Kurulum Adımları

```bash
# Proje dizinine git
cd kds_butce_planlama

# Bağımlılıkları yükle
npm install

# Veritabanı ayarlarını yapılandır
# (server.js içinde MySQL bağlantı bilgilerini güncelle)

# Uygulamayı başlat
npm start
```

Uygulama varsayılan olarak **http://localhost:3000** adresinde çalışmaya başlar.

---

## Özellikler

### Proje Yönetimi
- **Karlılık Analizi**: Yatırım projelerinin gelir-gider dengesi ve kar marjı hesaplama
- **Risk Değerlendirme**: Finansal risklerin analizi ve görselleştirilmesi
- **Tesis Bazlı Takip**: 5 farklı tesis için ayrı gelir-gider yönetimi

### Raporlama ve Görselleştirme
- İnteraktif grafikler (Chart.js)
- Tablo bazlı veri sunumu
- PDF rapor çıktısı
- Operasyonel maliyet izleme

---

## Teknolojiler

### Frontend
- HTML5 & CSS3
- Vanilla JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/) - Grafik görselleştirme
- Font Awesome - İkonlar

### Backend
- Node.js (v16+)
- Express.js (v4.17)
- MySQL (v8.0)
- mysql2/promise - Veritabanı işlemleri

---

## Proje Yapısı

```
kds_butce_planlama/
 server.js              # Express sunucusu ve API endpoint'leri
 package.json           # Bağımlılıklar ve betikler
 public/
     index.html         # Ana sayfa
     css/
        styles.css     # Stil dosyaları
     js/
        script.js      # Ana JavaScript dosyası
        yatirimVerileri.js
     resim/             # Görsel varlıklar
```

---

## API Endpoint'leri

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `GET` | `/icerik/proje-karlilik` | Proje karlılık verilerini döndürür |
| `GET` | `/icerik/risk-analizi` | Risk analiz verilerini döndürür |
| `GET` | `/icerik/gelir-gider` | Tesis bazlı gelir-gider bilgileri |
| `GET` | `/icerik/operasyonel-maliyet` | Operasyonel maliyet verileri |

**Örnek Response:**
```json
{
  "success": true,
  "data": [ /* proje verileri */ ]
}
```

---

## Geliştirme

### Veritabanı Şeması

Proje aşağıdaki MySQL tablolarını kullanır:
- `projeler` - Yatırım projeleri
- `risk_analiz` - Risk değerlendirme verileri
- `gelir_gider` - Gelir-gider kayıtları
- `operasyonel_maliyet` - Operasyonel maliyet takibi

### Testler

```bash
# Test komutları eklenecek
npm test
```

---

## Roadmap

- [ ] Kullanıcı authentication ve yetkilendirme
- [ ] WebSocket ile gerçek zamanlı veri güncelleme
- [ ] Otomatik raporlama ve e-posta bildirimleri
- [ ] Excel import/export desteği
- [ ] Dashboard widget'ları için özelleştirme

---

## Katkıda Bulunma

Pull request ve issue'lar için: **sezeryigit.tr@gmail.com**  
LinkedIn: [linkedin.com/in/sezer-yigit-](https://www.linkedin.com/in/sezer-yigit-/)

---

## Lisans

MIT  2025 Sezer Yiğit

> **Not:** Bu proje demo amaçlıdır ve gerçek şirket verisi içermez.
