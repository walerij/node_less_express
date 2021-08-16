const {Router} = require("express")
const Course = require("../models/course" )

const router = Router()

router.get("/",async (req,res)=>{
    let courses = await Course.getAll()    
    res.render('courses',{
        title:"Курсы",
        isCourses: true,
        courses
    }) 
})

module.exports = router