const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})



// const Students = mongoose.model('Students', { //this second argument is an object , internally it converts to schema
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) { //validate is a middle ware to know more about it read documentation
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password cannot contain "password"')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a postive number')
//             }
//         }
//     }
// })

// the above is commented and is not wrong


//here i am creating a new schema

const StudentsSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true, //to use it as primary key
        trim: true,
        lowercase: true,
        validate(value) { 
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
    ,
    tokens: [{//it is a array of objects
        token: { //here we are defining how each object should look like
            type: String,
            required: true
        }
    }]
})
StudentsSchema.virtual('StudtoSub', { //here we can give any name , it would be a new virtual field of the StudentsSchema ,this given name will be used during papulate
    ref: 'Subjects', 
    localField: '_id',
    foreignField: 'owner'
})


//between schema and model middleware can be used

//here we are creating tokens for verifying logged in user
StudentsSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() },  process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token;
}

//here we will be verifying login
StudentsSchema.statics.findByCredentials = async (email, password) => {
    // console.log("email "+email);
    // console.log("password "+password);
    const student = await Students.findOne({ email })
    
    if (!student) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, student.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    // console.log(student);
    return student
}


//here we are hashing the password before saving
StudentsSchema.pre('save', async function(next){ //pre means we want to do something before saving it
    if (this.isModified('password')) {//  save comes into picture when password is modifed or new password is created
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();//this function is used to mark end of async function
})

//here the model is being created using the schema
const Students = mongoose.model('Students',StudentsSchema);
module.exports = Students;
