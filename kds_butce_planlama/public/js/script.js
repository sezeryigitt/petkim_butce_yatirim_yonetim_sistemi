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
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let icerikHTML = `<h1>${data.baslik || "Başlık Yok"}</h1>`;

                if (data.veriler && data.veriler.length > 0) {
                    if (data.tip === 'projeKarsilastirma') {
                        icerikHTML += '<canvas id="projeKarlilikGrafigi"></canvas>';
                        contentArea.innerHTML = icerikHTML;
                        projeKarlilikGrafiğiniOlustur(data.veriler);
                    } else {
                        icerikHTML += '<table><thead><tr>';
                        Object.keys(data.veriler[0]).forEach(key => icerikHTML += `<th>${key}</th>`);
                        icerikHTML += '</tr></thead><tbody>';
                        data.veriler.forEach(veri => {
                            icerikHTML += '<tr>';
                            Object.values(veri).forEach(val => icerikHTML += `<td>${val}</td>`);
                            icerikHTML += '</tr>';
                        });
                        icerikHTML += '</tbody></table>';
                        contentArea.innerHTML = icerikHTML;
                    }
                } else if (data.hata) {
                    icerikHTML = `<p class="hata">${data.hata}</p>`;
                } else {
                    icerikHTML = "<p>Gösterilecek veri bulunamadı.</p>";
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

        const ctx = document.getElementById('projeKarlilikGrafigi').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: projeAdi,
                datasets: [{
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
                }]
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
