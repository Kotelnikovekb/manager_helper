const {Router} = require('express');
const todo=require('../model/todo')
const router=Router();

router.get('/',async (req,res)=>{
    const todos=await todo.find({}).lean()
    res.render('index',{
        title:'Главная',
        isIndex:true,
        todos
    });
})
router.get('/create',(req,res)=>{
    res.render('create',{
        title:'Создать',
        isCreate:true
    });
})
router.post('/create',async (req,res)=>{
    const todo1=new todo({
        title:req.body.title
    })
    await todo1.save();
    res.redirect('/')
})
router.post('/complete',async (req,res)=>{
    const todo1=await todo.findById(req.body.id);
    todo1.completed=true;
    await todo1.save();
    res.redirect('/')
})
module.exports=router;