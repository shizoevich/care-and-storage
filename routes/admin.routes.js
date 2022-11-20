const Router = require('express')
const AdminController = require('../controller/admin.controller')
const router = new Router()

router.post('/admin/:id/user',AdminController.createUser)
router.delete('/admin/user/:id',AdminController.deleteUser)
router.put('/admin/user/:id',AdminController.updateUser)
router.post('/admin/user/:id/sensor/',AdminController.createSensor)
router.delete('/admin/user/:id1/sensor/:id2/',AdminController.deleteSensor)
router.get('/admin/user',AdminController.getUsers)
router.get('/admin/user/:id',AdminController.getUserSensors)

module.exports = router