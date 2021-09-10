const {Router} = require("express")
const Course = require('../models/course')
const { route } = require("./courses")

const router = Router()

router.post('/add',async (req,res)=>{
    let course = await Course.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/card')

})
router.delete('/remove/:id',async(req,res)=>{
     let card=await Card.remove(req.params.id)
     res.status(200).json(card)
})
router.get('/', async(req,res)=>{
    /*let card = await Card.fetch()
    res.render('card',{
        title: "Корзина",
        isCard: true,
        courses:  card.courses,
        price: card.price
    })*/
    return {'test':'true'}
})


module.exports=router