const express=require('express')
const ejs=require('ejs')
const app=express()
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

const { v4: uuid } = require('uuid');

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

let arr=[{
    id:uuid(),
    name:"john",
    comment:'no comments'
},
{
    id:uuid(),
    name:'smith',
    comment:'hello world'
},
{
    id:uuid(),
    name:'blade',
    comment:'javascript'
}
]



app.get('/',(req,res)=>{
    res.send('Express CRUD Recreate')
})

app.get('/Comments',(req,res)=>{
       res.render('comments',{arr})
})
app.get('/form',(req,res)=>{
    res.render('form')
})

app.post('/comments',(req,res)=>{
    const {name,comment}=req.body;
    arr.push({name,comment,id:uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
   const cmt= arr.find((c)=> c.id === id )
   res.render('detail',{cmt})
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params
    const cms=arr.find(d=>d.id===id)
    res.render('edit',{cms})

})

app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params
    const newtext = req.body.edittext
    const commentt=arr.find(a => a.id===id)
    commentt.comment=newtext
    res.redirect('/comments') 

})
app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params
   arr= arr.filter((v)=> v.id !== id)
    res.redirect('/comments')
})

app.listen(8070,()=>{
    console.log('Server Started')
})