const express = require('express')
const app=express()
const port=3000
const mongoose=require('mongoose')
const expense=require('./models/expense')


app.use(express.json())
mongoose.connect('mongodb+srv://Pravin_1802:Pravin1802@cluster0.dcee4lk.mongodb.net/newdb', { useUnifiedTopology: true });
app.get(`/`,async (req,res)=>{
    const Expense= await expense.find()
    res.json(Expense);
});

app.get(`/expense/:id`,async(req,res)=>{
    const _id=req.params.id
    const Expense= await expense.find({_id})
    res.json(Expense);
});
app.post(`/post`,async(req,res)=>{
    
    //const collection=db.collection('expense-tracker')
    const data={
        "title":req.body.title,"amount":req.body.amount,"desc":req.body.desc
    }
    const Expense=await expense.create(data);
    res.send("Added Successfully")
})
app.delete(`/delete/:id`,async(req,res)=>{
    const _id=req.params._id;
    const exp=await expense.findByIdAndDelete(_id);
    res.send("Deleted Successfully ");
});
app.put(`/update/:id`,async(req,res)=>{
    const _id=req.params._id;
    const oldvalue= {"title":"Book"}
    const newvalue= {"title":"The Secret","amount":1000}
    const exp=await expense.updateOne(oldvalue,newvalue)
    res.send("Updated Successfully")
})
app.listen(port,()=>{
    console.log(`It is runs in the port ${port}`);
});
