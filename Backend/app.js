const express = require('express')
const router = express.Router()
const userRoutes = require('./routes/userRoute')

router.use('/api',userRoutes)

module.exports = router;