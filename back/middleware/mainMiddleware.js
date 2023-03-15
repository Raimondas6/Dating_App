const { userSchema } = require('../schemas/userSchema')
const { cities, genders } = require('../modules/module')
module.exports = {
    checkInputsOnRegister: async (req, res, next)=>{
        const user = req.body
        const check = await userSchema.find({username: user.username})
        if (check.length === 1)                  return res.send({error: true, status: 'username taken'})
        if (check.length > 1) console.log('douplicate usernames in db')
        if (user.username.length < 5)            return res.send({error: true, status: 'username too short'})
        if (!RegExp('^(?=.*?[A-Z])').test(user.username)) return res.send({error: true, status: `username must include a Capital letter`})
        if (!(user.password.length <= 30))       return res.send({error: true, status: 'password too long'})
        if (!(user.password.length > 5))         return res.send({error: true, status: 'password too short'})
        if (!(cities.includes(user.city)))       return res.send({error: true, status: 'wrong city'})
        if (!(genders.includes(user.gender)))    return res.send({error: true, status: 'wrong gender'})
        if (!(18 <= user.age && user.age <= 50)) return res.send({error: true, status: 'wrong age'})
        next()
    },
    imageUploadCheck: async (req, res, next) => {
        let { user, image } = req.body
        if (!user) return res.send({error: true, status: 'please login'})
        if (!(image.length > 0)) return res.send({error: true, status: 'no image url'})
        if (user.images.includes(image)) return res.send({error: true, status: 'image already uploaded'})
        next()
    }
}