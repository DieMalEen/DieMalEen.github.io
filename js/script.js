const toggleBtn = document.getElementById('toggleTheme');
const themeSelector = document.getElementById('themeSelector');
const circles = document.querySelectorAll('.theme-circle');
const slider = document.getElementById('colorSlider');
const sliderContainer = document.getElementById('sliderContainer');
const changeHueCheckbox = document.getElementById('changeHueCheckbox');
const body = document.body;

// Load partials function
async function loadPartials() {
  try {
    // Determine if we're in a subdirectory
    const isInPages = window.location.pathname.includes('/pages/');
    const pathPrefix = isInPages ? '../' : '';
    
    // Load header
    const headerResponse = await fetch(`${pathPrefix}partials/header.html`);
    const headerHTML = await headerResponse.text();
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    
    // Fix navigation links based on current location
    const homeLink = document.querySelector('.home-link');
    const testLink = document.querySelector('.test-link');
    const cvLink = document.querySelector('.cv-link');
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    if (isInPages) {
      if (homeLink) homeLink.href = '../index.html';
      if (testLink) testLink.href = 'test.html';
      if (cvLink) cvLink.href = '../CV/Vaughn_du_Preez_CV.pdf';
    } else {
      if (homeLink) homeLink.href = 'index.html';
      if (testLink) testLink.href = 'pages/test.html';
      if (cvLink) cvLink.href = 'CV/Vaughn_du_Preez_CV.pdf';
    }
    
    // Add active page highlighting
    setActiveNavLink();
    
    // Load footer
    const footerResponse = await fetch(`${pathPrefix}partials/footer.html`);
    const footerHTML = await footerResponse.text();
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
    
    // Fix footer links
    const footerHomeLinks = document.querySelectorAll('.footer-links a[href*="index.html"]');
    const footerTestLinks = document.querySelectorAll('.footer-links a[href*="test.html"]');
    const footerCvLinks = document.querySelectorAll('.footer-links a[href*="CV.pdf"]');
    const footerAboutLinks = document.querySelectorAll('.footer-links a[href*="about.html"]');
    const footerExperienceLinks = document.querySelectorAll('.footer-links a[href*="experience.html"]');
    
    footerHomeLinks.forEach(link => {
      link.href = isInPages ? '../index.html' : 'index.html';
    });
    
    footerTestLinks.forEach(link => {
      link.href = isInPages ? 'test.html' : 'pages/test.html';
    });
    
    footerCvLinks.forEach(link => {
      link.href = isInPages ? '../CV/Vaughn_du_Preez_CV.pdf' : 'CV/Vaughn_du_Preez_CV.pdf';
    });
    
    footerAboutLinks.forEach(link => {
      link.href = isInPages ? 'about.html' : 'pages/about.html';
    });
    
    footerExperienceLinks.forEach(link => {
      link.href = isInPages ? 'experience.html' : 'pages/experience.html';
    });
    
    // Re-initialize elements after loading partials
    initializeElements();
  } catch (error) {
    console.log('Partials not found, using inline elements');
    initializeElements();
  }
}

// Function to set active navigation link based on current page
function setActiveNavLink() {
  // Get current page path
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  // Remove any existing active classes
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Determine which link should be active based on current page
  let activeSelector = '';
  
  if (currentPage === 'index.html' || currentPath === '/' || currentPath.endsWith('/')) {
    activeSelector = '.home-link';
  } else if (currentPage === 'about.html') {
    activeSelector = '.about-link';
  } else if (currentPage === 'experience.html') {
    activeSelector = '.experience-link';
  } else if (currentPage === 'test.html') {
    activeSelector = '.test-link';
  }
  
  // Add active class to the appropriate link
  if (activeSelector) {
    const activeLink = document.querySelector(activeSelector);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

// Parallax and scroll animation functions
function initScrollAnimations() {
  // Intersection Observer for scroll reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Add special animation for skill tags
        if (entry.target.classList.contains('skill-tag')) {
          setTimeout(() => {
            entry.target.classList.add('animate');
            setTimeout(() => {
              entry.target.classList.remove('animate');
            }, 600);
          }, Math.random() * 300);
        }
      }
    });
  }, observerOptions);

  // Observe all scroll reveal elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .timeline-item, .skill-tag').forEach(el => {
    observer.observe(el);
  });
}

