const router = require('express').Router()
const {updateStudents, newStudent, oneStudent, deleteStudents} = require('../controller/studentController')

router.put('/updateUser/:id', updateStudents)
router.post('/create', newStudent)
router.get('/getOne/:id', oneStudent)
router.delete('/delete/:id', deleteStudents)

module.exports = router;
