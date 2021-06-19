/*
 * @Author: genfa.zeng
 * @Date: 2021-05-03 11:52:17
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-09 16:38:05
 * @Description:异常基类
 */
const codeMessage = require('../config/codeMessage')
class HttpException extends Error {
  constructor(msg = '服务器异常', code = 10000, statusCode = 400) {
    super()
    this.code = code
    this.statusCode = statusCode
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg, code) {
    super()
    this.statusCode = 400
    this.msg = msg || codeMessage.getMessage('10000')
    this.code = code || 10000
  }
}

class Success extends HttpException {
  constructor({ msg, code, data } = {}) {
    super()
    this.statusCode = 200
    this.data = data
    this.msg = msg || codeMessage.getMessage('00000')
    this.code = code || '00000'
  }
}

class NotFound extends HttpException {
  constructor(msg, code) {
    super()
    this.statusCode = 404
    this.msg = msg || codeMessage.getMessage('10003')
    this.code = code || 10003
  }
}

class AuthFailed extends HttpException {
  constructor(msg, code) {
    super()
    this.statusCode = 401
    this.msg = msg || codeMessage.getMessage('10004')
    this.code = code || 10004
  }
}

class Forbidden extends HttpException {
  constructor(msg, code) {
    super()
    this.statusCode = 403
    this.msg = msg || codeMessage.getMessage('10006')
    this.code = code || 10006
  }
}

class UnKnownException extends HttpException {
  constructor(msg) {
    super()
    this.statusCode = 500
    this.msg = msg || codeMessage.getMessage('99999')
    this.code = 99999
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbidden,
  UnKnownException,
}