function initParallaxEffects() {
  const shapes = document.querySelectorAll('.shape');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    shapes.forEach((shape, index) => {
      const speed = 0.2 + (index * 0.1);
      const yPos = -(scrolled * speed);
      shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    // Parallax effect for floating shapes background
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
      parallaxBg.style.transform = `translate3d(0, ${parallax}px, 0)`;
    }
  });
}

function addHoverEffectsToSkillTags() {
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.classList.add('animate');
    });
    
    tag.addEventListener('animationend', () => {
      tag.classList.remove('animate');
    });
  });
}

// Initialize elements (after partials are loaded or if they fail)
function initializeElements() {
  // Re-get elements that may have been loaded from partials
  const toggleBtn = document.getElementById('toggleTheme');
  const themeSelector = document.getElementById('themeSelector');
  const circles = document.querySelectorAll('.theme-circle');
  const slider = document.getElementById('colorSlider');
  const sliderContainer = document.getElementById('sliderContainer');
  const changeHueCheckbox = document.getElementById('changeHueCheckbox');
  
  console.log('Initializing elements:', {
    toggleBtn: !!toggleBtn,
    themeSelector: !!themeSelector,
    circles: circles.length,
    slider: !!slider,
    changeHueCheckbox: !!changeHueCheckbox
  });
  
  if (toggleBtn && themeSelector && circles.length > 0) {
    setupEventListeners(toggleBtn, themeSelector, circles, slider, sliderContainer, changeHueCheckbox);
  } else {
    console.error('Some elements not found after loading partials');
  }
}

// Store hue values per theme
const themeHues = {
  'pastel-custom': 180, // Default to blue for pastel-custom
  'dark-custom': 120,  // Default to green for dark-custom
  'pixel': 280,        // Default to purple for pixel theme
  'professional': 0    // No hue for professional theme
};

let currentTheme = 'professional';
let isDarkMode = false; // Track dark mode state for professional theme

// Load saved theme settings from localStorage
function loadThemeSettings() {
  const savedTheme = localStorage.getItem('currentTheme');
  const savedHues = localStorage.getItem('themeHues');
  const savedDarkMode = localStorage.getItem('isDarkMode');
  
  if (savedTheme) {
    currentTheme = savedTheme;
  }
  
  if (savedHues) {
    const parsedHues = JSON.parse(savedHues);
    Object.assign(themeHues, parsedHues);
  }
  
  if (savedDarkMode) {
    isDarkMode = JSON.parse(savedDarkMode);
  }
  
  console.log('Loaded theme settings:', { currentTheme, themeHues, isDarkMode });
}

// Save theme settings to localStorage
function saveThemeSettings() {
  localStorage.setItem('currentTheme', currentTheme);
  localStorage.setItem('themeHues', JSON.stringify(themeHues));
  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  console.log('Saved theme settings:', { currentTheme, themeHues, isDarkMode });
}

// Initialize the page state
document.addEventListener('DOMContentLoaded', async () => {
  // Load saved theme settings first
  loadThemeSettings();
  
  // Apply the saved theme to the body
  const actualTheme = (currentTheme === 'professional' && isDarkMode) ? 'professional-dark' : currentTheme;
  body.className = `theme-${actualTheme}`;
  
  // Load partials
  await loadPartials();
  
  // Set initial theme colors based on saved settings
  updateThemeColors(actualTheme, themeHues[currentTheme]);
  
  // Update all theme circle colors to reflect their saved hues
  updateAllThemeCircles();
  
  // Show appropriate controls based on current theme
  const hueControls = document.querySelector('.hue-controls');
  const professionalControls = document.querySelector('.professional-controls');
  
  if (hueControls && professionalControls) {
    if (currentTheme === 'pixel') {
      hueControls.style.display = 'none';
      professionalControls.classList.add('hidden');
    } else if (currentTheme === 'professional') {
      hueControls.style.display = 'none';
      professionalControls.classList.remove('hidden');
      
      // Set initial dark mode button state
      const darkModeToggle = document.getElementById('darkModeToggle');
      if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('.dark-mode-icon');
        const textNode = darkModeToggle.childNodes[darkModeToggle.childNodes.length - 1];
        if (isDarkMode) {
          icon.textContent = '☀️';
          textNode.textContent = ' Light Mode';
        } else {
          icon.textContent = '🌙';
          textNode.textContent = ' Dark Mode';
        }
      }
    } else {
      hueControls.style.display = 'flex';
      professionalControls.classList.add('hidden');
    }
  }
  
  console.log('Page initialized with theme:', currentTheme);
  
  // Initialize scroll animations and parallax effects
  initScrollAnimations();
  initParallaxEffects();
  addHoverEffectsToSkillTags();
});

