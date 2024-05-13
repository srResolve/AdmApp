/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary_100: '#f4f4f5',
        primary_200: '#ececee',
        primary_300: '#e4e4e5',
        primary_400: '#dcdcdd',
        primary_500: '#d4d4d5',
        primary_600: '#acacad',
        primary_700: '#949495',
        primary_800: '#5b5859',
        primary_900: '#3f3f46',
        secondary_200: '#FFF299',
        secondary_400: '#FFE533',
        secondary_600: '#FFDF00',
        secondary_800: '#CCB200',
        secondary_900: '#615505',

        lightBlue: '#bfdbfe',
        status_active: '#007005',
        status_pending: '#FFEB3B',
        status_approved: '#155E99',
        status_refused: '#F44336',
        status_complete: '#3F51B5',
        status_payed: '#1AFF23',
        status_executed: '#FF9800',
        status_finished: '#9C27B0',
        status_started: '#007786',
        status_unfinished: '#464646',
      },
      fontSize: {
        app: 18,
      },
    },
  },
  plugins: [],
};

// payed, iniciado, unfinished
