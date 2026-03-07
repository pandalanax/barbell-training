// Theme definitions for Barbell Training app
const THEMES = {
  'dark-blue': {
    name: 'Dark Blue',
    colors: {
      '--bg': '#1a1a2e',
      '--card-bg': '#16213e',
      '--card-bg-active': '#0f3460',
      '--text-primary': '#eee',
      '--text-secondary': '#888',
      '--accent': '#e94560',
      '--accent-hover': '#ff6b6b',
      '--border': '#0f3460',
      '--chart-squat': '#e94560',
      '--chart-press': '#4ecdc4',
      '--chart-deadlift': '#ffe66d'
    }
  },
  'black-white': {
    name: 'Black & White',
    colors: {
      '--bg': '#000000',
      '--card-bg': '#111111',
      '--card-bg-active': '#222222',
      '--text-primary': '#ffffff',
      '--text-secondary': '#888888',
      '--accent': '#ffffff',
      '--accent-hover': '#cccccc',
      '--border': '#333333',
      '--chart-squat': '#ffffff',
      '--chart-press': '#aaaaaa',
      '--chart-deadlift': '#666666'
    }
  },
  'everforest': {
    name: 'Everforest',
    colors: {
      '--bg': '#2d353b',
      '--card-bg': '#343f44',
      '--card-bg-active': '#3d484d',
      '--text-primary': '#d3c6aa',
      '--text-secondary': '#859289',
      '--accent': '#a7c080',
      '--accent-hover': '#83c092',
      '--border': '#475258',
      '--chart-squat': '#a7c080',
      '--chart-press': '#7fbbb3',
      '--chart-deadlift': '#dbbc7f'
    }
  },
  'pastel': {
    name: 'Pastel',
    colors: {
      '--bg': '#fef6e4',
      '--card-bg': '#f3d2c1',
      '--card-bg-active': '#f582ae',
      '--text-primary': '#001858',
      '--text-secondary': '#656565',
      '--accent': '#f582ae',
      '--accent-hover': '#ff85b3',
      '--border': '#e8c4b8',
      '--chart-squat': '#f582ae',
      '--chart-press': '#8bd3dd',
      '--chart-deadlift': '#ffc6c7'
    }
  },
  'dracula': {
    name: 'Dracula',
    colors: {
      '--bg': '#282a36',
      '--card-bg': '#44475a',
      '--card-bg-active': '#6272a4',
      '--text-primary': '#f8f8f2',
      '--text-secondary': '#6272a4',
      '--accent': '#ff79c6',
      '--accent-hover': '#ff92d0',
      '--border': '#6272a4',
      '--chart-squat': '#ff79c6',
      '--chart-press': '#8be9fd',
      '--chart-deadlift': '#f1fa8c'
    }
  },
  'nord': {
    name: 'Nord',
    colors: {
      '--bg': '#2e3440',
      '--card-bg': '#3b4252',
      '--card-bg-active': '#434c5e',
      '--text-primary': '#eceff4',
      '--text-secondary': '#7b88a1',
      '--accent': '#88c0d0',
      '--accent-hover': '#8fbcbb',
      '--border': '#4c566a',
      '--chart-squat': '#88c0d0',
      '--chart-press': '#a3be8c',
      '--chart-deadlift': '#ebcb8b'
    }
  },
  'solarized': {
    name: 'Solarized Dark',
    colors: {
      '--bg': '#002b36',
      '--card-bg': '#073642',
      '--card-bg-active': '#094959',
      '--text-primary': '#fdf6e3',
      '--text-secondary': '#839496',
      '--accent': '#b58900',
      '--accent-hover': '#cb4b16',
      '--border': '#094959',
      '--chart-squat': '#b58900',
      '--chart-press': '#268bd2',
      '--chart-deadlift': '#859900'
    }
  },
  'gruvbox': {
    name: 'Gruvbox',
    colors: {
      '--bg': '#282828',
      '--card-bg': '#3c3836',
      '--card-bg-active': '#504945',
      '--text-primary': '#ebdbb2',
      '--text-secondary': '#a89984',
      '--accent': '#fe8019',
      '--accent-hover': '#fabd2f',
      '--border': '#504945',
      '--chart-squat': '#fe8019',
      '--chart-press': '#83a598',
      '--chart-deadlift': '#fabd2f'
    }
  }
};

function applyTheme(themeId) {
  const theme = THEMES[themeId] || THEMES['dark-blue'];
  const root = document.documentElement;
  
  Object.entries(theme.colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Store in localStorage for immediate access on page load
  localStorage.setItem('barbell-theme', themeId);
}

function loadTheme() {
  // First try localStorage for instant load, then settings will override if different
  const savedTheme = localStorage.getItem('barbell-theme') || 'dark-blue';
  applyTheme(savedTheme);
}

// Apply theme immediately on script load to prevent flash
loadTheme();
