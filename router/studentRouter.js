const router = require('express').Router()
const {updateStudents} = require('../controller/studentController')

router.put('/updateStudents id:', updateStudents)

module.exports = router