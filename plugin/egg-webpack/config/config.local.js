/* eslint-disable */
module.exports = () => ({
  webpack: {
    startWebpackServer: true, // 是否开启webpack静态服务器
  }
})

// webpackConfig.plugins.push(
//   new webpack.DefinePlugin({
//     MOCK: isMock,
//     DEBUG: !isProd,
//     TRACK: function () {
//       console.log.apply(console, arguments)
//     },
//     ALERT: function (data) {
//       var debug = window.localStorage.getItem('__DEBUG') == 1;
//       if (debug && data) {
//         window.alert(JSON.stringify(data));
//       }
//     },
//   })
// );
