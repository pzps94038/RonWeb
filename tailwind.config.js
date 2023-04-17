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
        banner: "url('./assets/images/banner-bg.png')",
      },
      fontFamily: {
        'open-sans': [
          'Open Sans',
          'Noto Sans CJK TC',
          'Microsoft JhengHei',
          'PingFang',
          'STHeiti',
          'sans-serif',
        ],
      },
      animation: {
        textRgb: 'textRgb 3s infinite linear',
      },
      keyframes: {
        textRgb: {
          '100%, 0%': { color: 'rgb(255,0,0)' },
          '8%': { color: 'rgb(255,127,0)' },
          '16%': { color: 'rgb(255,255,0)' },
          '25%': { color: 'rgb(127,255,0)' },
          '33%': { color: 'rgb(0,255,0)' },
          '41%': { color: 'rgb(0,255,127)' },
          '50%': { color: 'rgb(0,255,255)' },
          '58%': { color: 'rgb(0,127,255)' },
          '66%': { color: 'rgb(0,0,255)' },
          '75%': { color: 'rgb(127,0,255)' },
          '83%': { color: 'rgb(255,0,255)' },
          '91%': { color: 'rgb(255,0,127)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
