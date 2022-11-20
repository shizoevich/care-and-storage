const express = require('express')
const userRouter = require('./routes/user.routes')
const adminRouter = require('./routes/admin.routes')
const workerRouter = require('./routes/worker.routes')
const port = process.env.PORT || 8080

const app = express()
app.use(express.json())


app.use('/api', userRouter)
app.use('/api', adminRouter)
app.use('/api', workerRouter)

app.listen(port, () => {console.log(`Listening on port ${port}...`)})