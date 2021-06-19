/*
 * @Author: genfa.zeng
 * @Date: 2021-05-03 12:20:26
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-06 21:59:13
 * @Description: 系统配置文件
 */
module.exports = {
  //prod
  environment: 'dev',
  database: {
    dbName: 'fxmall',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
  },
  security: {
    secretKey: 'fengxiu',
    //1h
    accessTokenExpiresIn: 60 * 60,
    //1month
    refreshTokenExpiresIn: 60 * 60 * 24 * 30,
  },
}
