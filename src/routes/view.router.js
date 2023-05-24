import { Router } from 'express';

const router = Router();


const publicAcces = (req,res,next) =>{
    if(req.session.user) return res.redirect('/api/products');
    next();
}

router.get('/register', publicAcces, (req,res)=>{
    res.render('register')
})

router.get('/', publicAcces, (req,res)=>{
    res.render('login')
})

export default router;