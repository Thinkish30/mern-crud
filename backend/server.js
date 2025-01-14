const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT,() =>{
    console.log(`Hello World from ${PORT}`)
});


//user schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
},{timestamps:true});

const User = mongoose.model("User",userSchema)

//basic function
app.get("/",(req,res) =>{
    res.send("Hello World 1");    
});

//  Create user
app.post("/createuser",async(req,res)=>{
    try {
        const bodyData=req.body;
        const user=new User(bodyData);
        const userData=await user.save();
        res.send(userData);

    } catch (error) {
        res.send(error);
    }
});

// read all user
app.get("/readalluser",async(req,res)=>{
    try {
        const userData=await User.find();
        res.send(userData);
    } 
    catch (error) {
        res.send(error);
    }
});


// read
app.get('/read/:id',async(req,res) =>{
    try {
       const id=req.params.id;
       const user=await User.findById({_id:id}); 
       res.send(user);
    } catch (error) {
        res.send(error);
    }
});

// update
app.put('/updateuser/:id',async(req,res) =>{
    try {
        const id=req.params.id;
        const user = await User.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

// delete
app.delete('/delete/:id',async(req,res) =>{
    try {
        const id=req.params.id;
        const user = await User.findByIdAndDelete({_id:id});
        res.send(user);
    } catch(error) {
        res.send(error);
    }
});
   

//database connection
mongoose.connect("mongodb://localhost:27017/crud").then(() =>{
    console.log("database connected");
})
.catch((error) =>{
    console.log(error);
});
