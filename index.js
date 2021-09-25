const express = require('express')

const mongoose = require('mongoose')

const path = require('path')


const exphbs=require('express-handlebars')

const session = require('express-session')

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes  = require('./routes/add')
const authRoutes  = require('./routes/auth')
const coursesRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders')

const User = require('./models/user')
const varMiddleware = require('./middleware/variables')

const app = express()

const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
    
})


app.engine('hbs',hbs.engine)

app.set('view engine','hbs')
app.set('views','views')


app.use(async (req, res, next)=>{
    try{
    const user =await User.findById('614eb33c479f1408842ae414')
    
    //let user = await User.findOne()
    req.user = user
    //console.log("--"+req.user)
    next()
    }
    catch(e)
    {

        console.log(e)
    }
})

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}))
app.use(varMiddleware)
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',coursesRoutes)
app.use('/card',cardRoutes)
app.use('/orders',ordersRoutes)
app.use('/auth',authRoutes)

const PORT = process.env.PORT || 3000


async function start(){
    try{
    //const url ='mongodb+srv://walera:04031979@cluster0.ljues.mongodb.net/shop'
    const url ='mongodb://localhost:27017/shop'

    await mongoose.connect(url,{useNewUrlParser:true, useFindAndModify: false,useUnifiedTopology: true })

    let candidate = await User.findOne()
    

    if(!candidate)
    {
        let user = new User({
            email: 'val@mail.ru',
            name: 'valera',
            cart: {items:[]}
        })
        await user.save()
    }
    
    app.listen(PORT,()=>{
        
        console.log('server started on port '+PORT)
        })
    }
    catch(e)
    {
        console.log(e)
    }
}
start()


