/*
 * @Author: genfa.zeng
 * @Date: 2021-05-04 16:16:25
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-15 14:30:04
 * @Description: 工具方法
 */
const jwt = require('jsonwebtoken')
/**
 * @description:
 * @param {*} uid 用户身份Id
 * @param {*} scope 用户权限，数字越大代表权限越大
 * @return {*}
 */
const generateToken = (uid, scope) => {
  const secretKey = global.config.security.secretKey
  const accessTokenExpiresIn = global.config.security.accessTokenExpiresIn
  const refreshTokenExpiresIn = global.config.security.refreshTokenExpiresIn
  const accessToken = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    {
      expiresIn: accessTokenExpiresIn,
    }
  )
  const refreshToken = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    {
      expiresIn: refreshTokenExpiresIn,
    }
  )
  return { accessToken, refreshToken }
}

const isUndefined = (val) => {
  return typeof val === 'undefined'
}
module.exports = {
  generateToken,
  isUndefined,
}
