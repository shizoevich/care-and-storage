const Router = require('express')
const userController = require('../controller/user.controller')
const router = new Router()

router.put('/user/:id/worker/:id1',userController.updateUser)
router.post('/user/:id/worker',userController.createWorker)
router.delete('/user/:id/worker/:id1',userController.deleteWorker)
router.get('/user/:id/worker',userController.getWorkers)
router.get('/user/:id/worker/:id1',userController.getWorkerSensor)
router.get('/user/:id2/worker/:id1/sensor/:id',userController.getSensor)
router.post('/user/:id2/sensor/:id1/product',userController.createProduct)
router.delete('/user/:id2/sensor/:id1/product/:id3/',userController.deleteProduct)
router.put('/user/:id2/sensor/:id1/product/:id3/',userController.updateProduct)
router.get('/user/:id2/sensor/:id1',userController.getSensorProducts)

module.exports = router