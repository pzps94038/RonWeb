module.exports = {
  content: ['./src/**/*.html', './src/**/*.scss', './src/**/*.ts'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
        sans: ['Inter', 'Noto Sans CJK TC', 'Microsoft JhengHei', 'PingFang', 'sans-serif'],
      },
      colors: {
        amber: {
          350: '#fbbf24',
          450: '#f59e0b',
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'slide-in-right': 'slideInRight 0.4s ease-out both',
        glow: 'glow 3s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        float: 'float 6s ease-in-out infinite',
        ember: 'ember 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(245, 158, 11, 0.15)' },
          '50%': { boxShadow: '0 0 24px rgba(245, 158, 11, 0.3)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        ember: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#f59e0b',
          secondary: '#fb923c',
          accent: '#ef4444',
          neutral: '#27272a',
          'base-100': '#18181b',
          'base-200': '#1f1f23',
          'base-300': '#27272a',
          'base-content': '#e4e4e7',
          info: '#38bdf8',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#fb7185',
        },
      },
    ],
  },
};
