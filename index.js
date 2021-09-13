const express = require('express')

const mongoose = require('mongoose')

const path = require('path')


const exphbs=require('express-handlebars')

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes  = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const User = require('./models/user')
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
    const user =await User.findById('613589be7edc734a08898654')
    
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
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',coursesRoutes)
app.use('/card',cardRoutes)


const PORT = process.env.PORT || 3000


async function start(){
    try{
    const url ='mongodb+srv://walera:04031979@cluster0.ljues.mongodb.net/shop'

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


