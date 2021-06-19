/*
 * @Author: genfa.zeng
 * @Date: 2021-05-02 22:28:39
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-09 15:33:18
 * @Description:初始化
 */
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const koaCors = require('koa2-cors')
const requireDirectory = require('require-directory')
const catchError = require('../middlewares/catchError')
const catchRouter = require('../middlewares/catchRouter')
class InitManage {
  static init(app) {
    InitManage.app = app
    InitManage.loadConfig()
    InitManage.loadCors()
    InitManage.loadException()
    InitManage.loadBodyParser()
    InitManage.loadRouters()
    InitManage.loadStatic()
    InitManage.catchRouter()
  }

  //koa-router
  static loadRouters() {
    //api所在的目录绝对路径
    const apiDirectory = `${process.cwd()}/app/api`

    //路由自动加载
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule,
    })

    //判断加载的模块是否为路由
    function whenLoadModule(module) {
      if (module instanceof KoaRouter) {
        InitManage.app.use(module.routes())
      }
    }
  }
  //koa-static
  static loadStatic() {
    InitManage.app.use(koaStatic(`${process.cwd()}/static/`))
  }
  //koa-bodyparser
  static loadBodyParser() {
    InitManage.app.use(bodyParser())
  }
  //exception
  static loadException() {
    InitManage.app.use(catchError)
  }

  //404
  static catchRouter() {
    InitManage.app.use(catchRouter)
  }

  //config
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  //cors
  static loadCors() {
    InitManage.app.use(
      koaCors({
        origin: (ctx) => {
          return ctx.header.origin
        },
      })
    )
  }
}

module.exports = InitManage
