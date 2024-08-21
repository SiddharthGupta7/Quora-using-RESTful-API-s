const { log } = require("console");
const express= require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4:uuidv4} =require("uuid");
const methodOverride=require('method-override');
// Connecting views and public
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
// Connecting middleware
app.use(express.urlencoded({extended:true}));
let posts=[
    {   id:uuidv4(),
        username:"Siddharth",
        content:"I am a Developer"
    } ,{
        id:uuidv4(),
        username:"Ramish",
        content:"I am a student"
    }, {
        id:uuidv4(),
        username:"Yabashara",
        content:"I am a phycologist"
    }
]

app.listen(port,()=>{
    console.log("Listning to port: "+port);
    
});
app.get("/",(req,res)=>{
    console.log("Server working well");
    
})
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req ,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params; 
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params; 
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params; 
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})