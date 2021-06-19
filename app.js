const Koa = require("koa");

const InitManage = require("./core/init");

const app = new Koa();

//注册中间件
InitManage.init(app);

app.listen(3000, () => {
  console.log(`listening at http://localhost:3000`);
});
