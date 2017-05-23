// 引入模块
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();
var compiler = webpack(config);


// 设置views路径和模板
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);

app.use(webpackDevMiddleware(compiler,{noInfo:true,publicPath:config.output.publicPath}))
app.use(webpackHotMiddleware(compiler));

// 对所有(/)URL或路由返回index.html 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.use(express.static(path.join(__dirname, 'public')))


// app.use(express.static(path.join(__dirname, 'static/dist')));
// 静态文件配置
//app.use('/client/static', express.static(path.join(__dirname, 'client/static')));

// 启动一个服务，监听从8888端口进入的所有连接请求
var server = app.listen(8888, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
}); 