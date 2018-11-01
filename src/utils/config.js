const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
//（dev/prod）=》 url
// const service_url = `localhost:8002`
const service_url = `123.206.91.106:8002`
// const APIV3 = `http://${dev_url}/babyship`
const APIV3 = `http://${service_url}/babyship`

module.exports = {
  name: '宝船项目后台管理',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2018 zuiidea',
  logo: '../../public/logo.svg',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    // url: `localhost:8002`,
    service_url: `123.206.91.106:8002`,
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    hello: `${APIV3}/hello`,
    hello2: `${APIV3}/hello2`,
    getMenus:`${APIV3}/selectMenusByRole`,
    designRole:`${APIV3}/designRole`,
    newLogin: `${APIV3}/login`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
