const path = require('path') // esse comando é para colocar a barra no endereço de maneira correta de acordo com sistema operacional. //
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ReactRefreshWebPackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: { // arquivo que será gerado com webpack //
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'], // extensôes que a aplicação deve ler //
    },
    devServer: {
        static: path.resolve(__dirname, "public")   ,     
        // contentBase: path.resolve(__dirname, 'public') // não funcIona contentBase
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactRefreshWebPackPlugin(), // se estiver em desenvolvimento, executa REFRESH WEBPACK //
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean), // verifica dentro do array TRUE or FALSE //
    module: { // como a aplicação irá se comportar ao importar cada tipo de arquivo. //
        rules: [
            {
                test: /\.jsx$/, // expressão regular para arquivos terminados em .jsx //
                exclude: /node_modules/, // expressão acima não se aplica a pasta node_modules //
                use: {
                    loader: 'babel-loader', // integração entre babel e webpack
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                },
            },
            {
                test: /\.scss$/, // expressão regular para arquivos terminados em .css //
                exclude: /node_modules/, // expressão acima não se aplica a pasta node_modules //
                use: ['style-loader', 'css-loader', 'sass-loader'], // integração entre css e webpack
            }
        ],
    }
};

