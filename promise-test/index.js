const fs = require('fs')
const path = require('path')

// //callback方式获取一个文件的内容
// function getFileContent(fileName, callback) {
//     const fullFileName = path.resolve(__dirname, 'file', fileName)
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }
// //测试callback-hell
// getFileContent('a.json', aData => {
//     console.log('a data', aData)
//     getFileContent(aData.next, bData => {
//         console.log('b data', bData)
//         getFileContent(bData.next, cData => {
//             console.log('c data', cData)
//         })
//     })
// })

//用promise获取文件内容
function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'file', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

// getFileContent('a.json').then(aData => {
//     console.log('a data', aData)
//     return getFileContent(aData.next)
// }).then(bData => {
//     console.log('b data', bData)
//     return getFileContent(bData.next)
// }).then(cData => {
//     console.log('c data', cData)
// })


//用async获取文件内容
//async要点：1.await后面可以追加promise对象。2.await必须包裹在async函数里面。3.async函数执行返回的也是一个promise对象。4.可以通过try-catch截获reject的值
async function readFileData () {
    //同步写法
    const aData = await getFileContent('a.json')
    console.log('a data', aData)
    const bData = await getFileContent(aData.next)
    console.log('b data', bData)
    const cData = await getFileContent(bData.next)
    console.log('c data', cData)
}
readFileData()