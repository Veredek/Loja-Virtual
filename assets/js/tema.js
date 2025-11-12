class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('livrexTheme') || 'claro';
        this.maxAttempts = 3;
        this.attemptCount = 0;
        this.init();
    }

    init() {
        this.tryCreateToggle();
        
        if (!document.getElementById('themeToggle')) {
            document.addEventListener('DOMContentLoaded', () => {
                this.tryCreateToggle();
            });
        }
        
        setTimeout(() => {
            if (!document.getElementById('themeToggle') && this.attemptCount < this.maxAttempts) {
                this.tryCreateToggle();
            }
        }, 1000);
    }

    tryCreateToggle() {
        this.attemptCount++;
        
        const header = document.querySelector('header');
        if (!header) return false;

        if (document.getElementById('themeToggle')) return true;

        try {
            const themeToggle = document.createElement('button');
            themeToggle.id = 'themeToggle';
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = `
                <span class="theme-icon">🌙</span>
                <span class="theme-text">Tema Escuro</span>
            `;
            
            header.appendChild(themeToggle);
            this.themeToggle = themeToggle;
            
            this.applyTheme(this.currentTheme, false);
            this.bindEvents();
            
            return true;
        } catch (error) {
            return false;
        }
    }

    applyTheme(theme, withTransition = true) {
        const darkStylesheet = document.getElementById('dark-styles');
        
        if (withTransition) {
            document.body.classList.add('theme-transition');
        }
        
        if (theme === 'escuro') {
            if (!darkStylesheet) {
                this.loadDarkTheme();
            } else {
                darkStylesheet.disabled = false;
            }
            this.updateToggleButton('escuro');
        } else {
            if (darkStylesheet) {
                darkStylesheet.disabled = true;
            }
            this.updateToggleButton('claro');
        }
        
        localStorage.setItem('livrexTheme', theme);
        this.currentTheme = theme;
        
        if (withTransition) {
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
        }
    }

    loadDarkTheme() {
        try {
            const link = document.createElement('link');
            link.id = 'dark-styles';
            link.rel = 'stylesheet';
            link.href = 'assets/dark.css';
            document.head.appendChild(link);
        } catch (error) {
            // Silencioso em caso de erro
        }
    }

    updateToggleButton(theme) {
        if (!this.themeToggle) return;
        
        const themeIcon = this.themeToggle.querySelector('.theme-icon');
        const themeText = this.themeToggle.querySelector('.theme-text');
        
        if (theme === 'escuro') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Tema Claro';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Tema Escuro';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'claro' ? 'escuro' : 'claro';
        this.applyTheme(newTheme, true);
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Inicializar o sistema de tema
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
