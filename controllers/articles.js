const userModel = require('../mysql/db-init')
/**
 * 查询文章列表
 *
 * @param  {pageSize, pageNum} 每页展示条数, 页码
 * @return {JSONArray} 返回标签对应的文章信息
 */
const getArticles = async ctx => {
    if (ctx.request.query.page) {
        page = parseInt(ctx.request.query.page);
        await userModel.findPostByPage(page)
            .then(data => {
                ctx.body = {
                    code: 1,
                    msg: '查询成功',
                    page: page,
                    datalist: data
                }
            }).catch(err => {
                ctx.body = {
                    msg: err,
                    status: 999999
                }
            })
    }
}

/**
 * 通过文章ID查询文章(供标签接口使用)
 *
 * @param  {postId} 文章Id
 * @return {JSONArray} 返回文章信息
 */
// const getDetails = async postId => {
//   let result = []
//   await articles
//     .findAll({
//       where: {
//         postId: postId
//       },
//       attributes: ['postId', 'date', 'title']
//     })
//     .then(data => {
//       result.push(data[0].dataValues)
//     })
//   return result
// }

/**
 * 通过文章ID查询文章详情
 *
 * @param  {postId} 文章Id
 * @return {JSONArray} 返回文章信息
 */
const getDetail = async ctx => {

    if (ctx.request.query.postId) {
        postId = parseInt(ctx.request.query.postId);
        //读取文章
        await userModel.findDataById(postId)
            .then(data => {
                read = Number(data[0]['readNum'])
                read += 1
                ctx.body = data

            })
            .catch(err => {
                ctx.body = {
                    msg: err,
                    status: 999999
                }
            })
            //更新浏览次数
        await userModel.updatePostPv([read, postId])
    }

}

/**
 * 阅读次数递增接口
 * POST
 * @param  {postId} 文章Id
 * @return {JSON} Id, 阅读次数
 */
// const readNumIncrease = async ctx => {
//   const postId = ctx.request.body.postId
//   await articles.update({
//     readNum: Sequelize.literal('readNum + 1')
//   }, {
//     where: {
//       postId: postId
//     }
//   }).catch(err => {
//     ctx.body = {
//       msg: err,
//       status: 999999
//     }
//   })
//   await articles
//     .findAll({
//       where: {
//         postId: postId
//       },
//       attributes: ['readNum']
//     })
//     .then(data => {
//       ctx.body = {
//         msg: '阅读次数查询成功',
//         status: 200,
//         postId: postId,
//         readCount: data[0].dataValues.readNum
//       }
//     }).catch(err => {
//       ctx.body = {
//         msg: err,
//         status: 999999
//       }
//     })
// }

module.exports = {
    getArticles,
    //   getDetails,
    getDetail
    //   readNumIncrease
}