// Comics data
const comics = [
    {
        id: 1,
        title: 'Sand',
        thumbnail: 'assets/thumbnails/sand.jpg',
        pages: [
            'assets/comics/Sand/Frame 1.mp4',
            'assets/comics/Sand/Frame 2.mp4'
        ]
    }
];

function createComicCard(comic) {
    const card = document.createElement('div');
    card.className = 'comic-card';
    card.innerHTML = `
        <img src="${comic.thumbnail}" alt="${comic.title}">
        <div class="comic-info">
            <h3>${comic.title}</h3>
        </div>
    `;
    
    card.addEventListener('click', () => {
        // Store the selected comic's data in localStorage
        localStorage.setItem('currentComic', JSON.stringify(comic));
        // Navigate to the viewer page
        window.location.href = 'viewer.html';
    });
    
    return card;
}

function initializeCatalog() {
    const catalogElement = document.getElementById('comic-catalog');
    comics.forEach(comic => {
        catalogElement.appendChild(createComicCard(comic));
    });
}

// Initialize the catalog when the page loads
document.addEventListener('DOMContentLoaded', initializeCatalog);