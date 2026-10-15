const router = require('express').Router()
const {updateUser} = require('../controller/studentController')

router.put('/updateUser id:', updateUser)

module.exports = router