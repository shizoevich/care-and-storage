const db = require('../db')

class WorkerController{
    async getWorkerSensor(req, res){
        const worker_id = req.params.id1
        const Sensors = await db.query('select "Sensor".sensor_id  from "Sensor" left join "User" on "Sensor".user_id = "User".owner_id where "User".user_id= $1 and  "Sensor".user_id = "User".owner_id',
        [worker_id])
        res.json(Sensors.rows)
    }
    async getSensorProducts(req, res){
        const sensor_id = req.params.id1
        const getSensorProduct = await db.query('select "Sensor".sensor_id, "Product".*  from "Sensor" left join "Product" on "Sensor".sensor_id = "Product".sensor_id where "Sensor".sensor_id= $1',
        [sensor_id])
        res.json(getSensorProduct.rows)
    }
    async createProduct(req, res){
        const sensor_id = req.params.id1
        const{product_name, temp_min, temp_max, humidity_min, humidity_max, expiration_date} = req.body
        const newProduct = await db.query('INSERT INTO "Product"(product_name, temp_min, temp_max, humidity_min, humidity_max, expiration_date, sensor_id) values ($1, $2, $3, $4 ,$5, $6, $7) RETURNING *', 
        [product_name, temp_min, temp_max, humidity_min, humidity_max, expiration_date, sensor_id]); 
        res.json(newProduct.rows[0])
    }
    async deleteProduct(req,res){
        const sensor_id = req.params.id1
        const product_id = req.params.id3
        const deleteProduct  = await db.query('DELETE from "Product" WHERE sensor_id = $1 and product_id = $2 RETURNING *', 
        [sensor_id , product_id])
        res.json(deleteProduct.rows[0])
    }
    async updateProduct(req,res){
        const product_id = req.params.id3
        const sensor_id = req.params.id1
        const{product_name, temp_min, temp_max, humidity_min, humidity_max, expiration_date} = req.body
        const updateProduct = await db.query('UPDATE "Product" set product_name = $1, temp_min = $2 , temp_max = $3 , humidity_min = $4 , humidity_max = $5 , expiration_date = $6 , sensor_id = $7 WHERE product_id = $8 RETURNING *', 
        [product_name, temp_min, temp_max, humidity_min, humidity_max, expiration_date, sensor_id, product_id])
        res.json(updateProduct.rows[0])
    }
}
module.exports = new WorkerController()