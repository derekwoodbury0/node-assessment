let express = require('express')
let app = express()
require('dotenv').config()

let { SERVER_PORT } = process.env

let usersCtrl = require('./usersCtrl')

app.use(express.json())


app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))

app.get('/api/user', usersCtrl.getUsers)
app.get('/api/user/:userId', usersCtrl.getUser)
app.get('/api/admin', usersCtrl.getAdmin)
app.get('/api/nonadmin', usersCtrl.getNonAdmin)
app.get('/api/type/:userType', usersCtrl.getUsersByType)
app.put('/api/user/:userId', usersCtrl.updateUser)
app.post('/api/user', usersCtrl.newUser)
app.delete('/api/user/:userId', usersCtrl.deleteUser)