/*
 * @Author: genfa.zeng
 * @Date: 2021-05-04 15:57:13
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-09 12:46:00
 * @Description:用户相关接口
 */
const KoaRouter = require('koa-router')
const codeMessage = require('../../../config/codeMessage')
const { Success } = require('../../../core/httpException')
const router = new KoaRouter()
const UserDao = require('../../dao/user')
const {
  registerTypeEnum,
  loginTypeEnum,
  tokenTypeEnum,
} = require('../../utils/enum')
const {
  UserRegistryCommonValidator,
  UserRegistryByEmailValidator,
  UserLoginCommonValidator,
  UserLoginByEmailValidator,
  UserUpdateInfoValidator,
} = require('../../validators/user')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../../utils/helper')
const Auth = require('../../../middlewares/auth')

const userDao = new UserDao()

router.prefix('/api/v1/user')

router.post('/registry', async (ctx) => {
  await new UserRegistryCommonValidator().validate(ctx)
  const { registryType } = ctx.request.body
  switch (registryType) {
    case registerTypeEnum.EMAIL:
      await new UserRegistryByEmailValidator().validate(ctx)
      await userDao.userRegistryByEmail(ctx)
      break
    case registerTypeEnum.MOBILE:
      //TODO 验证码注册登录
      break
    case registerTypeEnum.MINI_PROGRAM:
      //TODO openId
      break
  }
})

router.post('/login', async (ctx) => {
  await new UserLoginCommonValidator().validate(ctx)
  const { loginType, email, password } = ctx.request.body
  let user = null
  switch (loginType) {
    case loginTypeEnum.EMAIL: {
      await new UserLoginByEmailValidator().validate(ctx)
      user = await userDao.userLoginByEmail(email)
      if (!user) {
        throw new Success({ msg: codeMessage.getMessage('10002'), code: 10002 })
      }
      //密码验证
      let isValid = bcrypt.compareSync(password, user.password)
      if (!isValid) {
        throw new Success({ msg: codeMessage.getMessage('10005'), code: 10005 })
      }
      /**
       * token为双令牌机制
       * accessToken过期时间为1h
       * refreshToken过期时间为1m
       * 如果accessToken过期则可以利用refreshToken来无感知获取新的accessToken
       */
      //TODO 根据不同的用户身份设置权限等级
      const token = generateToken(user.id, Auth.USER)
      throw new Success({ msg: '登录成功', code: '000000', data: token })
    }
    case loginTypeEnum.MOBILE: {
      break
    }
    case loginTypeEnum.MINI_PROGRAM: {
      break
    }
  }
})

router.get(
  '/refreshToken',
  new Auth(0, tokenTypeEnum.REFRESH_TOKEN).m,
  async (ctx) => {
    let user = await userDao.getUserById(ctx.auth.uid)
    if (!user)
      throw new Success({ msg: codeMessage.getMessage('10002'), code: 10002 })
    const token = generateToken(user.id, Auth.USER)
    throw new Success({ msg: '登录成功', code: '00000', data: token })
  }
)

//new Auth(0) 0是指接口的权限等级,目前普通用户是8
router.get('/getUserInfo', new Auth(0).m, async (ctx) => {
  const { nickname, email } = await userDao.getUserById(ctx.auth.uid)
  throw new Success({
    data: {
      nickname,
      email,
    },
  })
})

//暂时只支持修改nickname,wxProfile里面包含用户额外的信息
router.post('/updateUserInfo', new Auth(0).m, async (ctx) => {
  await new UserUpdateInfoValidator().validate(ctx)
  const { nickname, wxProfile } = ctx.request.body
  const { uid } = ctx.auth
  await userDao.updateUserInfo({ nickname, wxProfile }, uid)
  throw new Success({ msg: '更新成功' })
})

module.exports = router
