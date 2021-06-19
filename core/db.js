/*
 * @Author: genfa.zeng
 * @Date: 2021-05-03 16:04:07
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-04 18:57:43
 * @Description: sequelize配置文件
 */
const { Sequelize } = require('sequelize')
const { dbName, host, port, user, password } = global.config.database
const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: 'mysql',
  //在控制台中显示sql
  logging: true,
  //与北京时间保持一致
  timezone: '+08:00',
  define: {
    //启用时间戳将自动向每个模型添加createAt和updateAt字段
    timestamps: true,
    //生成deleteAt时间戳
    paranoid: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    //驼峰转下划线
    underscored: true,
  },
})

//同步模型到数据库
//sequelize.sync()

module.exports = { sequelize }
