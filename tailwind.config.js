/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary_200: '#A8B4F0',
        primary_400: '#7D8FE8',
        primary_600: '#5C71D6',
        primary_700: '#303b71',
        primary_800: '#0F173D',
        primary_900: '#161B33',

        secondary_200: '#FFF299',
        secondary_400: '#FFE533',
        secondary_600: '#FFDF00',
        secondary_800: '#CCB200',
        secondary_900: '#615505',
      },
      fontSize: {
        app: 18,
      },
    },
  },
  plugins: [],
};
