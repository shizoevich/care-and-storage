const db = require('../db')

class AdminController{
    async createUser(req, res){
        
        const{email, password, admin, worker,owner_id} = req.body
        const user_id = req.params.id
        const newUser = await db.query('INSERT INTO "User"(email, password, admin, worker, owner_id) values ($1, $2, $3, $4 ,$5) RETURNING *', 
        [email, password, '0', '0',user_id]) 
        res.json(newUser.rows[0])
    }
    async deleteUser(req,res){
        const user_id = req.params.id
        const user = await db.query('DELETE from "User" where user_id = $1 and admin = false and  worker =false', [user_id])
        res.json(user.rows)
    }
    async updateUser(req,res){
        const id = req.params.id
        const{email, password, admin, worker, owner_id} = req.body
        const user = await db.query('UPDATE "User" set email = $1, password = $2, admin = $3, worker = $4, owner_id = $6 WHERE user_id = $5 and admin = false and  worker =false RETURNING *', 
        [email, password, admin, worker, id, owner_id])
        res.json(user.rows[0])
    }
    async createSensor(req, res){
        
        const{temp,humidity, gps} = req.body
        const user_id = req.params.id
        const newUser = await db.query('INSERT INTO "Sensor"(temp,humidity, gps, user_id) values ($1, $2, $3, $4) RETURNING *', 
        [temp,humidity, gps, user_id]) 
        res.json(newUser.rows[0])
    }
    async deleteSensor(req,res){
        const user_id = req.params.id1
        const sensor_id = req.params.id2
        const deleteSensor = await db.query('DELETE from "Sensor" where user_id = $1 and sensor_id = $2', [user_id, sensor_id])
        res.json(deleteSensor.rows)
    }
    async getUsers(req, res){
        
        const Users = await db.query('select * from "User" where admin = false and  worker =false ')
        res.json(Users.rows)
    }
    async getUserSensors(req, res){
        const user_id = req.params.id
        const Users = await db.query('select "Sensor".sensor_id  from "Sensor" left join "User" on "Sensor".user_id = "User".user_id where "User".user_id= $1 ',[user_id])
        res.json(Users.rows)
    }
}

module.exports = new AdminController()