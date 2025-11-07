class ComicViewer {
    constructor() {
        this.currentComic = JSON.parse(localStorage.getItem('currentComic'));
        this.currentPageIndex = 0;
        this.videoPlayer = document.getElementById('video-player');
        this.prevButton = document.getElementById('prev-page');
        this.nextButton = document.getElementById('next-page'); // Corrigido de next-button para next-page
        
        // Adicionar event listeners para debug
        this.videoPlayer.addEventListener('error', (e) => {
            console.error('Erro no vídeo:', e.target.error);
        });
        
        this.videoPlayer.addEventListener('loadeddata', () => {
            console.log('Vídeo carregado com sucesso');
        });
        
        this.initializeViewer();
    }
    
    initializeViewer() {
        if (!this.currentComic) {
            window.location.href = 'index.html';
            return;
        }
        
        // Set up event listeners
        this.prevButton.addEventListener('click', () => this.previousPage());
        this.nextButton.addEventListener('click', () => this.nextPage());
        
        // Add click on video for next page
        this.videoPlayer.addEventListener('click', () => this.nextPage());
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousPage();
            if (e.key === 'ArrowRight') this.nextPage();
        });
        
        // Load first page
        this.loadCurrentPage();
        
        // Preload next page
        this.preloadNextPage();
    }
    
    loadCurrentPage() {
        const videoPath = this.currentComic.pages[this.currentPageIndex];
        console.log('Carregando vídeo:', videoPath);
        
        this.videoPlayer.src = videoPath;
        
        // Tentar reproduzir o vídeo
        this.videoPlayer.play().catch(error => {
            console.error('Erro ao reproduzir o vídeo:', error);
        });
        
        // Update button states
        this.prevButton.disabled = this.currentPageIndex === 0;
        this.nextButton.disabled = this.currentPageIndex === this.currentComic.pages.length - 1;
    }
    
    preloadNextPage() {
        if (this.currentPageIndex < this.currentComic.pages.length - 1) {
            const nextVideo = new Video();
            nextVideo.src = this.currentComic.pages[this.currentPageIndex + 1];
            nextVideo.preload = 'auto';
        }
    }
    
    previousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            this.loadCurrentPage();
            this.preloadNextPage();
        }
    }
    
    nextPage() {
        if (this.currentPageIndex < this.currentComic.pages.length - 1) {
            this.currentPageIndex++;
            this.loadCurrentPage();
            this.preloadNextPage();
        }
    }
}

// Initialize the viewer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ComicViewer();
});