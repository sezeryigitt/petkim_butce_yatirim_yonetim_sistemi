document.addEventListener('DOMContentLoaded', () => {

    const moduleLinks = document.querySelectorAll('.module-list > li > a');
    const subMenuLinks = document.querySelectorAll('.module-list li ul li a');
    const contentArea = document.getElementById('content-area');

    moduleLinks.forEach(moduleLink => {
        moduleLink.addEventListener('click', (event) => {
            event.preventDefault();
            const parentLi = moduleLink.parentNode;
            parentLi.classList.toggle('active');
            const sublist = parentLi.querySelector('ul');
            if (sublist) {
                sublist.style.maxHeight = sublist.style.maxHeight ? null : sublist.scrollHeight + "px";
            }
        });
    });

    

    function icerikYukle(sayfaAdi) {
        fetch(`/icerik/${sayfaAdi}`)
            .then(response => response.json())
            .then(data => {
                console.log("Gelen veri:", data);
                let icerikHTML = `<h1>${data.baslik || ""}</h1>`;
    
                // İlgili verileri ekle
                if (data.veriler && data.veriler.length > 0) {
                    if (data.tip === 'projeKarsilastirma') {
                        icerikHTML += '<canvas class="projeKarlilikGrafiğiniOlustur" id="projeKarlilikGrafigi"></canvas>';
                        icerikHTML += '<canvas id="projeTablo"></canvas>';
                    } else {
                        icerikHTML += "<p>Desteklenmeyen veri tipi.</p>";
                    }
                }
    
                // Gelir-Gider grafiklerini ekle
                if (data.veriler_1 && data.veriler_1.length > 0) {
                    if (data.tip === 'gelir_gider') {
                        
                        // Grafiklerin yerleştirileceği container'ı oluşturuyoruz
                        icerikHTML += '<div id="canvas-container-finansal">';
                        icerikHTML += '<canvas id="gelir_gider_2"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider_3"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider_4"></canvas>';
                        icerikHTML += '</div>';
                    }
                }
                if (data.veriler_2 && data.veriler_2.length > 0) {
                    if (data.tip === 'gelir_gider2') {
                        icerikHTML += '<div id="canvas-container-finansal">';
                        icerikHTML += '<canvas id="gelir_gider2_2"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider2"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider2_3"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider2_4"></canvas>';
                        icerikHTML += '</div>';
                    }
                }
                if (data.veriler_3 && data.veriler_3.length > 0) {
                    if (data.tip === 'gelir_gider3') {
                        icerikHTML += '<div id="canvas-container-finansal">';
                        icerikHTML += '<canvas id="gelir_gider3_2"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider3"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider3_3"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider3_4"></canvas>';
                        icerikHTML += '</div>';
                    }
                }
                if (data.veriler_4 && data.veriler_4.length > 0) {
                    if (data.tip === 'gelir_gider4') {
                        icerikHTML += '<div id="canvas-container-finansal">';
                        icerikHTML += '<canvas id="gelir_gider4_2"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider4"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider4_3"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider4_4"></canvas>';
                        icerikHTML += '</div>';
                    }
                }
                if (data.veriler_5 && data.veriler_5.length > 0) {
                    if (data.tip === 'gelir_gider5') {
                        icerikHTML += '<div id="canvas-container-finansal">';
                        icerikHTML += '<canvas id="gelir_gider5_2"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider5"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider5_3"></canvas>';
                        icerikHTML += '<canvas id="gelir_gider5_4"></canvas>';
                        icerikHTML += '</div>';
                    }
                }
    
                contentArea.innerHTML = icerikHTML;
    
                // Grafik fonksiyonlarını çağır
                if (data.veriler && data.veriler.length > 0) {
                    if (data.tip === 'projeKarsilastirma') {
                        projeKarlilikGrafiğiniOlustur(data.veriler);
                        projeTablo(data.veriler);
                    }
                }
                if (data.veriler_1 && data.veriler_1.length > 0) {
                    if (data.tip === 'gelir_gider') {
                        gelir_gider_dashboard(data.veriler_1);
                        gelir_gider_dashboard_2(data.veriler_1);
                        gelir_gider_dashboard_3(data.veriler_1);
                        gelir_gider_dashboard_4(data.veriler_1);
                    }
                }
                if (data.veriler_2 && data.veriler_2.length > 0) {
                    if (data.tip === 'gelir_gider2') {
                        gelir_gider_dashboard2(data.veriler_2);
                        gelir_gider_dashboard2_2(data.veriler_2);
                        gelir_gider_dashboard2_3(data.veriler_2);
                        gelir_gider_dashboard2_4(data.veriler_2);
                    }
                }
                if (data.veriler_3 && data.veriler_3.length > 0) {
                    if (data.tip === 'gelir_gider3') {
                        gelir_gider_dashboard3(data.veriler_3);
                        gelir_gider_dashboard3_2(data.veriler_3);
                        gelir_gider_dashboard3_3(data.veriler_3);
                        gelir_gider_dashboard3_4(data.veriler_3);
                    }
                }
                if (data.veriler_4 && data.veriler_4.length > 0) {
                    if (data.tip === 'gelir_gider4') {
                        gelir_gider_dashboard4(data.veriler_4);
                        gelir_gider_dashboard4_2(data.veriler_4);
                        gelir_gider_dashboard4_3(data.veriler_4);
                        gelir_gider_dashboard4_4(data.veriler_4);
                    }
                }
                if (data.veriler_5 && data.veriler_5.length > 0) {
                    if (data.tip === 'gelir_gider5') {
                        gelir_gider_dashboard5(data.veriler_5);
                        gelir_gider_dashboard5_2(data.veriler_5);
                        gelir_gider_dashboard5_3(data.veriler_5);
                        gelir_gider_dashboard5_4(data.veriler_5);
                    }
                }
    
                subMenuLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.module-list li ul li a[data-sayfa="${sayfaAdi}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            })
            .catch(error => {
                console.error("İçerik yükleme hatası:", error);
                contentArea.innerHTML = "<p class='hata'>İçerik yüklenirken bir hata oluştu.</p>";
            });
    }
    


    function projeKarlilikGrafiğiniOlustur(veriler) {
        const projeAdi = veriler.map(item => item.ProjeAdi);
        const yatirimTutari = veriler.map(item => item.YatirimTutari);
        const beklenenGetiri = veriler.map(item => item.BeklenenGetiri);

        const ctx = document.getElementById('projeKarlilikGrafigi')?.getContext('2d');
        if (!ctx) return;

        try {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: projeAdi,
                    datasets: [
                        {
                            label: 'Yatırım Tutarı',
                            data: yatirimTutari,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Beklenen Getiri',
                            data: beklenenGetiri,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Kar Marjı (%)',
                            data: projeAdi.map((_, index) =>
                                ((beklenenGetiri[index] - yatirimTutari[index]) / yatirimTutari[index] * 100).toFixed(2)
                            ),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            type: 'line',
                            yAxisID: 'percentage'
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        percentage: {
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                callback: function (value) {
                                    return value + '%';
                                }
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    if (tooltipItem.dataset.label === 'Kar Marjı (%)') {
                                        return `Kar Marjı: ${tooltipItem.raw}%`;
                                    }
                                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Grafik oluşturulamadı:', error);
        }
        
    }
    
    function projeTablo() {
        // Veriler fonksiyon içinde tanımlandı
        const veriler = [
            { ProjeAdi: "Yeni Enerji Santrali Kurulumu", BaslangicTarihi: "2024-01-01", BitisTarihi: "2026-01-01", YatirimTutari: 150000000.00, BeklenenGetiri: 200000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Petrokimya Ürünleri Üretimi Yatırımı", BaslangicTarihi: "2024-03-01", BitisTarihi: "2025-12-01", YatirimTutari: 80000000.00, BeklenenGetiri: 120000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "Çevre Dostu Atık Yönetimi Projesi", BaslangicTarihi: "2024-04-15", BitisTarihi: "2025-04-15", YatirimTutari: 5000000.00, BeklenenGetiri: 10000000.00, RiskSeviyesi: "Düşük" },
            { ProjeAdi: "Yeni Depolama Tesisi Kurulumu", BaslangicTarihi: "2024-05-01", BitisTarihi: "2026-05-01", YatirimTutari: 25000000.00, BeklenenGetiri: 40000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "Lojistik Altyapı Geliştirme Projesi", BaslangicTarihi: "2024-06-01", BitisTarihi: "2025-06-01", YatirimTutari: 30000000.00, BeklenenGetiri: 45000000.00, RiskSeviyesi: "Düşük" },
            { ProjeAdi: "Ar-Ge Yatırımı", BaslangicTarihi: "2024-07-01", BitisTarihi: "2027-07-01", YatirimTutari: 10000000.00, BeklenenGetiri: 25000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Yeni Üretim Tesisi İnşaatı", BaslangicTarihi: "2024-08-01", BitisTarihi: "2025-08-01", YatirimTutari: 40000000.00, BeklenenGetiri: 60000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "Verimlilik Artırıcı Yatırımlar", BaslangicTarihi: "2024-09-01", BitisTarihi: "2026-09-01", YatirimTutari: 20000000.00, BeklenenGetiri: 30000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "Petrokimya Ham Maddeleri İthalatı Yatırımı", BaslangicTarihi: "2024-10-01", BitisTarihi: "2025-10-01", YatirimTutari: 15000000.00, BeklenenGetiri: 25000000.00, RiskSeviyesi: "Düşük" },
            { ProjeAdi: "Biyoteknoloji Ürünleri Üretimi Yatırımı", BaslangicTarihi: "2024-11-01", BitisTarihi: "2026-11-01", YatirimTutari: 12000000.00, BeklenenGetiri: 18000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Yeni Rafineri İnşaatı", BaslangicTarihi: "2024-12-01", BitisTarihi: "2027-12-01", YatirimTutari: 250000000.00, BeklenenGetiri: 400000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Dijital Dönüşüm Yatırımı", BaslangicTarihi: "2025-01-01", BitisTarihi: "2026-01-01", YatirimTutari: 50000000.00, BeklenenGetiri: 75000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "Petrokimya Ürünleri Geri Dönüşüm Projesi", BaslangicTarihi: "2025-03-01", BitisTarihi: "2027-03-01", YatirimTutari: 30000000.00, BeklenenGetiri: 45000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "Yeni Depo ve Dağıtım Ağı Kurulumu", BaslangicTarihi: "2025-04-01", BitisTarihi: "2026-04-01", YatirimTutari: 15000000.00, BeklenenGetiri: 25000000.00, RiskSeviyesi: "Düşük" },
            { ProjeAdi: "Biyokimya Ar-Ge Merkezi", BaslangicTarihi: "2025-05-01", BitisTarihi: "2027-05-01", YatirimTutari: 12000000.00, BeklenenGetiri: 18000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Yenilenebilir Enerji Yatırımları", BaslangicTarihi: "2025-06-01", BitisTarihi: "2028-06-01", YatirimTutari: 100000000.00, BeklenenGetiri: 150000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Yeni Laboratuvar ve Test Merkezi", BaslangicTarihi: "2025-07-01", BitisTarihi: "2026-07-01", YatirimTutari: 8000000.00, BeklenenGetiri: 12000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "İleri Teknoloji Üretim Makinaları Yatırımı", BaslangicTarihi: "2025-08-01", BitisTarihi: "2026-08-01", YatirimTutari: 35000000.00, BeklenenGetiri: 55000000.00, RiskSeviyesi: "Düşük" },
            { ProjeAdi: "Tesis Modernizasyon Projesi", BaslangicTarihi: "2025-09-01", BitisTarihi: "2027-09-01", YatirimTutari: 20000000.00, BeklenenGetiri: 30000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "Uluslararası Pazar Genişletme Projesi", BaslangicTarihi: "2025-10-01", BitisTarihi: "2027-10-01", YatirimTutari: 50000000.00, BeklenenGetiri: 80000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Endüstriyel Robotik Teknolojisi Yatırımı", BaslangicTarihi: "2025-11-01", BitisTarihi: "2027-11-01", YatirimTutari: 40000000.00, BeklenenGetiri: 60000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Petrokimya Ham Maddesi Üretimi", BaslangicTarihi: "2026-01-01", BitisTarihi: "2028-01-01", YatirimTutari: 60000000.00, BeklenenGetiri: 100000000.00, RiskSeviyesi: "Orta" },
            { ProjeAdi: "Arıtma ve Su Yönetimi Projesi", BaslangicTarihi: "2026-03-01", BitisTarihi: "2027-03-01", YatirimTutari: 15000000.00, BeklenenGetiri: 20000000.00, RiskSeviyesi: "Düşük" },
            { ProjeAdi: "Yeni Enerji Depolama Teknolojisi Yatırımı", BaslangicTarihi: "2026-04-01", BitisTarihi: "2028-04-01", YatirimTutari: 70000000.00, BeklenenGetiri: 110000000.00, RiskSeviyesi: "Yüksek" },
            { ProjeAdi: "Dış Mekan Güneş Enerjisi Kurulumu", BaslangicTarihi: "2026-05-01", BitisTarihi: "2027-05-01", YatirimTutari: 25000000.00, BeklenenGetiri: 35000000.00, RiskSeviyesi: "Düşük" }
        ];
    
        let tabloHTML = `
            <table id="projeTablo" class="table">
                <thead>
                    <tr>
                        <th>Proje Adı</th>
                        <th>Başlangıç Tarihi</th>
                        <th>Bitiş Tarihi</th>
                        <th>Yatırım Tutarı</th>
                        <th>Beklenen Getiri</th>
                        <th>Kar Marjı (%)</th>
                        <th>Risk Seviyesi</th>
                    </tr>
                </thead>
                <tbody>
        `;
    
        // Verileri tabloya ekliyoruz
        veriler.forEach(item => {
            const karMarji = ((item.BeklenenGetiri - item.YatirimTutari) / item.YatirimTutari * 100).toFixed(2);
            tabloHTML += `
                <tr>
                    <td>${item.ProjeAdi}</td>
                    <td>${item.BaslangicTarihi}</td>
                    <td>${item.BitisTarihi}</td>
                    <td>${item.YatirimTutari.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                    <td>${item.BeklenenGetiri.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                    <td>${karMarji} %</td>
                    <td>${item.RiskSeviyesi}</td>
                </tr>
            `;
        });
    
        tabloHTML += `
                </tbody>
            </table>
        `;
    
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML += tabloHTML;
    }
    
    
    
    

    function gelir_gider_dashboard(veriler_1) {
        const Tarih = veriler_1.map(item => item.Tarih);
        const MaliyetTuru = veriler_1.map(item => item.MaliyetTuru);
        const MaliyetTutari = veriler_1.map(item => item.MaliyetTutari);
        const MaliyetTutari2 = veriler_1.map(item => item.maliyetTutari);
    
        const ctx = document.getElementById('gelir_gider')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01", "2024-11-01", "2024-12-01"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi (TL)',
                        data: [50000, 55000, 60000, 52000, 60000, 65000, 70000, 78000, 85000, 90000, 95000, 100000], // Bu veriyi tamamladım.
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi (TL)',
                        data: [200000, 180000, 160000, 210000, 220000, 230000, 240000, 250000, 260000, 270000, 280000, 290000], // Bu veriyi tamamladım.
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [16.67, 16.67, 14.29, 17.5, 18, 19, 20, 21, 22, 23, 24, 25], // Bu veriyi tamamladım.
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Kâr Marjı (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Aylara Göre Gelir, Gider ve Kâr Marjı',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
    }
    
    function gelir_gider_dashboard_2(veriler_1) {
        const GelirButcesi = veriler_1.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_1.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_1.map(item => item.GelirBeklentisi);
        const KarMarji = veriler_1.map(item => ((item.GelirButcesi - item.GiderButcesi) / item.GelirButcesi) * 100);
    
        const ctx = document.getElementById('gelir_gider_2')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli", "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: [120000000, 30000000, 35000000, 40000000, 50000000], // Bu veriyi tamamladım.
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: [100000000, 25000000, 30000000, 35000000, 45000000], // Bu veriyi tamamladım.
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: [150000000, 37500000, 43750000, 50000000, 62500000], // Bu veriyi tamamladım.
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [16.67, 16.67, 14.29, 17.5, 18], // Bu veriyi tamamladım.
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
                        }
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Kâr Marjı (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Gelir ve Gider Bütçesi ile Kâr Marjı 2024 Dönemleri',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }
    
    function gelir_gider_dashboard_3(veriler_1) {
        const GelirButcesi = veriler_1.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_1.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_1.map(item => item.GelirBeklentisi);
        const KarMarji = veriler_1.map(item => ((item.GelirButcesi - item.GiderButcesi) / item.GelirButcesi) * 100);
    
        const ctx = document.getElementById('gelir_gider_3')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                datasets: [
                    {
                        label: 'Enerji Tüketimi (kWh)',
                        type: 'line',
                        data: [25000, 26000, 27000, 26500, 27500, 28000, 29000, 29500, 30000, 31000, 32000, 33000],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sol eksen
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 160000],
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (KM)',
                        type: 'line',
                        data: [20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000],
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    y2: {
                        position: 'right'
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Aylara Göre Operasyonel Maliyetler',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
    }
    
    function gelir_gider_dashboard_4(veriler_1) {
            const Tarih = veriler_1.map(item => item.Tarih);
            const MaliyetTuru = veriler_1.map(item => item.MaliyetTuru);
            const MaliyetTutari = veriler_1.map(item => item.MaliyetTutari);
            const MaliyetTutari2 = veriler_1.map(item => item.maliyetTutari);

            const ctx = document.getElementById('gelir_gider_4')?.getContext('2d');
            if (!ctx) return;
                

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4'],
                    datasets: [
                        {
                            label: 'Enerji Tüketimi (kWh)',
                            data: [217000, 263000, 297000, 323000],
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Lojistik (km)',
                            data: [375000, 420000, 465000, 510000],
                            backgroundColor: 'rgba(255, 159, 64, 0.6)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Teknoloji ve Dijitalleşme (TL)',
                            data: [530000, 920000, 810000, 1100000],
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Su ve Atık Yönetimi (TL)',
                            data: [315000, 360000, 405000, 450000],
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Bakım-Onarım (TL)',
                            data: [630000, 720000, 610000, 900000],
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Finansal ve Sigorta (TL)',
                            data: [465000, 510000, 555000, 600000],
                            backgroundColor: 'rgba(255, 206, 86, 0.6)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '2024 Çeyrek Dönemlere Göre Operasyonel Maliyetler',
                            font: {
                                size: 18
                            }
                        }
                    }
                }
            });
    }
    
        
    
    





    function gelir_gider_dashboard2(veriler_2) {
        const GelirButcesi = veriler_2.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_2.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_2.map(item => item.GelirBeklentisi);
        const ctx = document.getElementById('gelir_gider2')?.getContext('2d');
        if (!ctx) return;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01", "2024-11-01", "2024-12-01"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi (TL)',
                        data: [120000000, 30000000, 35000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000, 110000000, 120000000], // Değerler verilerinize göre düzenlendi
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi (TL)',
                        data: [100000000, 25000000, 30000000, 35000000, 45000000, 50000000, 55000000, 60000000, 65000000, 70000000, 75000000, 80000000], // Değerler verilerinize göre düzenlendi
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        data: [16.67, 16.67, 14.29, 12.5, 15, 16, 17, 18, 19, 20, 21, 22], // Kâr marjı hesaplamaları için verilerinize göre düzenlendi
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Kâr Marjı (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Aylara Göre Gelir, Gider ve Kâr Marjı',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
        
    }
    function gelir_gider_dashboard2_2(veriler_2) {
        const GelirButcesi = veriler_2.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_2.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_2.map(item => item.GelirBeklentisi);
        const KarMarji = veriler_2.map(item => ((item.GelirButcesi - item.GiderButcesi) / item.GelirButcesi) * 100);
    
        const ctx = document.getElementById('gelir_gider2_2')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli", "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: [120000000, 30000000, 35000000, 40000000, 50000000],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: [100000000, 25000000, 30000000, 35000000, 45000000],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: [150000000, 37500000, 43750000, 50000000, 62500000],
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [16.67, 16.67, 14.29, 12.5, 15],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
                        }
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Kâr Marjı (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Gelir ve Gider Bütçesi ile Kâr Marjı 2024 Dönemleri',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }
    function gelir_gider_dashboard2_3(veriler_2) {
            const GelirButcesi = veriler_2.map(item => item.GelirButcesi);
            const GiderButcesi = veriler_2.map(item => item.GiderButcesi);
            const GelirBeklentisi = veriler_2.map(item => item.GelirBeklentisi);

            const ctx = document.getElementById('gelir_gider2_3')?.getContext('2d');
            if (!ctx) return;

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                    datasets: [
                        {
                            label: 'Enerji Tüketimi (kWh)',
                            type: 'line',
                            data: [45000, 48000, 49000, 47000, 49000, 50000, 51000, 52000, 68000, 75000, 76000, 78000],
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            fill: false,
                            yAxisID: 'y2' // Sol eksen
                        },
                        {
                            label: 'Lojistik (KM)',
                            data: [80000, 100000, 95000, 110000, 115000, 120000, 125000, 165000, 145000, 150000, 155000, 160000],
                            backgroundColor: 'rgba(255, 159, 64, 0.6)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false,
                            yAxisID: 'y2' // Sağ eksen
                        },
                        {
                            label: 'Su ve Atık Yönetimi (TL)',
                            data: [100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 155000],
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Teknoloji ve Dijitalleşme (TL)',
                            data: [200000, 210000, 220000, 230000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000],
                            backgroundColor: 'rgba(255, 206, 86, 0.6)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        y2: {
                            position: 'right'
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '2024 Aylara Göre Operasyonel Maliyetler',
                            font: {
                                size: 18
                            }
                        }
                    }
                }
            });
              
    }
    function gelir_gider_dashboard2_4(veriler_2) {
        const GelirButcesi = veriler_2.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_2.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_2.map(item => item.GelirBeklentisi);
        const KarMarji = veriler_2.map(item => ((item.GelirButcesi - item.GiderButcesi) / item.GelirButcesi) * 100);
    
        const ctx = document.getElementById('gelir_gider2_4')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4'],
                datasets: [
                    {
                        label: 'Enerji Tüketimi (kWh)',
                        data: [142000, 146000, 172000, 229000],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (km)',
                        data: [295000, 345000, 395000, 465000],
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [630000, 720000, 810000, 900000],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [315000, 360000, 405000, 450000],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [490000, 510000, 530000, 590000],
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [465000, 510000, 555000, 600000],
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Çeyrek Dönemlere Göre Operasyonel Maliyetler',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
        
    }
    
    
    

    function gelir_gider_dashboard3(veriler_3) {
        const GelirButcesi = veriler_3.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_3.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_3.map(item => item.GelirBeklentisi);
        const ctx = document.getElementById('gelir_gider3')?.getContext('2d');
        if (!ctx) return;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01", "2024-11-01", "2024-12-01"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi (TL)',
                        data: [20000000.00, 25000000.00, 30000000.00, 35000000.00, 37500000.00, 40000000.00, 45000000.00, 50000000.00, 55000000.00, 60000000.00, 65000000.00, 70000000.00], // Veriler düzenlendi.
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi (TL)',
                        data: [15000000.00, 20000000.00, 25000000.00, 30000000.00, 32500000.00, 35000000.00, 40000000.00, 45000000.00, 50000000.00, 55000000.00, 60000000.00, 65000000.00], // Veriler düzenlendi.
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [33.33, 20, 16.67, 14.29, 13.33, 12.5, 11.11, 10, 9.09, 8.33, 7.69, 7.14], // Veriler düzenlendi.
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    y2: {
                        position: 'right'
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Aylara Göre Gelir, Gider ve Kâr Marjı',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
    }
    function gelir_gider_dashboard3_2(veriler_3) {
        const GelirButcesi = veriler_3.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_3.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_3.map(item => item.GelirBeklentisi);
        const KarMarji = veriler_3.map(item => ((item.GelirButcesi - item.GiderButcesi) / item.GelirButcesi) * 100);
    
        const ctx = document.getElementById('gelir_gider3_2')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli", "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: [80000000, 20000000, 25000000, 30000000, 35000000],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: [60000000, 15000000, 20000000, 25000000, 30000000],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: [116000000, 29000000, 36250000, 43500000, 50750000],
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [16.67, 14.29, 12.5, 17.11, 10],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
                        }
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Kâr Marjı (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Gelir ve Gider Bütçesi ile Kâr Marjı 2024 Dönemleri',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }
    function gelir_gider_dashboard3_3(veriler_3) {
        const GelirButcesi = veriler_3.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_3.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_3.map(item => item.GelirBeklentisi);
        const KarMarji = veriler_3.map(item => ((item.GelirButcesi - item.GiderButcesi) / item.GelirButcesi) * 100);
    
        const ctx = document.getElementById('gelir_gider3_3')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                datasets: [
                    {
                        label: 'Enerji Tüketimi (kWh)',
                        type: 'line',
                        data: [60000, 60000, 65000, 58000, 61000, 58000, 59000, 68000, 75000, 76000, 78000],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sol eksen
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [150000, 160000, 170000, 180000, 190000, 200000, 210000, 220000, 230000, 240000, 250000, 260000],
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (KM)',
                        type: 'line',
                        data: [80000, 80000, 95000, 100000, 98000, 100000, 105000, 145000, 150000, 155000, 160000],
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    y2: {
                        position: 'right'
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Aylara Göre Operasyonel Maliyetler',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
        
    }
    function gelir_gider_dashboard3_4(veriler_3) {
        const GelirButcesi = veriler_3.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_3.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_3.map(item => item.GelirBeklentisi);
        const KarMarji = veriler_3.map(item => ((item.GelirButcesi - item.GiderButcesi) / item.GelirButcesi) * 100);
    
        const ctx = document.getElementById('gelir_gider3_4')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4'],
                datasets: [
                    {
                        label: 'Enerji Tüketimi (kWh)',
                        data: [60000, 65000, 58000, 75000],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (km)',
                        data: [80000, 95000, 98000, 150000],
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [150000, 160000, 170000, 240000],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [80000, 85000, 90000, 130000],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [180000, 220000, 230000, 280000],
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [120000, 125000, 130000, 175000],
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Çeyrek Dönemlere Göre Operasyonel Maliyetler',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
        
    }
    
    
    
    function gelir_gider_dashboard4(veriler_4) {
        const GelirButcesi = veriler_4.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_4.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_4.map(item => item.GelirBeklentisi);

        const ctx = document.getElementById('gelir_gider4')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01", "2024-11-01", "2024-12-01"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi (TL)',
                        data: [
                            39000000, 41000000, 42000000, 46000000, 47000000, 49000000, 53000000, 55000000, 57000000, 58000000, 59000000, 61000000
                        ], // Daha değişken gelir verileri
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi (TL)',
                        data: [
                            34000000, 33000000, 32000000, 38000000, 36000000, 39000000, 42000000, 45000000, 44000000, 46000000, 47000000, 48000000
                        ], // Giderlerde dalgalanma ve çeşitlilik
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [
                            15, 14.5, 14, 15.5, 16, 17, 18.5, 18, 19, 18.5, 19, 19.5
                        ], // Kâr marjı verileri daha değişken
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Kâr Marjı (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Aylara Göre Gelir, Gider ve Kâr Marjı',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
    }
    function gelir_gider_dashboard4_2(veriler_4) {
        const GelirButcesi = veriler_4.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_4.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_4.map(item => item.GelirBeklentisi);
        const NetNakitAkisi = veriler_4.map(item => item.NetNakitAkisi);
        const KarMarji = [
            (150000000 - 120000000) / 150000000 * 100,  // 2024 Geneli
            (40000000 - 35000000) / 40000000 * 100,    // 2024-Q1
            (45000000 - 40000000) / 45000000 * 100,    // 2024-Q2
            (50000000 - 45000000) / 50000000 * 100,    // 2024-Q3
            (60000000 - 50000000) / 60000000 * 100     // 2024-Q4
        ];
    
        const ctx = document.getElementById('gelir_gider4_2')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli", "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: [150000000, 40000000, 45000000, 50000000, 60000000],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: [120000000, 35000000, 40000000, 45000000, 50000000],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: [232500000, 62000000, 69750000, 77500000, 93000000],
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: KarMarji,
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
                        }
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Kâr Marjı (%)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Gelir ve Gider Bütçesi ile Kâr Marjı 2024 Dönemleri',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }
    function gelir_gider_dashboard4_3(veriler_4) {
        const GelirButcesi = veriler_4.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_4.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_4.map(item => item.GelirBeklentisi);
        const NetNakitAkisi = veriler_4.map(item => item.NetNakitAkisi);
        const KarMarji = [
            (150000000 - 120000000) / 150000000 * 100,  // 2024 Geneli
            (40000000 - 35000000) / 40000000 * 100,    // 2024-Q1
            (45000000 - 40000000) / 45000000 * 100,    // 2024-Q2
            (50000000 - 45000000) / 50000000 * 100,    // 2024-Q3
            (60000000 - 50000000) / 60000000 * 100     // 2024-Q4
        ];
    
        const ctx = document.getElementById('gelir_gider4_3')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                datasets: [
                    {
                        label: 'Enerji Tüketimi (kWh)',
                        type: 'line',
                        data: [70000, 75000, 71000, 73000, 74000, 75000, 76000, 76000, 68000, 75000, 76000, 78000],  // Enerji Tüketimi
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sol eksen
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [130000, 140000, 150000, 160000, 170000, 180000, 190000, 200000, 210000, 220000, 230000, 240000],  // Teknoloji ve Dijitalleşme
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000],  // Su ve Atık Yönetimi
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (KM)',
                        type: 'line',
                        data: [70000, 75000, 90000, 105000, 110000, 115000, 120000, 145000, 150000, 155000, 160000, 160000],  // Lojistik
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    y2: {
                        position: 'right'
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Aylara Göre Operasyonel Maliyetler',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });
        
    }
    function gelir_gider_dashboard4_4(veriler_4) {
        const GelirButcesi = veriler_4.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_4.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_4.map(item => item.GelirBeklentisi);
        const NetNakitAkisi = veriler_4.map(item => item.NetNakitAkisi);
        const KarMarji = [
            (150000000 - 120000000) / 150000000 * 100,  // 2024 Geneli
            (40000000 - 35000000) / 40000000 * 100,    // 2024-Q1
            (45000000 - 40000000) / 45000000 * 100,    // 2024-Q2
            (50000000 - 45000000) / 50000000 * 100,    // 2024-Q3
            (60000000 - 50000000) / 60000000 * 100     // 2024-Q4
        ];
    
        const ctx = document.getElementById('gelir_gider4_4')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4'],
                datasets: [
                    {
                        label: 'Enerji Tüketimi (kWh)',
                        data: [70000, 75000, 71000, 73000], // Updated data for Enerji Tüketimi
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (km)',
                        data: [90000, 105000, 105000, 115000], // Updated data for Lojistik
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [130000, 140000, 150000, 160000], // Updated data for Teknoloji ve Dijitalleşme
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [50000, 55000, 60000, 65000], // Updated data for Su ve Atık Yönetimi
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [250000, 260000, 270000, 260000], // Updated data for Bakım-Onarım
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [110000, 115000, 120000, 125000], // Updated data for Finansal ve Sigorta
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Çeyrek Dönemlere Göre Operasyonel Maliyetler',
                        font: {
                            size: 18
                        }
                    }
                }
            }
        });  
    }
    
    
    function gelir_gider_dashboard5(veriler_5) {
        const GelirButcesi = veriler_5.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_5.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_5.map(item => item.GelirBeklentisi);

        const ctx = document.getElementById('gelir_gider5')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07"],
                datasets: [
                    {
                        label: 'Lojistik (km)',
                        data: [ ], // Aylık toplamlar
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [], // Aylık toplamlar
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Enerji Tüketimi (kWh)',
                        data: [], // Aylık toplamlar
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Değerler'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: '2024 Çeyrek Dönemlere Göre Operasyonel Maliyetler',
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
                
    }
    function gelir_gider_dashboard5_2(veriler_5) {
        const GelirButcesi = veriler_5.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_5.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_5.map(item => item.GelirBeklentisi);
        const NetNakitAkisi = veriler_5.map(item => item.NetNakitAkisi);


        const ctx = document.getElementById('gelir_gider5_2')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli" ,"2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: GelirButcesi,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: GiderButcesi,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: GelirBeklentisi,
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1
                    },
                    {
                        label: 'Nakit Akışı',
                        data: NetNakitAkisi,
                        backgroundColor: 'rgba(86, 45, 250, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            plugins: {
                title: {
                    display: true,
                    text: 'Gelir ve Gider Bütçesi 2 024 Dönemleri',
                    font: {
                        size: 18
                    }
                }
            }
            }
        });
        
    }
    function gelir_gider_dashboard5_3(veriler_5) {
        const GelirButcesi = veriler_5.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_5.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_5.map(item => item.GelirBeklentisi);
        const NetNakitAkisi = veriler_5.map(item => item.NetNakitAkisi);


        const ctx = document.getElementById('gelir_gider5_3')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli" ,"2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: GelirButcesi,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: GiderButcesi,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: GelirBeklentisi,
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1
                    },
                    {
                        label: 'Nakit Akışı',
                        data: NetNakitAkisi,
                        backgroundColor: 'rgba(86, 45, 250, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            plugins: {
                title: {
                    display: true,
                    text: 'Gelir ve Gider Bütçesi 2 024 Dönemleri',
                    font: {
                        size: 18
                    }
                }
            }
            }
        });
        
    }
    function gelir_gider_dashboard5_4(veriler_5) {
        const GelirButcesi = veriler_5.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_5.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_5.map(item => item.GelirBeklentisi);
        const NetNakitAkisi = veriler_5.map(item => item.NetNakitAkisi);


        const ctx = document.getElementById('gelir_gider5_4')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli" ,"2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: GelirButcesi,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
         
       },
                    {
                        label: 'Gider Bütçesi',
                        data: GiderButcesi,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: GelirBeklentisi,
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1
                    },
                    {
                        label: 'Nakit Akışı',
                        data: NetNakitAkisi,
                        backgroundColor: 'rgba(86, 45, 250, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            plugins: {
                title: {
                    display: true,
                    text: 'Gelir ve Gider Bütçesi 2 024 Dönemleri',
                    font: {
                        size: 18
                    }
                }
            }
            }
        });
        
    }






    if (subMenuLinks.length > 0) {
        icerikYukle(subMenuLinks[0].dataset.sayfa);
    }

    subMenuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            icerikYukle(link.dataset.sayfa);
        });
    });

});