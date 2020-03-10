const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //返回的promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id=${id}`
    //将返回的数组变为对象
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象，包括title content author属性
    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    const author = xss(escape(blogData.author))
    const createTime = Date.now()

    const sql = `insert into blogs (title, content, createtime, author) values (${title}, ${content}, ${createTime}, ${author});`
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    //id是要更新的博客id
    //blogData 是一个博客对象，包括title content属性
    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    
    const sql = `update blogs set title=${title}, content=${content} where id=${id}`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    //id author是要删除的博客id ,author
    id = escape(id)
    author = escape(author)
    const sql = `delete from blogs where id=${id} and author=${author};`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}