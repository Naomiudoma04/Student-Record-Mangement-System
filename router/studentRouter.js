const router = require('express').Router()
const {updateStudent} = require('../controller/studentController')

router.put('/updateStudent id:', updateStudent)

module.exports = router