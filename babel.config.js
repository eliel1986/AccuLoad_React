module.exports = {
    presets: [
        '@babel/preset-env',
        ['@babel/preset-react', {
            runtime: 'automatic' // assim, não precisa importar toda vez o React //
        }]
    ]
}