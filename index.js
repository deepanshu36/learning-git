const express=require('express')
const app=express()
const data=require('./data');

app.use(express.json())


app.get('/api/students',(req,res)=>{

    console.log("api is working");
//   res.send('<h1> hello this is working</h1>');

res.json(data);

})



app.post("/api/students",(req,res)=>
{
   // res.send('hello post request');
console.log(req.body);


   if(!req.body.email){
  
    res.status(400)
    return res.json({error:"email not found"});


   }
    const user= {
        id:data.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }
  
    data.push(user);

    res.json(user);
    
})

app.put('/api/students/:id',(req,res)=>
{

const newid=req.params.id;

// console.log(newid);
// res.json(newid);


const first_name=req.body.first_name;
const last_name=req.body.last_name;
const email=req.body.email;


const index=data.findIndex((data)=>{
    return data.id==Number(newid);
    
})

if(index>=0)
{
    const std=data[index];
     std.first_name=first_name;
     std.last_name=last_name;
     std.email=email;
 
     res.json(std);
    
}

else
{
  res.status(404);
}





})

app.delete("/api/students/:id",(req,res)=>{

const id=req.params.id;

const index=data.findIndex((data)=>
{
    return data.id===Number(id);
    
})

console.log(index);


if(index>=0)
{
const deleted=data[index];

data.splice(index,1);

res.json(deleted);


}
else
{
res.status(404);
res.end();


}



})



app.listen(3000,()=>{

    console.log("listening to port 3000");

})