/*
 * @Author: genfa.zeng
 * @Date: 2021-05-03 16:24:23
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-05 13:56:42
 * @Description: 用户模型
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: Sequelize.STRING,
    unifyUid: Sequelize.INTEGER,
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    mobile: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const pwd = bcrypt.hashSync(val, salt)
        this.setDataValue('password', pwd)
      },
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true,
    },
    wxProfile: Sequelize.JSON,
  },
  {
    sequelize,
    //表明
    tableName: 'user',
  }
)

module.exports = User
