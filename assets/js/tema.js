class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('livrexTheme') || 'claro';
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.applyTheme(this.currentTheme, false); // false = não aplicar transição na inicialização
        this.bindEvents();
    }

    createThemeToggle() {
        // Verificar se o botão já existe
        if (!document.getElementById('themeToggle')) {
            const header = document.querySelector('header');
            const themeToggle = document.createElement('button');
            themeToggle.id = 'themeToggle';
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = `
                <span class="theme-icon">🌙</span>
                <span class="theme-text">Tema Escuro</span>
            `;
            header.appendChild(themeToggle);
        }
        this.themeToggle = document.getElementById('themeToggle');
    }

    applyTheme(theme, withTransition = true) {
        const darkStylesheet = document.getElementById('dark-styles');
        
        // Aplicar classe de transição apenas se withTransition for true
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
        this.applyTheme(newTheme, true); // true = aplicar transição
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
