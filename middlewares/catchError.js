/*
 * @Author: genfa.zeng
 * @Date: 2021-05-02 23:53:32
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-05 17:53:22
 * @Description: 错误拦截中间件
 */
const { HttpException } = require('../core/httpException')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException) {
      //开发环境在控制台抛出错误
      throw error
    }
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        code: error.code,
        data: error.data,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = error.statusCode
    } else {
      ctx.body = {
        msg: '未知错误！',
        code: 9999,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
