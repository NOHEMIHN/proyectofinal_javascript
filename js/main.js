document.addEventListener('DOMContentLoaded', () => {
    const noticiasContainer = document.getElementById('news-container');

    fetch('js/noticias.json')
        .then(response => response.json())
        .then(data => {
            const noticias = data.noticias;
            noticias.forEach(noticia => {
                const noticiaElement = document.createElement('div');
                noticiaElement.classList.add('noticia');

                noticiaElement.innerHTML = `
                    <h3>${noticia.titulo}</h3>
                    <p><em>${noticia.fecha}</em></p>
                    <p>${noticia.descripcion}</p>
                    <img src="${noticia.imagen}" alt="${noticia.titulo}" />
                `;
                noticiasContainer.appendChild(noticiaElement);
            });
        })
        //.catch(error => console.error('Error cargando las noticias:', error));
});
