const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res)=>{
    return res.render("index")
});

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});