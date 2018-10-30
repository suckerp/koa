import Koa = require('koa')
import Router = require('koa-router')
import Json = require('koa-json')
import mssql = require('mssql')


const app = new Koa()
const router = new Router()


app.use(router.routes())
app.use(router.allowedMethods())
app.use(Json())

const config = ({
    user: 'test',
    password: 'test',
    server: '10.10.105.107',
    port: 1433,
    database: 'dozenten',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
})



new mssql.ConnectionPool(config).connect().then(connection => {

    router.get('/a', async ctx => {
   
        const result = await connection.query`select * from dozenten`
        console.log(result) 
    
        ctx.body = result
    
    })
    

    router.get('/b',  ctx => {
   
        return connection.query`select * from dozenten` 
            .then(result => {
                console.log(result) 
                ctx.body = result
            })
    })
    
    const port:number = 3000
    app.listen(port, 'localhost')

})

//const temp = pool.query('select * from Dozenten')


// router.use(async(ctx,next) => {
//     try {
//         await next()
//     } catch (err) {
//         console.log (err.message)
//         ctx.body = err.message
//     }
// })

// router.get('/test', async ctx =>{
//     throw new Error("test")
// })




