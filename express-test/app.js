const express = require('express');

//本次http请求的实例
const app = express();

app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url);
    next();
})

app.use((req, res, next) => {
    //假设处理cookie
    req.cookie = {
        userId: 'abc123'
    }
    next();
})

app.use((req, res, next) => {
    //假设处理postdata
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next();
    })
})

app.use('/api', (req, res, next) => {
    console.log('处理/api路由');
    next();
})

app.get('/api', (req, res, next) => {
    console.log('get/api路由');
    next();
})

app.post('/api', (req, res, next) => {
    console.log('post/api路由');
    next();
})

//模拟登陆验证
function loginCheck(req, res, next) {
    console.log('模拟登陆成功');
    setTimeout(() => {
        next();
    })
}


app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get/api/get-cookie');
    res.json({
        errno: 1,
        data: req.cookie
    })
    next();
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('post/api/get-post-data路由');
    res.json({
        errno: 1,
        data: req.body
    })
    next();
})

app.use((req, res, next) => {
    console.log('处理404');
    res.json({
        errno: 0,
        msg: '404 No Found'
    })
    next();
})


app.listen(3000, () => {
    console.log('server is running on port 3000');
})