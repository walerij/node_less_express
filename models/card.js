const path = require('path')
const fs = require('fs')
/*const { rejects } = require('assert')
const { resolve } = require('path')
*/
let p = path.join(
    path.dirname( process.mainModule.filename),
    'data',
    'card.json'
)

class Card{

    static async add(course){
       const card = await Card.fetch()

       let idx = card.courses.findIndex(c=>c.id===course.id)
       let candidate = card.courses[idx]
       if(candidate){
           //курс уже есть
           candidate.count ++
           card.courses[idx] = candidate

       }
       else 
       {
           //нужно добавить
           course.count =1
           card.courses.push(course)

       }
       card.price += +course.price

       return new Promise ((resolve, reject)=>{
           fs.writeFile(p, JSON.stringify(card), err=>{
               if(err) rejest(err)
               else resolve()
           })
       })

    }
    static async fetch(){
         return new Promise((resolve, rejest)=>{
             fs.readFile(p,'utf-8',(err,content)=>{
                 if (err) rejects(err)
                 else resolve(JSON.parse(content))
             })   

         })
    }

    static async remove(id)
    {
        let card =await Card.fetch()
        let idx = card.courses.findIndex(c=>c.id===id)
        let course = card.courses[idx]
        if(course.count===1)
        {
            //удалить
            card.courses = card.courses.filter(c=>c.id!==id)
        }
        else
        {
            //изменить количество
            card.courses[idx].count--
        }
       card.price -= course.price

       return new Promise ((resolve, reject)=>{
        fs.writeFile(p, JSON.stringify(card), err=>{
            if(err) rejest(err)
            else resolve(card)
        })
    })
    }
}

module.exports=Card