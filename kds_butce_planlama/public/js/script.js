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
                let icerikHTML = `<h1>${data.baslik || "Başlık Yok"}</h1>`;

                if (data.veriler && data.veriler.length > 0) {
                    if (data.tip === 'projeKarsilastirma') {
                        icerikHTML += '<canvas id="projeKarlilikGrafigi"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        projeKarlilikGrafiğiniOlustur(data.veriler);
                    } else if (data.tip === 'gelir_gider') {
                        icerikHTML += '<canvas id="gelir_gider"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        gelir_gider_dashboard(data.veriler_1);
                    } else {
                        icerikHTML += "<p>Desteklenmeyen veri tipi.</p>";
                        contentArea.innerHTML = icerikHTML;
                    }
                } else if (data.hata) {
                    contentArea.innerHTML = `<p class="hata">${data.hata}</p>`;
                } else {
                    contentArea.innerHTML = "<p>Gösterilecek veri bulunamadı.</p>";
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
                    }
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
        const Donem = veriler_1.map(item => item.Donem);
        const GelirButcesi = veriler_1.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_1.map(item => item.GiderButcesi);

        const ctx = document.getElementById('gelir_gider')?.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Donem,
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
