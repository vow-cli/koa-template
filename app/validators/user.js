/*
 * @Author: genfa.zeng
 * @Date: 2021-05-04 20:44:53
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-05-06 22:01:18
 * @Description:用户接口校验
 */
const Validator = require('../../core/validator')
const { registerTypeEnum, loginTypeEnum } = require('../utils/enum')

const validateRegistryType = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback('registryType是必须参数')
  }

  if (!registerTypeEnum.isThisType(value)) {
    callback('registryType参数不合法')
  }

  callback()
}

const userRegistryCommonRules = {
  'body.registryType': [
    {
      type: 'number',
      message: 'registryType为Number类型',
    },
    {
      validator: validateRegistryType,
    },
  ],
  'body.nickname': [
    {
      type: 'string',
      required: true,
      message: 'nickname不能为空',
    },
  ],
}

class UserRegistryCommonValidator extends Validator {
  constructor() {
    super()
    this.rules = {
      ...userRegistryCommonRules,
    }
  }
}

class UserRegistryByEmailValidator extends Validator {
  constructor() {
    super()
    this.validateSamePassword = this.validateSamePassword.bind(this)
    this.rules = {
      'body.email': [
        {
          required: true,
          message: 'email不能为空',
        },
        {
          type: 'email',
          message: 'email格式不正确',
        },
      ],
      'body.password1': [
        {
          type: 'string',
          required: true,
          message: 'password1不能为空',
        },
      ],
      'body.password2': [
        {
          type: 'string',
          required: true,
          message: 'passord2不能为空',
        },
        {
          validator: this.validateSamePassword,
        },
      ],
    }
  }
  validateSamePassword(rule, value, callback) {
    const password2 = this.get('body.password2')
    const password1 = this.get('body.password1')
    if (password1 !== password2) {
      callback('密码不一致')
    }
    callback()
  }
}

const validateLoginType = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback('loginType是必须参数')
  }

  if (!loginTypeEnum.isThisType(value)) {
    callback('loginType参数不合法')
  }

  callback()
}

const commonUserLoginRules = {
  'body.loginType': [
    {
      type: 'number',
      message: 'loginType为Number类型',
    },
    {
      validator: validateLoginType,
    },
  ],
}
class UserLoginCommonValidator extends Validator {
  constructor() {
    super()
    this.rules = { ...commonUserLoginRules }
  }
}
class UserLoginByEmailValidator extends Validator {
  constructor() {
    super()
    this.rules = {
      'body.email': [
        {
          required: true,
          message: 'email不能为空',
        },
        {
          type: 'email',
          message: 'email格式不正确',
        },
      ],
      'body.password': [
        {
          required: true,
          message: 'password不能为空',
        },
      ],
    }
  }
}

class UserUpdateInfoValidator extends Validator {
  constructor() {
    super()
    this.rules = {
      'body.nickname': [
        {
          required: true,
          message: 'nickname不能为空',
        },
      ],
    }
  }
}

module.exports = {
  UserRegistryCommonValidator,
  UserRegistryByEmailValidator,
  UserLoginByEmailValidator,
  UserLoginCommonValidator,
  UserUpdateInfoValidator,
}
