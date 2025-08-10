function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// MUI-inspired color palette
const PRIMARY = {
  lighter: '#8cd6ff',
  light: '#6acaff',
  main: '#2099e2',
  dark: '#006bb0',
  darker: '#005a94',
};

const SECONDARY = {
  lighter: '#acc2d8',
  light: '#92a7bc',
  main: '#64788c',
  dark: '#384c5f',
  darker: '#283846',
};

const INFO = {
  lighter: '#8cd6ff',
  light: '#6acaff',
  main: '#2099e2',
  dark: '#006bb0',
  darker: '#005a94',
};

const SUCCESS = {
  lighter: '#d8ffd0',
  light: '#caffbf',
  main: '#98ce8e',
  dark: '#689d60',
  darker: '#5a8953',
};

const WARNING = {
  lighter: '#fdfa9d',
  light: '#fffb85',
  main: '#e8c854',
  dark: '#b39821',
  darker: '#9c8a3a',
};

const ERROR = {
  lighter: '#fd9d8d',
  light: '#ff736e',
  main: '#ff736e',
  dark: '#c74243',
  darker: '#b32727',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161c25',
};

// Gradients
const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  secondary: createGradient(SECONDARY.light, SECONDARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const plugin = require('tailwindcss/plugin');

const pxToRem = (px) => `${px / 16}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'html[class~="dark"]'],
  content: [
    "./layouts/**/*.{html,js}",
    "./content/**/*.{md,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: ['Regular', 'sans-serif'],
        light: ['Light', 'sans-serif'],
        bold: ['Bold', 'sans-serif'],
        semiBold: ['SemiBold', 'sans-serif'],
        extraLight: ['ExtraLight', 'sans-serif'],
        italic: ['Italic', 'sans-serif'],
      },
      fontWeight: {
        regular: 400,
        medium: 600,
        bold: 700,
      },
      fontSize: {
        title: pxToRem(80),
        h1: pxToRem(40),
        h2: pxToRem(32),
        h3: pxToRem(25),
        h4: pxToRem(20),
        h5: pxToRem(18),
        h6: pxToRem(17),
        subtitle1: pxToRem(16),
        subtitle2: pxToRem(14),
        body1: pxToRem(16),
        body2: pxToRem(14),
        caption: pxToRem(12),
        button: pxToRem(14),
        button1: pxToRem(18),
      },
      lineHeight: {
        h1: 80 / 64,
        h2: 64 / 48,
        h3: 1.5,
        h4: 1.5,
        h5: 1.5,
        h6: 28 / 18,
        subtitle1: 1.5,
        subtitle2: 22 / 14,
        body1: 1.5,
        body2: 22 / 14,
        caption: 1.5,
        button: 24 / 14,
        overline: 1.5,
      },
      letterSpacing: {
        h1: '2px',
        normal: 'normal',
      },
      textTransform: {
        overline: 'uppercase',
        button: 'capitalize',
      },
      colors: {
        primary: PRIMARY,
        secondary: SECONDARY,
        info: INFO,
        success: SUCCESS,
        warning: WARNING,
        error: ERROR,
        grey: GREY,
        dark: {
          100: '#222831',
          200: '#393E46',
          300: '#2c343f',
          400: '#1e242d',
        },
      },
      backgroundImage: {
        'gradient-primary': GRADIENTS.primary,
        'gradient-secondary': GRADIENTS.secondary,
        'gradient-info': GRADIENTS.info,
        'gradient-success': GRADIENTS.success,
        'gradient-warning': GRADIENTS.warning,
        'gradient-error': GRADIENTS.error,
      },
    },
  },
  plugins: [
    // Add responsive typography utilities if needed
    plugin(function ({ addUtilities, theme }) {
      const responsiveFonts = {
        '.responsive-h1': {
          fontSize: theme('fontSize.h1'),
          lineHeight: theme('lineHeight.h1'),
          '@screen sm': { fontSize: pxToRem(52) },
          '@screen md': { fontSize: pxToRem(58) },
          '@screen lg': { fontSize: pxToRem(64) },
        },
        '.responsive-h2': {
          fontSize: theme('fontSize.h2'),
          lineHeight: theme('lineHeight.h2'),
          '@screen sm': { fontSize: pxToRem(40) },
          '@screen md': { fontSize: pxToRem(44) },
          '@screen lg': { fontSize: pxToRem(48) },
        },
        '.responsive-h3': {
          fontSize: theme('fontSize.h3'),
          lineHeight: theme('lineHeight.h3'),
          '@screen sm': { fontSize: pxToRem(26) },
          '@screen md': { fontSize: pxToRem(30) },
          '@screen lg': { fontSize: pxToRem(32) },
        },
      };

      addUtilities(responsiveFonts, ['responsive']);
    }),

    plugin(function ({ addUtilities }) {
      const utilities = {
        '.dark-button': {
          backgroundColor: '#005a94',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#006bb0',
          },
        },
      };
      addUtilities(utilities, ['dark']);
    }),
  ],
}
