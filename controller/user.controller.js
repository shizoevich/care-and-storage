const db = require('../db')


class UserController{

    async createWorker(req, res){
        const user_id = req.params.id
        const{email, password} = req.body
        const newWorker = await db.query('INSERT INTO "User"(email, password, admin, worker, owner_id ) values ($1, $2, $3, $4 ,$5) RETURNING *', 
        [email, password,'0','1', user_id]); 
        res.json(newWorker.rows[0])
    }

    async updateUser(req,res){
        const user_id = req.params.id
        const worker_id = req.params.id1
        const{email, password} = req.body
        const user = await db.query('UPDATE "User" set email = $1, password = $2, admin = $3, worker = $4, owner_id=$5  WHERE user_id = $6 RETURNING *', 
        [email, password, 0, 1, user_id, worker_id])
        res.json(user.rows[0])
    }
    async deleteWorker(req,res){
        const user_id = req.params.id
        const worker_id = req.params.id1
        const user = await db.query('DELETE from "User" WHERE owner_id = $1 and user_id = $2 RETURNING *', 
        [user_id, worker_id])
        res.json(user.rows[0])
    }
    async getWorkers(req, res){
        const user_id = req.params.id
        const Workers = await db.query('select * from "User" where owner_id = $1 and admin = false and  worker =true',
        [user_id])
        res.json(Workers.rows)
    }
    async getWorkerSensor(req, res){
        const user_id = req.params.id
        const worker_id = req.params.id1
        const Workers = await db.query('select "Sensor".sensor_id  from "Sensor" left join "User" on "Sensor".user_id = "User".owner_id where "User".user_id= $1 and "User".owner_id = $2',
        [worker_id, user_id])
        res.json(Workers.rows)
    }
    async getSensor(req, res){
        const sensor_id = req.params.id
        const Sensor = await db.query('select * from "Sensor" where sensor_id = $1',
        [sensor_id])
        res.json(Sensor.rows)
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
    async getSensorProducts(req, res){
        const sensor_id = req.params.id1
        const getSensorProduct = await db.query('select "Sensor".sensor_id, "Product".*  from "Sensor" left join "Product" on "Sensor".sensor_id = "Product".sensor_id where "Sensor".sensor_id= $1',
        [sensor_id])
        res.json(getSensorProduct.rows)
    }
}
module.exports = new UserController()