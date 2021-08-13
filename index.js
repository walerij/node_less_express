const express = require('express')

const app = express()

const path = require('path')


app.get("/",(req,res)=>{
        
        res.sendFile(path.join(__dirname,"views","index.html"))
})

app.get("/about",(req,res)=>{
        
    res.sendFile(path.join(__dirname,"views","about.html"))
})


const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('server started on port '+PORT)
})