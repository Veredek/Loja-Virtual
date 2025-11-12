class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('livrexTheme') || 'claro';
        this.init();
    }

    init() {
        
        const header = document.querySelector('header');
        if (!header) {
            console.warn('Header não encontrado. Tema não será aplicado.');
            return;
        }
        
        this.createThemeToggle();
        this.applyTheme(this.currentTheme, false);
        this.bindEvents();
    }

    createThemeToggle() {
       
        if (!document.getElementById('themeToggle')) {
            const header = document.querySelector('header');
            if (!header.querySelector('.theme-toggle-container')) {
                const toggleContainer = document.createElement('div');
                toggleContainer.className = 'theme-toggle-container';
                header.appendChild(toggleContainer);
            }
            
            const themeToggle = document.createElement('button');
            themeToggle.id = 'themeToggle';
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = `
                <span class="theme-icon">🌙</span>
                <span class="theme-text">Tema Escuro</span>
            `;
            
            const toggleContainer = header.querySelector('.theme-toggle-container') || header;
            toggleContainer.appendChild(themeToggle);
        }
        this.themeToggle = document.getElementById('themeToggle');
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
        
        // Remover classe de transição após a animação
        if (withTransition) {
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
        }
    }

    loadDarkTheme() {
        const link = document.createElement('link');
        link.id = 'dark-styles';
        link.rel = 'stylesheet';
        link.href = 'assets/dark.css';
        document.head.appendChild(link);
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

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

setTimeout(() => {
    if (!document.getElementById('themeToggle')) {
        new ThemeManager();
    }
}, 1000);
