const CopressionPlugin = require('compression-webpack-plugin')
//跨域配置
module.exports = {

    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            //GZIP压缩
            return {
                plugins: [new CopressionPlugin({test: /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
                    threshold: 10240,//文件大小大于这个值时启用压缩
                    deleteOriginalAssets: false//压缩后保留原文件
                })]};}},

    devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
        port: 9876,
        // port:8080,
        proxy: {                 //设置代理，必须填
            '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                // target: 'http://localhost:8080',     //代理的目标地址
                //   target:'http://10.236.12.60:8088',
                  target:'http://10.236.11.68:8080',
                 changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '^/api': ''                     //选择忽略拦截器里面的内容
                 }
            }
        }
    }
}
