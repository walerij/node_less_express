const {Router} = require("express")

const Card = require('../models/card')
const Course = require('../models/course')
const { route } = require("./courses")

const router = Router()

router.post('/add',async (req,res)=>{
    let course = await Course.getByID(req.body.id)
    await Card.add(course)
    res.redirect('/card')

})

router.get('/', async(req,res)=>{
    let card = await Card.fetch()
    res.render('card',{
        title: "Корзина",
        isCard: true,
        courses:  card.courses,
        price: card.price
    })
})

module.exports=router