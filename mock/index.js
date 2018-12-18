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
    const json = getJSONData('./templates/login.json');
    res.json(Mock.mock(json));
  })

  app.get('/api/user/contacts', (req, res) => {
    const json = getJSONData('./templates/contacts.json');
    res.json(Mock.mock(json));
  })

  app.get('/api/user/search_contacts', (req, res) => {
    console.log(req.query);
    const json = getJSONData('./templates/search_contacts.json');
    res.json(Mock.mock(json));
  })
};
