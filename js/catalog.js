// Sample comic data - replace with your own comics
const comics = [
    {
        id: 1,
        title: 'Comic Title 1',
        thumbnail: 'assets/thumbnail1.jpg',
        pages: [
            'assets/comic1/page1.mp4',
            'assets/comic1/page2.mp4',
            // Add more pages as needed
        ]
    },
    // Add more comics as needed
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