const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose')

const app=express()



app.use(cors())
app.use(express.json());
app.get('/',(req,res)=>{
    res.json({
        message:'My thought'
    })
})

function isValid(tot){
    return tot.name && tot.name.toString().trim()!=='' &&
    tot.thought && tot.thought.toString().trim()!=='';
}

app.post('/tot',(req,res)=>{
    console.log(req.body)
    if (isValid(req.body)){
        
        const tot={
            name:req.body.name.toString(),
            thought:req.body.thought.toString()
        }
        // tots.insert(tot).then(createdTot=>{
        //     res.json(createdTot)
        // })
        // console.log(tot)
        
    }
    else{
        res.status(422)
        return res.json({
            message:'Both name and thought are required!!'
        })
    }
    
})
app.listen(5000,()=>{
    // connect()
    console.log("listening on http://localhost:5000");
})
