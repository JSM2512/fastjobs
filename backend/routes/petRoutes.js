const express = require('express')
const router = express.Router()
const {getPets, addPets, getPetByID, patchPet, deletePet} = require('../contollers/petController')

const multer = require('multer');



  
router.route('/').get(getPets).post(addPets)
router.route('/:id').get(getPetByID).patch(patchPet).delete(deletePet)


module.exports = router  