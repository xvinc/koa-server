const Koa = require('koa');
const app = new Koa();
const cors = require('koa-cors');

const router = require('./routes')

const bodyParser = require('koa-bodyparser') // 请求体，返回体解析类似json，text，图片等

app.use(bodyParser()) // 使用解析上下文插件
app.use(cors());
app.use(router.routes())


app.listen(3000);// 服务启动端口