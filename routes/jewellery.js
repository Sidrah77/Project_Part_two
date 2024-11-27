var express = require('express');
var router = express.Router();
let Jewellery = require('../model/jewellery.js')
const jewellery = require('../model/jewellery.js');
let jewelleryController = require('../controllers/jewellery.js')
/* Get route for the book list - Read Operation */
/*
GET, 
Post, 
Put --> Edit/Update
*/

/* Read operation --> Get route for displaying the books list*/


router.get('/',async(req,res,next)=>{
    try{
        const JewelleryList = await Jewellery.find();
        res.render('Jewellery/list',{
            title:'Jewellery',
            JewelleryList:JewelleryList
        })
    }
    catch(err){
        console.error(err)
        res.render('Jewellery/list',{
            error:'Error on Server'})
    }
})
/* Create operation --> Get route for displaying the Add Page */
router.get('/add', async(req, res,next) => {
    try {
        res.render('Jewellery/add',{
            title: 'Add Jewellery'
        });
    }
    catch(err)
    {
        console.error(err)
        res.render('Jewellery/list',{
            error:'Error on Server'})
    }
});
/* Create Operation --> Post route for Processing the Add Page */
router.post('/add', async(req, res,next) => {
    try {
        /* change this up for the assignment or project */
        let newJewellery = Jewellery({
            "product": req.body.product,
            "category": req.body.category,
            "price": req.body.price,
            "color": req.body.color,
            "metal": req.body.metal,
            "size": req.body.size
            
        });
        Jewellery.create(newJewellery).then(()=> {
            res.redirect('/jewelleryslist');
        })

    }
    catch(err)
    {
        console.error(err)
        res.render('Jewellery/list',{
            error:'Error on Server'})
    }
});
/* Update operation --> Get route for displaying the Edit Page */
router.get('/edit/:id',async(req, res,next) => {
    try {

        const id = req.params.id;
        const jewelleryToEdit = await Jewellery.findById(id);
        res.render('Jewellery/edit',
            {
                title: 'Edit Jewellery',
                Jewellery:jewelleryToEdit
            }
        )

    }
    catch(err)
    {
        console.error(err)
        next(err); //passing the error
    }
});
/* Update Operation --> Post route for Processing the Edit Page */
router.post('/edit/:id',async(req, res,next) => {
    try {
        let id=req.params.id;
        let updatedJewellery = Jewellery({
            "_id":id, 
            "product":req.body.product,
            "category":req.body.category,
            "price":req.body.price,
            "color":req.body.color,
            "metal":req.body.metal, 
            "size": req.body.size
        })
        Jewellery.findByIdAndUpdate(id, updatedJewellery).then(()=>{
            res.redirect('/jewelleryslist')
        })
    }

    catch(err)
    {
        console.error(err)
        res.render('Jewellery/list',{
            error:'Error on Server'})
    }
});
/* Delete Operation --> Get route to perform Delete operation */
router.get('/delete/:id',async(req, res, next) => {
    try{
        let id=req.params.id;
        Jewellery.deleteOne({_id:id}).then(()=>{
            res.redirect('/jewelleryslist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Jewellery/list',{
            error:'Error on Server'})
    }
});
module.exports = router;