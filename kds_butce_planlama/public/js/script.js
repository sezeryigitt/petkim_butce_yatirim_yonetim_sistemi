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


                // Widget bölgesini ekleyin
            icerikHTML += `
                        <div id="widget-container">
                <div class="widget widget-financial">
                    <i class="fas fa-chart-line widget-icon"></i>
                    <h3 class="widget-title">Gelir</h3>
                    <p class="widget-value">Değer: <span>1 Milyar 325 Milyon TL</span></p>
                </div>
                <div class="widget widget-expense">
                    <i class="fas fa-money-bill-wave widget-icon"></i>
                    <h3 class="widget-title">Gider</h3>
                    <p class="widget-value">Değer: <span>1 Milyar 60 Milyon TL</span></p>
                </div>
                <div class="widget widget-profit">
                    <i class="fas fa-coins widget-icon"></i>
                    <h3 class="widget-title">Net Kâr</h3>
                    <p class="widget-value">Değer: <span>265 Milyon TL</span></p>
                </div>
            </div>
        `;
    
                // İlgili verileri ekle
                if (data.veriler && data.veriler.length > 0) {
                    if (data.tip === 'projeKarsilastirma') {
                        icerikHTML += '<canvas class="proje" id="projeKarlilikGrafigi"></canvas>';
                    } else {
                        icerikHTML += "<p>Desteklenmeyen veri tipi.</p>";
                    }
                }
    
                // Gelir-Gider grafiklerini ekle

                if (data.veriler12 && data.veriler12.length > 0) {
                    if (data.tip === 'projeRiskAnalizi') {
                        icerikHTML += '<canvas id="projeRiskAnalizi2"></canvas>';
                    }
                }
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
                        projeKarlilikGrafiğiniOlustur(data.veriler);

                    }
                }
                if (data.veriler && data.veriler.length > 0) {
                    if (data.tip === 'projeRiskAnaliziVeri') {
                        projeRiskAnalizi(data.veriler);
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
    
    // Fonksiyon tanımı
    function projeTablo() {
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
        ]
    
        let tabloHTML = `
            <table id="projeTablo" class="table">
                <thead>
                    <tr>
                        <th><input type="text" id="filterProjeAdi" placeholder="Proje Adı" onkeyup="filterTable(0)"></th>
                        <th><input type="text" id="filterBaslangic" placeholder="Başlangıç Tarihi" onkeyup="filterTable(1)"></th>
                        <th><input type="text" id="filterBitis" placeholder="Bitiş Tarihi" onkeyup="filterTable(2)"></th>
                        <th><input type="text" id="filterYatirim" placeholder="Yatırım Tutarı" onkeyup="filterTable(3)"></th>
                        <th><input type="text" id="filterGetiri" placeholder="Beklenen Getiri" onkeyup="filterTable(4)"></th>
                        <th><input type="text" id="filterKar" placeholder="Kar Marjı" onkeyup="filterTable(5)"></th>
                        <th><input type="text" id="filterRisk" placeholder="Risk Seviyesi" onkeyup="filterTable(6)"></th>
                    </tr>
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
    
        // filterTable fonksiyonunu burada tanımlıyoruz
        window.filterTable = function(columnIndex) {
            const input = event.target;
            const filter = input.value.toUpperCase();
            const table = document.getElementById("projeTablo");
            const rows = table.getElementsByTagName("tr");
    
            for (let i = 2; i < rows.length; i++) { // İlk iki satır başlıklar için ayrılmış
                const cell = rows[i].getElementsByTagName("td")[columnIndex];
                if (cell) {
                    const txtValue = cell.textContent || cell.innerText;
                    rows[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
                }
            }
        };
    }


    function projeRiskAnalizi(veriler12) {
        const projeAdi = veriler12.map(item => item.ProjeAdi);
        const yatirimTutari = veriler12.map(item => item.YatirimTutari);
        const beklenenGetiri = veriler12.map(item => item.BeklenenGetiri);

        const ctx = document.getElementById('projeRiskAnalizi2')?.getContext('2d');
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
                        label: 'Gider Bütçesi (TL)',
                        data: [48000, 52000, 55000, 58000, 60000, 59000, 62000, 70000, 72000, 75000, 80000, 85000], // Güncellenmiş
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gelir Bütçesi (TL)',
                        data: [200000, 190000, 180000, 230000, 250000, 270000, 240000, 230000, 220000, 210000, 200000, 190000], // Güncellenmiş
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [16.67, 18.42, 20.00, 15.22, 14.00, 12.33, 16.67, 21.74, 22.22, 25.00, 28.57, 31.25], // Güncellenmiş
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
                        data: [120000000, 30000000, 35000000, 40000000, 50000000], // Güncellenmiş
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: [100000000, 25000000, 30000000, 35000000, 45000000], // Güncellenmiş
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: [150000000, 37500000, 43750000, 50000000, 62500000], // Güncellenmiş
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [16.67, 16.67, 14.29, 17.5, 18], // Güncellenmiş
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
                        data: [26000, 26000, 26000, 32000, 32000, 33000, 35000, 36000, 37000, 40000, 40000, 41000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sol eksen
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [105000, 105000, 105000, 123333, 123333, 123334, 130000, 130000, 130000, 150000, 150000, 150000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [22000, 22000, 22000, 28667, 28667, 28666, 30333, 30333, 30334, 35000, 35000, 35000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Lojistik (KM)',
                        type: 'line',
                        data: [21000, 21000, 22000, 24333, 24333, 24334, 27000, 27000, 27000, 30000, 30000, 30000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [30000, 30000, 30000, 40000, 40000, 40000, 36667, 36667, 36666, 50000, 50000, 50000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [24000, 24000, 24000, 26000, 26000, 26000, 27333, 27333, 27334, 30333, 30333, 30334], // Çeyrekten aylara dağıtıldı
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
                        }
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
                            data: [78000, 97000, 107000, 121000], // Q2'de belirgin artış
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Lojistik (km)',
                            data: [64000, 73000, 81000, 90000], // Q2 artışı
                            backgroundColor: 'rgba(255, 159, 64, 0.6)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Teknoloji ve Dijitalleşme (TL)',
                            data: [315000, 370000, 390000, 450000], // Q2'de yatırımlar artıyor
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Su ve Atık Yönetimi (TL)',
                            data: [66000, 86000, 91000, 105000], // Dengeli artış
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Bakım-Onarım (TL)',
                            data: [90000, 120000, 110000, 150000], // Q2 artış gösteriyor
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Finansal ve Sigorta (TL)',
                            data: [72000, 78000, 82000, 91000], // Sabit ve dengeli artış
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
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Bütçe (TL)'
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
                        data: [100000000, 110000000, 115000000, 120000000, 130000000, 140000000, 150000000, 160000000, 170000000, 180000000, 190000000, 200000000], // Q2'de hafif artış, Q4'te yüksek artış
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi (TL)',
                        data: [80000000, 85000000, 90000000, 100000000, 110000000, 120000000, 130000000, 135000000, 140000000, 145000000, 150000000, 160000000], // Dengeli artış, Q2'de belirgin gider
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        data: [20, 22, 22, 16.67, 18.18, 14.29, 13.33, 18.52, 21.43, 25, 26.32, 28.57], // Q2'de düşüş, Q4'te yükselme
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
                        data: [1800000000, 500000000, 550000000, 600000000, 650000000], // Yıllık toplam ve çeyrek bazında artış
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: [1500000000, 450000000, 500000000, 520000000, 580000000], // Q2'de belirgin gider
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        stack: 'stack1' // Yığılma grubu
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: [2000000000, 550000000, 600000000, 650000000, 700000000], // Dengeli artış
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [20, 20, 16.67, 21.43, 20], // Q2'de düşüş, Q3'te toparlanma
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
                        data: [47333, 47333, 47334, 55667, 55667, 55666, 65667, 65667, 65666, 75667, 75667, 75666], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sol eksen
                    },
                    {
                        label: 'Lojistik (KM)',
                        type: 'line',
                        data: [98333, 98333, 98334, 115000, 115000, 115000, 135000, 135000, 135000, 151667, 151667, 151666], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [105000, 105000, 105000, 130000, 130000, 130000, 150000, 150000, 150000, 170000, 170000, 170000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [210000, 210000, 210000, 260000, 260000, 260000, 306667, 306667, 306666, 366667, 366667, 366666], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [163333, 163333, 163334, 176667, 176667, 176666, 196667, 196667, 196666, 220000, 220000, 220000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [155000, 155000, 155000, 170000, 170000, 170000, 185000, 185000, 185000, 206667, 206667, 206666], // Çeyrekten aylara dağıtıldı
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
                        }
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
                        data: [142000, 167000, 197000, 227000], // Q2 ve Q3'te belirgin artış
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (km)',
                        data: [295000, 345000, 405000, 455000], // Q2 ve Q3'te belirgin artış
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [630000, 780000, 920000, 1100000], // Q2'de hafif artış, Q3-Q4 hızlanıyor
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [315000, 390000, 450000, 510000], // Dengeli artış
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [490000, 530000, 590000, 660000], // Q3-Q4 belirgin artış
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [465000, 510000, 555000, 620000], // Hafif ve dengeli artış
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
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
                    }
                }
            }
        });
        
    }
    
    
    

    function gelir_gider_dashboard3(veriler_3) {
        const ctx = document.getElementById('gelir_gider3')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["2024-01-01", "2024-02-01", "2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01", "2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01", "2024-11-01", "2024-12-01"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi (TL)',
                        data: [20000000, 25000000, 30000000, 35000000, 37000000, 40000000, 45000000, 50000000, 55000000, 60000000, 65000000, 70000000], // Gelir düzenlendi
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi (TL)',
                        data: [15000000, 20000000, 23000000, 27000000, 29000000, 31000000, 35000000, 40000000, 42000000, 45000000, 47000000, 50000000], // Gider düzenlendi
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [25, 20, 23.33, 22.86, 21.62, 22.5, 22.22, 20, 23.64, 25, 27.69, 28.57], // Kâr Marjı düzenlendi
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2'
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
    
    function gelir_gider_dashboard3_2(veriler_3) {
        const ctx = document.getElementById('gelir_gider3_2')?.getContext('2d');
        if (!ctx) return;
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli", "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: [510000000, 75000000, 112000000, 150000000, 173000000], // Çeyrek toplam düzenlendi
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        stack: 'stack1'
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: [460000000, 58000000, 89000000, 115000000, 148000000], // Çeyrek toplam düzenlendi
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        stack: 'stack1'
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: [520000000, 80000000, 125000000, 160000000, 180000000], // Çeyrek toplam düzenlendi
                        backgroundColor: 'rgba(54, 235, 111, 0.2)',
                        borderColor: 'rgb(40, 193, 42)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [13.73, 22.67, 20.54, 23.33, 14.45], // Çeyrek kâr marjı düzenlendi
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        fill: false,
                        yAxisID: 'y2'
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
                        data: [62000, 62000, 62000, 63000, 63000, 63000, 68000, 68000, 68000, 73700, 73700, 73700], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sol eksen
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [160000, 160000, 160000, 190000, 190000, 190000, 216667, 216667, 216666, 260000, 260000, 260000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [85000, 85000, 85000, 95000, 95000, 95000, 106667, 106667, 106666, 120000, 120000, 120000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (KM)',
                        type: 'line',
                        data: [85000, 85000, 85000, 93333, 93333, 93334, 108333, 108333, 108334, 123333, 123333, 123334], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2' // Sağ eksen
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [180000, 180000, 180000, 193333, 193333, 193334, 206667, 206667, 206666, 230000, 230000, 230000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [120000, 120000, 120000, 130000, 130000, 130000, 140000, 140000, 140000, 156667, 156667, 156666], // Çeyrekten aylara dağıtıldı
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
                        }
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
                        data: [186000, 189000, 204000, 221000], // Çeyrek enerji tüketimi toplamı
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (km)',
                        data: [255000, 280000, 325000, 370000], // Çeyrek lojistik toplamı
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [480000, 570000, 650000, 780000], // Çeyrek teknoloji harcamaları toplamı
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [255000, 285000, 320000, 360000], // Çeyrek toplam
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [540000, 580000, 620000, 690000], // Çeyrek toplam
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [360000, 390000, 420000, 470000], // Çeyrek toplam
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
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
                    }
                }
            }
        });
        
    }
    
    
    
    function gelir_gider_dashboard4(veriler_4) {
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
                            39000000, 41000000, 43000000, 45000000, 47000000, 49000000, 51000000, 53000000, 55000000, 57000000, 59000000, 61000000
                        ], // Gelir Bütçesi düzenlendi
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Gider Bütçesi (TL)',
                        data: [
                            34000000, 36000000, 38000000, 40000000, 42000000, 44000000, 46000000, 48000000, 50000000, 52000000, 54000000, 56000000
                        ], // Gider Bütçesi düzenlendi
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Kâr Marjı (%)',
                        type: 'line',
                        data: [
                            12.82, 12.2, 11.63, 11.11, 10.64, 10.2, 9.8, 9.43, 9.09, 8.77, 8.47, 8.2
                        ], // Kâr Marjı düzenlendi
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
        const ctx = document.getElementById('gelir_gider4_2')?.getContext('2d');
        if (!ctx) return;
    
        const KarMarji = [
            ((150000000 - 120000000) / 150000000 * 100).toFixed(2),  // 2024 Geneli
            ((40000000 - 35000000) / 40000000 * 100).toFixed(2),    // 2024-Q1
            ((45000000 - 40000000) / 45000000 * 100).toFixed(2),    // 2024-Q2
            ((50000000 - 45000000) / 50000000 * 100).toFixed(2),    // 2024-Q3
            ((60000000 - 50000000) / 130000000 * 100).toFixed(2)     // 2024-Q4
        ];
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["2024 Geneli", "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
                datasets: [
                    {
                        label: 'Gelir Bütçesi',
                        data: [150000000, 40000000, 45000000, 50000000, 60000000], // Çeyrek Gelir Bütçesi
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        stack: 'stack1'
                    },
                    {
                        label: 'Gider Bütçesi',
                        data: [120000000, 35000000, 40000000, 45000000, 50000000], // Çeyrek Gider Bütçesi
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        stack: 'stack1'
                    },
                    {
                        label: 'Beklenen Gelir Bütçesi',
                        data: [232500000, 62000000, 69750000, 77500000, 93000000], // Çeyrek Beklenen Gelir
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
                        data: [46667, 46667, 46666, 55667, 55667, 55666, 65667, 65667, 65666, 75667, 75667, 75666], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2'
                    },
                    {
                        label: 'Teknoloji ve Dijitalleşme (TL)',
                        data: [43333, 43333, 43334, 46667, 46667, 46666, 50000, 50000, 50000, 53333, 53333, 53334], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Su ve Atık Yönetimi (TL)',
                        data: [16667, 16667, 16666, 18333, 18333, 18334, 20000, 20000, 20000, 21667, 21667, 21666], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lojistik (KM)',
                        type: 'line',
                        data: [30000, 30000, 30000, 35000, 35000, 35000, 40000, 40000, 40000, 45000, 45000, 45000], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1,
                        fill: false,
                        yAxisID: 'y2'
                    },
                    {
                        label: 'Bakım-Onarım (TL)',
                        data: [83333, 83333, 83334, 86667, 86667, 86666, 90000, 90000, 90000, 93333, 93333, 93334], // Çeyrekten aylara dağıtıldı
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Finansal ve Sigorta (TL)',
                        data: [36667, 36667, 36666, 38333, 38333, 38334, 40000, 40000, 40000, 41667, 41667, 41666], // Çeyrekten aylara dağıtıldı
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
                        }
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Bütçe (TL)'
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