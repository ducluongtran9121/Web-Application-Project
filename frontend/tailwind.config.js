module.exports = {
  purge: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        base: {
          default: '#eff4f6ff',
          secondary: '#e8f0f2ff',
        },
        accent: {
          default: '#006dccff',
          secondary: '#006dcce6',
          ternary: '#006dcccc',
          darker: '#005299ff',
        },
      },
      backgroundColor: {
        card: {
          default: '#ffffffb3',
        },
        'scroll-bar': {
          default: '#7f7f7f',
          secondary: '#8c8c8cff',
          ternary: '#999999ff',
        },
      },
      borderColor: {
        default: '#00000015',
        accent: '#006dcce6',
      },
      textColor: {
        default: '#000000ff',
        inverse: '#ffffffff',
      },
      minWidth: {
        40: '10rem',
      },
      maxWidth: {
        140: '35rem',
        screen: '100vw',
      },
      fontSize: {
        '4.5xl': '2.5rem',
      },
      gridTemplateRows: {
        '2-bottom-auto': '1fr auto'
      },
      gridTemplateColumns: {
        '2-left-auto': 'auto 1fr'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
      ringWidth: ['focus-visible'],
      ringColor: ['focus-visible'],
    },
  },
  plugins: [],
}
