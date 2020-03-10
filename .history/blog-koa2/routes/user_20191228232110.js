const router = require('koa-router')()
const { login, register, userInfo } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body
    const data = await login(username, password)
    if (data.username) {
        //设置session
        ctx.session.username = data.username
        ctx.session.realname = data.realname

        ctx.body = new SuccessModel()
        return
    }
    ctx.body = new ErrorModel('登录失败')
})

router.post('/register', async function (ctx, next) {
    const { username, password, realname } = ctx.request.body
    const data = await register(username, password, realname)

    ctx.body = new SuccessModel(data)
    if (data) {
        //设置session
        ctx.session.insertId = data

        ctx.body = new SuccessModel()
        return
    }
    ctx.body = new ErrorModel('登录失败')
})

router.post('/info', async function (ctx, next) {
    const { id, username, oldPassword, newPassword, information } = ctx.request.body
    console.log('user:', )
    const data = await userInfo(id, username, oldPassword, newPassword, information)

    if (data) {
        ctx.body = new SuccessModel()
       } else {
         ctx.body = new ErrorModel('更新失败')
       }
})




// router.get('/session-test', async function (ctx, next) {
//     if (ctx.session.viewCount == null) {
//         ctx.session.viewCount = 0
//     }
//     ctx.session.viewCount++

//     ctx.body = {
//         errno: 1,
//         viewCount: ctx.session.viewCount
//     }
// })



module.exports = router
