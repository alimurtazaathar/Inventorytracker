const express=require('express');
const app=express();

const port=8000;

app.get("/",(req,res)=>{
    const html='<h1>hello</h1>'
res.send(html)
})


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})