class ComicViewer {
    constructor() {
        this.currentComic = JSON.parse(localStorage.getItem('currentComic'));
        this.currentPageIndex = 0;
        this.isPlaying = false;
        this.isFirstPage = true;
        
        // Elementos do DOM
        this.videoPlayer = document.getElementById('video-player');
        this.prevButton = document.getElementById('prev-page');
        this.nextButton = document.getElementById('next-page');
        this.playPauseButton = document.getElementById('play-pause');
        this.currentPageSpan = document.getElementById('current-page');
        this.totalPagesSpan = document.getElementById('total-pages');
        
        // Event listeners para o vídeo
        this.videoPlayer.addEventListener('error', (e) => {
            console.error('Erro no vídeo:', e.target.error);
        });
        
        this.videoPlayer.addEventListener('loadeddata', () => {
            console.log('Vídeo carregado com sucesso');
            this.updatePlayPauseButton();

            // Se não for a primeira página, reproduz automaticamente
            if (!this.isFirstPage) {
                this.videoPlayer.play();
            }
        });

        this.videoPlayer.addEventListener('ended', () => {
            console.log('Vídeo terminou');
            this.isPlaying = false;
            this.updatePlayPauseButton();
            
            // Manter o último frame
            if (this.videoPlayer.duration > 0) {
                this.videoPlayer.currentTime = this.videoPlayer.duration;
            }

            // Forçar opacidade total
            this.videoPlayer.style.opacity = '1';
            this.videoPlayer.style.filter = 'none';
            this.videoPlayer.style.webkitFilter = 'none';
        });
        
        this.videoPlayer.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayPauseButton();
        });
        
        this.videoPlayer.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayPauseButton();
        });
        
        this.initializeViewer();
    }
    
    initializeViewer() {
        if (!this.currentComic) {
            window.location.href = 'index.html';
            return;
        }
        
        // Configurar contadores de página
        this.totalPagesSpan.textContent = this.currentComic.pages.length;
        this.updateCurrentPage();
        
        // Configurar event listeners
        this.prevButton.addEventListener('click', () => this.previousPage());
        this.nextButton.addEventListener('click', () => this.nextPage());
        this.playPauseButton.addEventListener('click', () => this.togglePlayPause());
        
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousPage();
            if (e.key === 'ArrowRight') this.nextPage();
            if (e.key === ' ') {
                e.preventDefault();
                this.togglePlayPause();
            }
        });
        
        // Carregar primeira página
        this.loadCurrentPage();
        this.preloadNextPage();
    }
    
    loadCurrentPage() {
        const videoPath = this.currentComic.pages[this.currentPageIndex];
        console.log('Carregando vídeo:', videoPath);
        
        // Reset video properties
        this.videoPlayer.pause();
        if (this.isFirstPage) {
            this.videoPlayer.currentTime = 0;
        } else {
            // Para outros vídeos, comece do início e reproduza automaticamente
            this.videoPlayer.currentTime = 0;
        }
        
        this.videoPlayer.src = videoPath;
        
        // Update UI
        this.updateCurrentPage();
        this.updateControls();
        
        // Add event listeners for debugging
        this.videoPlayer.addEventListener('loadedmetadata', () => {
            console.log('Metadados do vídeo carregados:', {
                duration: this.videoPlayer.duration,
                width: this.videoPlayer.videoWidth,
                height: this.videoPlayer.videoHeight
            });
        });

        this.videoPlayer.addEventListener('playing', () => {
            console.log('Vídeo começou a reproduzir');
        });
        
        // Update button states
        this.prevButton.disabled = this.currentPageIndex === 0;
        this.nextButton.disabled = this.currentPageIndex === this.currentComic.pages.length - 1;
    }
    
    preloadNextPage() {
        if (this.currentPageIndex < this.currentComic.pages.length - 1) {
            const nextVideo = document.createElement('video');
            nextVideo.src = this.currentComic.pages[this.currentPageIndex + 1];
            nextVideo.preload = 'auto';
            this._preloadedVideo = nextVideo;
        }
    }
    
    togglePlayPause() {
        if (this.videoPlayer.paused) {
            this.videoPlayer.play();
        } else {
            this.videoPlayer.pause();
        }
    }
    
    updatePlayPauseButton() {
        this.playPauseButton.textContent = this.isPlaying ? 'Pausar' : 'Reproduzir';
    }
    
    updateCurrentPage() {
        this.currentPageSpan.textContent = this.currentPageIndex + 1;
    }
    
    updateControls() {
        this.prevButton.disabled = this.currentPageIndex === 0;
        this.nextButton.disabled = this.currentPageIndex === this.currentComic.pages.length - 1;
    }
    
    previousPage() {
        if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            this.isFirstPage = (this.currentPageIndex === 0);
            this.loadCurrentPage();
            this.preloadNextPage();
        }
    }
    
    nextPage() {
        if (this.currentPageIndex < this.currentComic.pages.length - 1) {
            this.currentPageIndex++;
            this.isFirstPage = false;
            this.loadCurrentPage();
            this.preloadNextPage();
        }
    }
    
    togglePlayPause() {
        if (this.videoPlayer.paused) {
            this.videoPlayer.play();
            if (this.isFirstPage) {
                this.isFirstPage = false;
            }
        } else {
            this.videoPlayer.pause();
        }
    }
}

// Initialize the viewer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ComicViewer();
});