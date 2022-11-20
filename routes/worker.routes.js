const Router = require('express')
const workerController = require('../controller/worker.controller')
const router = new Router()


router.get('/worker/:id1',workerController.getWorkerSensor)
router.post('/worker/:id2/sensor/:id1/product',workerController.createProduct)
router.delete('/worker/:id2/sensor/:id1/product/:id3/',workerController.deleteProduct)
router.put('/worker/:id2/sensor/:id1/product/:id3/',workerController.updateProduct)
router.get('/worker/:id2/sensor/:id1/',workerController.getSensorProducts)


module.exports = router