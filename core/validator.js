/*
 * @Author: genfa.zeng
 * @Date: 2021-05-03 13:53:21
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-09 13:13:01
 * @Description:参数校验基类
 */
const Schema = require('async-validator')
const { get, cloneDeep } = require('lodash')
const { ParameterException } = require('./httpException')
class Validator {
  constructor(rules = {}) {
    /**
     * 校验规则,格式同element-ui的使用方式
     * {prop1:[{rule1},{rule2}],...}
     * 其中prop格式为：path.type,body.type...
     */
    this.rules = rules
    this.allParams = {}
  }
  _assembleAllParams(ctx) {
    return {
      body: ctx.request.body,
      query: ctx.request.query,
      params: ctx.params,
      header: ctx.request.header,
    }
  }
  get(path) {
    return get(this.allParams, path)
  }
  async validate(ctx) {
    const allParams = this._assembleAllParams(ctx)
    this.allParams = cloneDeep(allParams)
    const keys = Object.keys(this.rules)
    const tasks = keys.map((prop) => {
      const rules = this.rules[prop]
      return this.validateItem(prop, rules)
    })
    let validateResult = false
    try {
      let tasksResult = await Promise.all(tasks)
      validateResult = !!tasksResult
    } catch (error) {
      //此处只拦截到校验的第一个错误
      const errorMessage = error.errors[0].message
      throw new ParameterException(errorMessage)
    }
    return validateResult
  }
  validateItem(prop, rules) {
    const ruleDesc = {
      [prop]: rules,
    }
    const schema = new Schema.default(ruleDesc)
    const propValue = this.get(prop)
    return schema.validate({ [prop]: propValue })
  }
}

module.exports = Validator
