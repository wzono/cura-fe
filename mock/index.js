const Mock = require('mockjs'); // mockjs 导入依赖模块
const bodyParser = require('body-parser');
const { getJSONData } = require('./utils'); // 自定义工具模块

module.exports = app => {
  app.use(bodyParser.json());

  app.post('/api/user/register', (req, res) => {
    const json = getJSONData('./templates/register.json');
    res.json(Mock.mock(json));
  })

  app.post('/api/user/login', (req, res) => {
    const json = getJSONData('./templates/login.json');
    res.json(Mock.mock(json));
  })

  app.get('/api/user/me', (req, res) => {
    const json = getJSONData('./templates/me.json');
    res.json(Mock.mock(json));
  })

  app.get('/api/friend/all', (req, res) => {
    const json = getJSONData('./templates/contacts.json');
    res.json(Mock.mock(json));
  })

  app.get('/api/user/get_users_by_info', (req, res) => {
    console.log(req.query);
    const json = getJSONData('./templates/search_contacts.json');
    res.json(Mock.mock(json));
  })

  app.get('/api/user/get_user', (req, res) => {
    console.log(req.query);
    const json = getJSONData('./templates/user.json');
    res.json(Mock.mock(json));
  })

  app.get('/api/user/groups', (req, res) => {
    const json = getJSONData('./templates/groups.json');
    res.json(Mock.mock(json));
  })

  app.post('/api/friend/add_friend', (req, res) => {
    res.json({
      status: 200,
      message: 'ok'
    })
  })

  app.delete('/api/friend/delete_friend', (req, res) => {
    res.json({
      status: 200,
      message: 'ok'
    })
  })

  app.post('/api/user/add_commend', (req, res) => {
    res.json({
      status: 200,
      message: 'ok'
    })
  })

  app.delete('/api/user/delete_commend', (req, res) => {
    res.json({
      status: 200,
      message: 'ok'
    })
  })

  app.put('/api/user/update_basic_info', (req, res) => {
    res.json({
      status: 200,
      message: 'ok',
    })
  })

  app.put('/api/user/update_head', (req, res) => {
    res.json({
      status: 200,
      message: 'ok',
      data: {
        headUrl: "http://cdn.wingsico.org/image/avatar/181020-0.jpeg"
      }
    })
  })

  app.put('/api/user/update_phone', (req, res) => {
    res.json({
      status: 200,
      message: 'ok',
    })
  })
};
