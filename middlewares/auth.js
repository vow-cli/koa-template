/*
 * @Author: genfa.zeng
 * @Date: 2021-05-05 15:49:43
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-06 21:45:50
 * @Description:token以及权限验证中间件
 */
const { Forbidden, AuthFailed } = require('../core/httpException')
const jwt = require('jsonwebtoken')
const { tokenTypeEnum } = require('../app/utils/enum')
class Auth {
  constructor(level, tokenType) {
    this.tokenType = tokenType
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }
  static resolveAuthorizationHeader(ctx) {
    if (!ctx.header || !ctx.header.authorization) {
      return
    }
    const parts = ctx.header.authorization.trim().split(' ')
    if (parts.length === 2) {
      const scheme = parts[0]
      const token = parts[1]
      if (/^Bearer$/i.test(scheme)) {
        return token
      }
    }
  }
  get m() {
    return async (ctx, next) => {
      //从请求头中获取token
      const isRefreshToken = !!(this.tokenType === tokenTypeEnum.REFRESH_TOKEN)
      const token = Auth.resolveAuthorizationHeader(ctx)
      let decode = null
      if (!token) {
        //TODO refreshToken与accessToken的code是否要区分开来?
        throw new AuthFailed(
          isRefreshToken ? 'refreshToken不存在' : 'token不存在'
        )
      }
      //token合法性校验
      try {
        decode = jwt.verify(token, global.config.security.secretKey)
      } catch (error) {
        const { name } = error
        switch (name) {
          case 'TokenExpiredError': {
            throw new AuthFailed(
              isRefreshToken ? 'refreshToken已过期' : 'token已过期'
            )
          }
          case 'JsonWebTokenError': {
            throw new AuthFailed(
              isRefreshToken ? 'refreshToken不合法' : 'token不合法'
            )
          }
        }
        //如果是其他情况，抛出错误到外层
        throw error
      }
      //从token获取用户身份以及权限等级
      if (decode.scope <= this.level) {
        throw new Forbidden('权限不足,无法访问')
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      }
      await next()
    }
  }
}

module.exports = Auth
