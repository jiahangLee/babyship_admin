export default {
  plugins: ['umi-plugin-dva'],
  hashHistory: true,
  pages: {
    '/roles': { Route: './routes/PrivateRoute.js' },
    '/users': { Route: './routes/PrivateRoute.js' },
    '/modify': { Route: './routes/PrivateRoute.js' },
    // 如果你使用了动态路由，/products/$id.js 或者 /products/$id/index.js这种结构
    // '/products/:id': { Route: './routes/PrivateRoute.js' },
  },
}
