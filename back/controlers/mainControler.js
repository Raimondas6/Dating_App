const { userSchema } = require('../schemas/userSchema')
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const user = req.body
        const newUser = new userSchema
        newUser.username = user.username
        newUser.password = await bcrypt.hash(user.password, 10)
        newUser.city = user.city
        newUser.gender = user.gender
        newUser.age = user.age
        try {newUser.save()}
        catch (e){console.log(e)}
        res.send({error: false, status: 'user registered successfully'})
    },
    login: async (req, res) => {
        const inputs = req.body
        const user = await userSchema.findOne({username: inputs.username})
        if (!user) return res.send({error: true, status: 'no such user'})
        const passMatch = await bcrypt.compare(inputs.password, user.password)
        if (passMatch){
            if (inputs.checkbox) req.session.user = user
            res.send({error: false, status: 'loged in successfully', user})
        } else res.send({error: true, status: 'wrong password'})
    },
    autoLogin: (req, res) => {
        if (req.session.user)
            return res.send({error: false, status: 'autologin successful', user: req.session.user})
        else res.send({error: true, status: 'no user'})
    },
    logout: (req, res) => {
        delete req.session.user
        res.send({error: false, status: 'you are logged out'})
    },
    imageUpload: async (req, res) => {
        const { user, image } = req.body
        let newUser = await userSchema.findByIdAndUpdate(user._id, {$push: {images: image}}, {new: true})
        const stockImg = 'https://icon-library.com/images/anonymous-icon/anonymous-icon-26.jpg'
        if (newUser.images[0] === stockImg) {
            newUser.images.shift()
            await userSchema.findByIdAndUpdate(user._id, {images:newUser.images})
        }
        res.send({error:false, status:'Image uploaded successfully', user: newUser})
    },
    users: async (req, res) => {
        const users = await userSchema.find({_id:{$ne:req.body._id}})
        res.send({error: false, status: 'all users retrieved successfully', users})
    },
    setFilter: async (req, res) => {
        const user = await userSchema.findByIdAndUpdate(req.body.user._id, {filterCity: req.body.city, filterGender: req.body.gender, filterAgeMax: req.body.ageMax}, {new: true})
        res.send({error: false, status: 'filter uploaded successfully', user})
    },
    like: async (req, res) => {
        const { loggedInUser, currentUser } = req.body
        let user = {}
        if (!loggedInUser.likesGiven.includes(currentUser._id))
            user = await userSchema.findByIdAndUpdate(loggedInUser._id, {$push: {likesGiven: currentUser._id}}, {new: true})
        if (!currentUser.likesGot.includes(loggedInUser._id))
            await userSchema.findByIdAndUpdate(currentUser._id, {$push: {likesGot: loggedInUser._id}})
        res.send({error: false, status:'user liked successfully', user})
    },
    getHistory: async (req, res) => {
        const users = await userSchema.find({_id: req.body.list})
        res.send({error: false, status: 'users found', users})
    }
}