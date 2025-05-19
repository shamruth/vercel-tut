require("dotenv").config();
const path=require("path");
//const cors = require("cors");
const express=require('express');
const mongoose=require('mongoose');
//mongoose atlas connection
mongoose
  .connect(process.env.ATLAS_URI,)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(`ERROR: \n ${err}`);
    process.exit(1); // Exit the process if DB connection fails
  });
const todoschema=new mongoose.Schema(
{
    TASK:
    {
        type:String,
        required:true,
    }  
});

const todomodel=mongoose.model("TODO"/*DB NAME*/,todoschema);

const app=express();
const port=process.env.PORT;
app.use(express.json());
//app.use(cors());

app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,"index.html"));
})

app.post('/ADDTASK',(req,res)=>
{
    const data = req.body;
    todomodel.create(data).
    then((inserted_data)=>
    {
        console.log("VALUE INSERTED")
        res.end("VALUE INSERTED");
    }).
    catch((err)=>
    {
        console.log(`ERROR OCCUREED \n  ${err}`)
        res.end("VALUE NOT INSERTED");
    })
    console.log(data);
})
app.get('/VIEWTASK',(req,res)=>
{
    todomodel.find({})/*IT IS USED TO EXCLUDE ID AND SHOW ONLY THE TASK OR SPECIFIC FIELD IN */
    .then((datas)=>
    {
        //console.log(datas);
        res.json(datas);//sending json file as response
    })
    .catch((err)=>
    {
        console.log(err);
    })
})
app.delete('/DELETEALLTASK',(req,res)=>
{
    todomodel.deleteMany({})
    .then((data)=>
    {
        res.send(`DELETED ALL DATA`);
        console.log("DELETED DATA:"+data)
    })
    .catch((err)=>
    {
        console.log(err);
    })
});

app.delete('/DELETEONE',(req,res)=>
{
    const {id}=req.body;
    console.log(id);
    todomodel.findByIdAndDelete(id)
    .then(()=>
    {
        console.log("SPEDIFIED DATA DELETED");
        res.send("DELETED");
    })
    .catch((err)=>
    {
        console.log(err);
        res.end("NOT DELETED");
    });
})
app.patch("/UPDATE",(req,res)=>
{
    const {id,TASK}=req.body;
    todomodel.findByIdAndUpdate(id,{TASK:TASK})
    .then(()=>
    {
        console.log("VALUE UPDATED");
        res.end();
    })
    .catch((err)=>
    {
        console.log(err);
        res.end();
    })
})
app.listen(port,()=>
    {
        console.log(`http://localhost:${port}`)
    });
