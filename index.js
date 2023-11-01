const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const flash = require('express-flash')
require('dotenv').config()
const port = process.env.PORT

const app = express()

const connection = require("./db/connection")

//models
const User = require('./models/User')
const Toughts = require('./models/Thoughts')

//controlers
const ToughtsController = require('./controllers/ToughtsController')

//routes
const toughtsRouter = require('./routes/toughtsRouter')
const authRouter = require('./routes/authRouter')

//template engine
app.engine('handlebars',hbs.engine())
app.set('view engine','handlebars')

app.use(express.static('public'))

//receber resposta do body
app.use(express.urlencoded(
    {
        extended:true
    }
))

app.use(express.json())

//session middleware
app.use(session({
    name:"session",
    secret:"meu_secreto",
    resave:false,
    saveUninitialized:false,
    store: new fileStore({
        logFn: function (){},
        path : require("path").join(require('os').tmpdir(),'sessions')
    }),
    cookie: {
        secure:false,
        maxAge:86400000,
        expires:new Date(Date.now()+86400000),
        httpOnly:true
    }
}))

//flash messages
app.use(flash())

//set session to resp
app.use((req,resp,next)=>{
    if(req.session.userid){
        resp.locals.session = req.session
    }
    next()
})

app.use('/',authRouter)
app.use('/toughts',toughtsRouter)
app.get('/',ToughtsController.showToughts)

connection.sync().then(
    app.listen(port)
)