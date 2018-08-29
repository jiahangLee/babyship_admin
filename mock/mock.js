import mockjs from 'mockjs';
const Random = mockjs.Random;

module.exports = {
  'GET /api/v1/admin/currentUser':(req, res) => {
    res.send({
      status: 'success',
      code: 0,
      message: '成功',
      data: {
        id: 1,
        name: '杨圆建',
      }
    });

  },
  'GET /api/shop/cart': mockjs.mock({
    'data|3': [{
      name: Random.ctitle(3),
      'id|1-100': 1,
      'count|1-10': 1,
      'cover': Random.image('64x64', '#00405d', '#FFF', 'image'),
      'cost_price|5-22.1-2': 10.1,
      'suggested_price|22-42.1-2': 10.1
    }],
  }),
  'PUT /api/v1/admin/editPassword': (req, res) => {
    if(req.body.password !== '123456') {
      res.send({
        status: 'error',
        code: -1,
        message: '密码不正确',
      });
      return;
    }
    if(req.body.newPassword !== req.body.confirmNewPassword) {
      res.send({
        status: 'error',
        code: -1,
        message: '新密码输入不一致',
      });
      return;
    }
    if(req.body.newPassword.length < 6) {
      res.send({
        status: 'error',
        code: -1,
        message: '新密码最小长度为6位',
      });
      return;
    }
    res.send({
      status: 'success',
      code: 0,
      message: '成功',
    });
  },
};
