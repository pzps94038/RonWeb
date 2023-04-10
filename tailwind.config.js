module.exports = {
  content: ['./src/**/*.html', './src/**/*.scss'],
  theme: {
    fontFamily: {
      primary: 'Orbitron',
      secondary: 'Rajdhani',
      tertiary: 'Aldrich',
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#0a0a0a',
        accent: '#B809C3',
      },
      // 設定圖片背景 使用bg-site
      backgroundImage: {
        site: "url('./assets/images/site-bg.jpg')",
        about: "url('./assets/images/about.png')",
        services: "url('./assets/images/services.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
