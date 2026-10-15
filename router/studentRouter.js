const router = require('express').Router()
const {updateStudents, newStudent, oneStudent} = require('../controller/studentController')

router.put('/updateUser/:id', updateStudents)
router.post('/create', newStudent)
router.get('/getOne/:id', oneStudent)

module.exports = router;
