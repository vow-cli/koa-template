const { NotFound } = require('../core/httpException')

const catchRouter = async (ctx, next) => {
  if (ctx.status === 404) {
    throw new NotFound()
  }
  await next()
}

module.exports = catchRouter
