module.exports = {
    plugins: ['macros'],
    presets: [
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript'
    ],
    sourceType: 'unambiguous',
};
