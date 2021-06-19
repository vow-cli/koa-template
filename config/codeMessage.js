/*
 * @Author: genfa.zeng
 * @Date: 2021-05-04 22:37:57
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-06 21:18:56
 * @Description:状态码信息
 */
const codeMessage = {
  getMessage(code) {
    return this[code] || ''
  },
  '00000': '成功',
  '00001': '创建成功',
  '00002': '更新成功',
  '00003': '删除成功',
  '00004': '密码修改成功',
  '00005': '注册成功',
  99999: '服务器未知错误',
  10000: '参数错误',
  10001: '邮箱已被注册',
  10002: '用户不存在',
  10003: '资源未找到',
  10004: '授权失败',
  10005: '密码错误',
  10006: '禁止访问',
  10007: 'refreshToken已过期',
}
module.exports = codeMessage
