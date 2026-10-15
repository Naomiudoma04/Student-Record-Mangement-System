const router = require('express').Router()
const {updateStudents, deleteStudents} = require('../controller/studentController')

router.put('/updateStudents/updateid:', updateStudents)

router.delete('/deleteStudents/studentid:', deleteStudents)

module.exports = router