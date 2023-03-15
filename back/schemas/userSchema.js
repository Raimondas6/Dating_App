const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    username:     {type: String, required: true},
    password:     {type: String, required: true},
    city:         {type: String, required: true},
    gender:       {type: String, required: true},
    age:          {type: String, required: true},
    images:       {type: Array,  required: true, default: ['https://icon-library.com/images/anonymous-icon/anonymous-icon-26.jpg']},
    likesGot:     {type: Array,  required: true},
    likesGiven:   {type: Array,  required: true},
    filterCity:   {type: String, required: true, default: 'Vilnius'},
    filterGender: {type: String, required: true, default: 'male'},
    filterAgeMin: {type: Number, required: true, default: 18},
    filterAgeMax: {type: Number, required: true, default: 50}
})

module.exports = {
    userSchema: mongoose.model('userSchema16', userSchema)
}