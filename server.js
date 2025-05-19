require('dotenv').config();
const express=require("express");
const app=express();
const port=process.env.PORT;
app.use(express.json());
app.get('/',(req,res)=>
{
    res.end(process.env.MSG);
});
app.listen(port,()=>
{
    console.log(`http://localhost:${port}`);
})
