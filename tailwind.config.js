module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        colors: {
            'desaturatedBlue': '#25273c',
            'lightGray': '#2e3144',
            'white': '#ffffff',
            'darkBlue': '#161722',
            'grayishBlue': '#cacde8',
            'grayishBlueHover': '#3a7bfd',
            'darkGrayishBlue': '#777a92',
            'lightGrayishBlue': '#e4e5f1',
            'darkGray': '#393a4c'
        },
    },
    variants: {
        extend: {},
        fontWeight: ['hover'],
    },
    plugins: [],
}
