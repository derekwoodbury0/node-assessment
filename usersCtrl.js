let users = require('./userData.json')
let lastId = 100

module.exports = {
    getUsers: (req, res) => {
        let { age, email, favorites } = req.query

        if (age) {
            return res.status(200).send(users.filter(user => {
                return +user.age < age
            }))
        } else if (email) {
            return res.status(200).send(users.filter(user => {
                return user.email === email
            }))
        } else if (favorites) {
            return res.status(200).send(users.filter(user => {
               return user.favorites.includes(favorites)
            }))
        } else {
            res.status(200).send(users)
        }
    },
    
    getUser: (req, res) => {
        let { userId } = req.params
        let index = users.findIndex(user => +user.id === +userId)
        if (index === -1) {
            res.sendStatus(404)
        } else {
        res.status(200).send(users[index])
        }
    },

    getAdmin: (req, res) => {
        let admins = users.filter(user => {
            return user.type === 'admin'
        })
        res.status(200).send(admins)
    },

    getNonAdmin: (req, res) => {
        let nonAdmins = users.filter(user => {
            return user.type !== 'admin'
        })
        res.status(200).send(nonAdmins)
    },

    getUsersByType: (req, res) => {
        let { userType } = req.params
        let newUsers = users.filter(user => {
            return user.type === userType
        })
        res.status(200).send(newUsers)
    },

    updateUser: (req, res) => {
        let { userId } = req.params
        let updatedInfo = req.body
        updatedInfo.id = +userId
        console.log(updatedInfo)
        let index = users.findIndex(user => +user.id === +userId)
        users.splice(index, 1, updatedInfo)
        res.status(200).send(users)
    },

    newUser: (req, res) => {
        let newUser = req.body
        lastId++
        newUser.id = lastId
        users.push(newUser)
        res.status(200).send(users)        
    },

    deleteUser: (req, res) => {
        let { userId } = req.params
        let index = users.findIndex(user => +user.id === +userId)
        if (index === -1) {
            res.sendStatus(404)
        }
        users.splice(index, 1)
        res.status(200).send(users)
    }
}