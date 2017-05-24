var path  = require('path');
var webpack = require('webpack');
module.exports = {
    entry:[
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output:{
        path:path.join(__dirname,'dist/javascripts'),
        filename:'bundle.js',
        publicPath:'/javascripts/'
    },
    plugins:[
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module:{
        loaders:[
            {
                test: /\.svg$/,
                loaders: ['raw-loader'],
                include: __dirname
            },
            {
                test: /\.jsx$/,
                exclude:/node_modules/,
                loaders:['babel-loader'],
                include:__dirname
            },
            {
                test:/\.css$/ ,
                loaders: ['style-loader', 'css-loader'],
                include: __dirname,
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            }
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.coffee','.svg']
    }
}