const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //返回的promise
    return await exec(sql)
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id=${id};`
    const rows = await exec(sql)
    return rows[0]
}

const newBlog = async (blogData = {}) => {
    //blogData 是一个博客对象，包括title content author属性
    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    const author = xss(escape(blogData.author))
    const createTime = Date.now()

    const sql = `insert into blogs (title, content, createtime, author) values (${title}, ${content}, ${createTime}, ${author});`
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    //id是要更新的博客id
    //blogData 是一个博客对象，包括title content属性
    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    
    const sql = `update blogs set title=${title}, content=${content} where id=${id};`
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}

const delBlog = async (id, author) => {
    //id author是要删除的博客id ,author
    id = escape(id)
    author = escape(author)
    const sql = `delete from blogs where id=${id} and author=${author};`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}