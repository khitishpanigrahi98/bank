const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/StudentDatabase', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Subjects = mongoose.model('Subjects', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Students' //should be exactly same as the model name
    },
    bunk:{ //total no of absents
        type: Number,
    },
    totpresent:{
        type: Number,
        required: true,
    },
    absent:[String] //to store array of dates
    // absent:{
    //     type:Date
    // }
})

// const first=new Subjects({
//     name:"Biology",
//     absent: [1-1-1998,11-1-2009,23-12-2020] // notice the way I am storing dates instead of storing as dates
// })

// first.save().then(() => {
//     console.log(first)
// }).catch((error) => {
//     console.log('Error!', error)
// })

module.exports = Subjects;