// Setup event listeners
function setupEventListeners(toggleBtn, themeSelector, circles, slider, sliderContainer, changeHueCheckbox) {
  console.log('Setting up event listeners');
  
  // Ensure everything starts hidden
  if (themeSelector) themeSelector.classList.add('hidden');
  if (sliderContainer) sliderContainer.classList.add('hidden');
  
  // Toggle visibility of theme selector only
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Theme button clicked!'); // Debug log
      
      if (themeSelector.classList.contains('hidden')) {
        console.log('Showing theme selector');
        themeSelector.classList.remove('hidden');
        if (sliderContainer) sliderContainer.classList.add('hidden');
        if (changeHueCheckbox) changeHueCheckbox.checked = false;
      } else {
        console.log('Hiding theme selector');
        themeSelector.classList.add('hidden');
        if (sliderContainer) sliderContainer.classList.add('hidden');
      }
    });
    console.log('Toggle button event listener attached');
  }
  
  // Checkbox to toggle hue slider
  if (changeHueCheckbox) {
    changeHueCheckbox.addEventListener('change', () => {
      console.log('Checkbox changed:', changeHueCheckbox.checked);
      if (changeHueCheckbox.checked) {
        if (sliderContainer) sliderContainer.classList.remove('hidden');
        if (slider) slider.value = themeHues[currentTheme];
      } else {
        if (sliderContainer) sliderContainer.classList.add('hidden');
      }
    });
  }
  
  // Switch theme on circle click
  circles.forEach(circle => {
    circle.addEventListener('click', () => {
      const theme = circle.getAttribute('data-theme');
      currentTheme = theme;
      
      // Reset dark mode when switching themes
      if (theme !== 'professional') {
        isDarkMode = true;
      }
      
      // Apply the correct theme class
      const actualTheme = (theme === 'professional' && isDarkMode) ? 'professional-dark' : theme;
      body.className = `theme-${actualTheme}`;
      
      saveThemeSettings();
      updateThemeColors(actualTheme, themeHues[theme] || 0);
      updateAllThemeCircles();
      
      // Show/hide appropriate controls
      const hueControls = document.querySelector('.hue-controls');
      const professionalControls = document.querySelector('.professional-controls');
      
      if (hueControls && professionalControls) {
        if (theme === 'pixel') {
          hueControls.style.display = 'none';
          professionalControls.classList.add('hidden');
        } else if (theme === 'professional') {
          hueControls.style.display = 'none';
          professionalControls.classList.remove('hidden');
          
          // Update dark mode button state
          const darkModeToggle = document.getElementById('darkModeToggle');
          if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('.dark-mode-icon');
            const textNode = darkModeToggle.childNodes[darkModeToggle.childNodes.length - 1];
            if (isDarkMode) {
              icon.textContent = '☀️';
              textNode.textContent = ' Light Mode';
            } else {
              icon.textContent = '🌙';
              textNode.textContent = ' Dark Mode';
            }
          }
        } else {
          hueControls.style.display = 'flex';
          professionalControls.classList.add('hidden');
        }
      }
      
      // Update slider value if visible
      if (slider && sliderContainer && !sliderContainer.classList.contains('hidden')) {
        slider.value = themeHues[theme] || 0;
      }
    });
  });
  
  // Adjust color hue for current theme only
  if (slider) {
    slider.addEventListener('input', () => {
      const hue = slider.value;
      themeHues[currentTheme] = hue;
      saveThemeSettings();
      updateThemeColors(currentTheme, hue);
      updateAllThemeCircles();
    });
  }
  
  // Dark mode toggle for professional theme
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      if (currentTheme === 'professional') {
        isDarkMode = !isDarkMode;
        const actualTheme = isDarkMode ? 'professional-dark' : 'professional';
        body.className = `theme-${actualTheme}`;
        
        // Update button text and icon
        const icon = darkModeToggle.querySelector('.dark-mode-icon');
        const textNode = darkModeToggle.childNodes[darkModeToggle.childNodes.length - 1];
        if (isDarkMode) {
          icon.textContent = '☀️';
          textNode.textContent = ' Light Mode';
        } else {
          icon.textContent = '🌙';
          textNode.textContent = ' Dark Mode';
        }
        
        updateThemeColors(actualTheme, 0);
        updateAllThemeCircles();
        saveThemeSettings();
      }
    });
  }
}

