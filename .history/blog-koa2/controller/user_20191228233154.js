const xss = require('xss')
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
    username = escape(username)

    //生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `select username, realname from users where username=${username} and password=${password};`

    const data = await exec(sql)
    return data[0] || {}
}

const register = async (username, password, realname) => {
    username = escape(username)
    realname = escape(realname)

    //生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `insert into users (username, password, realname) values (${username}, ${password}, ${realname});`

    const data = await exec(sql)
    return {
        id: data.insertId
    }
}

const userInfo = async(id, username, oldPassword, newPassword, information) => {
    id = escape(id)
    username = escape(username)
    information = escape(information)

    //生成加密密码
    oldPassword = genPassword(oldPassword)
    newPassword = genPassword(newPassword)
    oldPassword = escape(oldPassword)
    newPassword = escape(newPassword)

    //查询语句有错误，应该是varchar要加
    const sql = `update users set username=${username}, password=${newPassword}, information=${information} where id=${id} and password=${oldPassword};`
    
    const data = await exec(sql)
    console.log('data.insertId:', data.insertId)
    return {
        id: data.insertId
    }
}

module.exports = {
    login,
    register,
    userInfo
}