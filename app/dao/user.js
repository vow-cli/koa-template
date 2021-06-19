/*
 * @Author: genfa.zeng
 * @Date: 2021-05-04 15:47:31
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-07 22:25:04
 * @Description:
 */
const codeMessage = require('../../config/codeMessage')
const { Success, ParameterException } = require('../../core/httpException')
const User = require('../models/user')
class UserDao {
  //通过email注册
  async userRegistryByEmail(ctx) {
    const { nickname, email, password2 } = ctx.request.body
    let isExistEmail = await this.verifyEmail(email)
    if (isExistEmail) {
      throw new ParameterException(codeMessage.getMessage('10001'))
    }
    const userModel = {
      nickname,
      email,
      password: password2,
    }
    await User.create(userModel)
    throw new Success()
  }
  //判断email是否已存在
  async verifyEmail(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    return !!user
  }
  async userLoginByEmail(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    return user
  }
  async getUserById(id) {
    const user = await User.findOne({
      where: {
        id,
      },
    })
    return user
  }
  //修改用户信息
  async updateUserInfo(userInfo, id) {
    await User.update(userInfo, {
      where: {
        id,
      },
    })
  }
}
module.exports = UserDao
