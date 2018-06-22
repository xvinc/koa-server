var mysql = require('mysql');
var config = require('./config')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});

let query = (sql, values) => {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}


// 查询所有文章
exports.findAllPost = () => {
    let _sql = `select * from articles;`
    return query(_sql)
}
// 查询分页文章
exports.findPostByPage = (page) => {
    let _sql = `select * from articles order by id desc limit ${(page - 1) * 10},10;`
    return query(_sql)
}


// 通过文章id查找
exports.findDataById = (id) => {
    let _sql = `select * from articles where id="${id}";`
    return query(_sql)
}

// 更新浏览数
exports.updatePostPv = (value) => {
    let _sql = "update articles set readNum=? where id=?"
    return query(_sql, value)
}