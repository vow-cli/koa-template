/*
 * @Author: genfa.zeng
 * @Date: 2021-05-04 16:16:18
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-06 21:11:56
 * @Description: 枚举
 */
function isThisType(val) {
  for (let key in this) {
    if (this[key] === val) {
      return true
    }
  }
  return false
}
const registerTypeEnum = {
  EMAIL: 0,
  MOBILE: 1,
  MINI_PROGRAM: 2,
  isThisType,
}

const loginTypeEnum = {
  EMAIL: 0,
  MOBILE: 1,
  MINI_PROGRAM: 2,
  isThisType,
}

const tokenTypeEnum = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  isThisType,
}

module.exports = {
  registerTypeEnum,
  loginTypeEnum,
  tokenTypeEnum,
}
