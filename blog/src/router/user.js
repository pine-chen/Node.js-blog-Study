const { login, register } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method; //GET POST

    //登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        // const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                //操作cookie
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`) //path=/ 设置为根目录，httpOnly只允许服务端修改

                //设置session
                req.session.username = data.username
                req.session.realname = data.realname
                //同步到redis中
                set(req.sessionId, req.session)

                return new SuccessModel()      
            }
            return new ErrorModel('登录失败')
        })
    }

    //注册
    if (method === 'POST' && req.path === '/api/user/register') {
        const { username, password, realname } = req.body
        const result = register(username, password, realname)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    


        // //登录验证的测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {

    //     // if (req.cookie.username) {
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 // username: req.cookie.username
    //                 username: req.session.username
    //             })
    //         )
    //     }
    //     return Promise.resolve(
    //         new ErrorModel('尚未登录')
    //     )
    // }
}

module.exports = handleUserRouter;