// Function to update all theme circle colors
function updateAllThemeCircles() {
  const circles = document.querySelectorAll('.theme-circle'); // Re-query each time
  circles.forEach(circle => {
    const theme = circle.getAttribute('data-theme');
    const hue = themeHues[theme];
    
    if (theme === 'pastel-custom') {
      circle.style.backgroundColor = `hsl(${hue}, 80%, 90%)`;
    } else if (theme === 'dark-custom') {
      // Keep dark circle black but update border color
      circle.style.backgroundColor = '#000';
      circle.style.borderColor = `hsl(${hue}, 100%, 50%)`;
    } else if (theme === 'professional') {
      // Professional theme circle reflects current light/dark mode state
      if (isDarkMode) {
        circle.style.backgroundColor = '#333';
        circle.style.borderColor = '#666';
      } else {
        circle.style.backgroundColor = '#fff';
        circle.style.borderColor = '#333';
      }
    }
  });
}

// Function to update theme colors based on theme and hue
function updateThemeColors(theme, hue) {
  document.documentElement.style.setProperty('--primary-hue', hue);
  
  if (theme === 'pastel-custom') {
    // Update pastel theme CSS variables
    document.documentElement.style.setProperty('--card-bg', `hsl(${hue}, 80%, 90%)`);
    document.documentElement.style.setProperty('--border-color', `hsl(${hue}, 60%, 70%)`);
    // Set background with desaturated theme color
    const backgroundColor = `hsl(${hue}, 100%, 95%)`; // Very desaturated theme color
    document.body.style.setProperty('background', backgroundColor, 'important');
    document.body.style.minHeight = '100vh';

  } else if (theme === 'dark-custom') {
    // Update dark-custom theme border color with !important to override CSS
    const borderColor = `hsl(${hue}, 100%, 50%)`;
    document.documentElement.style.setProperty('--border-color', borderColor, 'important');
    // Set background with desaturated theme color
    const backgroundColor = `hsl(${hue}, 8%, 7%)`; // Desaturated dark theme color
    document.body.style.setProperty('background', backgroundColor, 'important');
    document.body.style.minHeight = '100vh';
    
  } else if (theme === 'pixel') {
    // Pixel theme uses fixed neon colors - no hue customization
    document.documentElement.style.setProperty('--text-color', '#00ff80');
    document.documentElement.style.setProperty('--border-color', '#ff0080');
    document.documentElement.style.setProperty('--card-bg', '#1a1a2e');
    // Keep the dark pixel background from CSS
    document.body.style.setProperty('background', '#0f0f23', 'important');
    document.body.style.minHeight = '100vh';
    document.body.style.color = '#00ff80';

  } else if (theme === 'professional') {
    // Professional light theme
    document.documentElement.style.setProperty('--text-color', '#333333');
    document.documentElement.style.setProperty('--border-color', '#bbbabaff');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.body.style.setProperty('background', '#ffffff', 'important');
    document.body.style.minHeight = '100vh';
    document.body.style.color = '#333333';
    
  } else if (theme === 'professional-dark') {
    // Professional dark theme
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--border-color', '#404040');
    document.documentElement.style.setProperty('--card-bg', '#1a1a1a');
    document.body.style.setProperty('background', '#000000', 'important');
    document.body.style.minHeight = '100vh';
    document.body.style.color = '#ffffff';
  }
}