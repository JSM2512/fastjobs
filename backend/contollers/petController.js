const asyncHandler = require('express-async-handler')
const Pets = require('../models/petModels')
const xlsx = require('xlsx')
const router = require('../routes/petRoutes')
const multer = require('multer')

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './public/uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });
 var upload = multer({ storage: storage }).single("demo_excel");

// @desc Get pets
// @route GET /api/pet
const getPets  = asyncHandler(async (req, res) => {
    const pets = await Pets.find()
    if(pets != ''){
        res.status(200).json(pets)
    }else{
        res.status(200).json({})
    }
})

// @desc Get pets
// @route GET /api/pet
const getPetByID  = asyncHandler(async (req, res) => {
    const pets = await Pets.findById(req.params.id)
    if(pets != ''){
        res.status(200).json(pets)
    }else{
        res.status(400).json({message: `No pet with id ${req.params.id}`})
    }
})


const addPets = asyncHandler(async (req, res) => {
    upload(req, res, (err) => {
     if(err) {
        console.log(err)
       res.status(400).send("Something went wrong!");
     }
     var workbook = xlsx.readFile(req.file.path)
     var sheet_namelist = workbook.SheetNames
     var x = 0;
     sheet_namelist.forEach( element => {
        var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]])
        let flag = true;
        xlData.forEach(async val => {
        if(!val.Name){
            res.status(400)
            flag = false
            throw new Error("Please fill name of the pet")
        }
        if(!val.Type){
            res.status(400)
            flag = false
            throw new Error( "Please fill Type of the pet")
        }
        if(!val.Breed){
            res.status(400)
            flag = false
            throw new Error("Please fill Breed of the pet")
        }
        if(!val.Age){
            res.status(400)
            flag = false
            throw new Error("Please fill Age of the pet")
        }
        if(flag){
            const pets = await Pets.create(val)
        }
        
        })
        x++
     })
     res.status(200).json({message: "Sheet added successfully"})
   });
 })

// @desc Patch pets
// @route PATCH /api/pet
const patchPet  =  asyncHandler(async (req, res) => {
    const pets = await Pets.findById(req.params.id)

    if(!pets){
        res.status(400)
        throw new Error('Pet not found')
    }
    var keys = Object.keys(req.body)
    for(var i=0; i<keys.length; i++){
        if(pets[keys[i]] && pets[keys[i]] !== req.body[keys[i]]){
            pets[keys[i]] = req.body[keys[i]]
        }
            
    }
    const updatedPets = await Pets.findByIdAndUpdate(req.params.id, pets)
    
    res.status(200).json({message: "PATCH successful"})
})

// @desc Delete pets
// @route DELETE /api/pet
const deletePet  = asyncHandler(async (req, res) => {
    const pets = await Pets.findById(req.params.id)

    if(!pets){
        res.status(400)
        throw new Error('Pet not found')
    }

    await pets.remove()
    
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getPets, getPetByID, addPets, patchPet, deletePet
}