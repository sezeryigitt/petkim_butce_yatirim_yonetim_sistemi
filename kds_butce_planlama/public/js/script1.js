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
                let icerikHTML = `<h1>${data.baslik || "Başlık Yok"}</h1>`;

                if (data.veriler && data.veriler.length > 0) {
                    if (data.tip === 'gelir_gider_dashboard') {
                        icerikHTML += '<canvas id="yeniDashboardGrafigi"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        yeniDashboardGrafiğiniOlustur(data.veriler);
                    } else {
                        icerikHTML += "<p>Bu tip için destek eklenmedi.</p>";
                        contentArea.innerHTML = icerikHTML;
                    }
                } else {
                    icerikHTML = "<p>Gösterilecek veri bulunamadı.</p>";
                    contentArea.innerHTML = icerikHTML;
                }
            })
            .catch(error => {
                console.error("İçerik yükleme hatası:", error);
                contentArea.innerHTML = "<p class='hata'>İçerik yüklenirken bir hata oluştu.</p>";
            });
    }

    function gelir_gider_dashboard(veriler_1) {
        const Donem = veriler_1.map(item => item.Donem);
        const GelirButcesi = veriler_1.map(item => item.GelirButcesi);
        const GiderButcesi = veriler_1.map(item => item.GelirButcesi);

        const ctx = document.getElementById('gelir_gider').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Donem,
                datasets: [{
                    label: 'GelirButcesi',
                    data: GelirButcesi,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'GiderButcesi',
                    data: GiderButcesi,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
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
