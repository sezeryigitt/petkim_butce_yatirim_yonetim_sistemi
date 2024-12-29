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

                if (data.veriler && data.veriler.length > 0) {
                    if (data.tip === 'projeKarsilastirma') {
                        icerikHTML += '<canvas id="projeKarlilikGrafigi"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        projeKarlilikGrafiğiniOlustur(data.veriler);
                    } else {
                        icerikHTML += "<p>Desteklenmeyen veri tipi.</p>";
                        contentArea.innerHTML = icerikHTML;
                    }
                } else if (data.hata) {
                    contentArea.innerHTML = `<p class="hata">${data.hata}</p>`;
                } else {
                    contentArea.innerHTML = "<p>Gösterilecek veri bulunamadı.</p>";
                }

                if (data.veriler_1 && data.veriler_1.length > 0) {
                    if (data.tip === 'gelir_gider') {
                        icerikHTML += '<canvas id="gelir_gider"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        gelir_gider_dashboard(data.veriler_1);
                    }
                }
                if (data.veriler_2 && data.veriler_2.length > 0) {
                    if (data.tip === 'gelir_gider2') {
                        icerikHTML += '<canvas id="gelir_gider2"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        gelir_gider_dashboard2(data.veriler_2);
                    }
                }
                if (data.veriler_3 && data.veriler_3.length > 0) {
                    if (data.tip === 'gelir_gider3') {
                        icerikHTML += '<canvas id="gelir_gider3"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        gelir_gider_dashboard3(data.veriler_3);
                    }
                }
                if (data.veriler_4 && data.veriler_4.length > 0) {
                    if (data.tip === 'gelir_gider4') {
                        icerikHTML += '<canvas id="gelir_gider4"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        gelir_gider_dashboard4(data.veriler_4);
                    }
                }
                if (data.veriler_5 && data.veriler_5.length > 0) {
                    if (data.tip === 'gelir_gider5') {
                        icerikHTML += '<canvas id="gelir_gider5"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        gelir_gider_dashboard5(data.veriler_5);
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
                    
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function gelir_gider_dashboard(veriler_1) {
        const GelirButcesi = veriler_1.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_1.map(item => item.GiderButcesi);
        const GelirBeklentisi = veriler_1.map(item => item.GelirBeklentisi);

        const ctx = document.getElementById('gelir_gider')?.getContext('2d');
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
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
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
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
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
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
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
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
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
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
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
