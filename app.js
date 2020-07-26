const express = require('express')
const path = require('path')
const app = express()
const Student = require('./StudentDatabase.js')
const Subject = require('./Subjects.js')
const auth = require('./auth')
const size = require('window-size');
const device = require('express-device');
const hbs = require('hbs')
const port = process.env.PORT
const publicDirectoryPath =__dirname;
app.use(express.json()) //JSON to object Automatic conversion
const viewsPath = path.join(__dirname, './views')
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(device.capture());
let subjectdata;

app.get('',(req,res)=>{
    
    if(req.device.type.toUpperCase()==="DESKTOP")
    {
        console.log("Mobile");
        res.sendFile(publicDirectoryPath+'/login.html');
        
    }
    else {
        console.log("Desktop");
        res.sendFile(publicDirectoryPath+'/mlogin.html');
    }
    // res.send('room'); //this will not work
})
app.get('/moblogin',(req,res)=>{
    res.sendFile(publicDirectoryPath+'/mlogin.html');
    // res.send('room'); //this will not work
})
app.get('/msignup',(req,res)=>{
    res.sendFile(publicDirectoryPath+'/msignup.html');
    // res.send('room'); //this will not work
})

app.get('/login',(req,res)=>{
    res.sendFile(publicDirectoryPath+'/login.html');
    // res.send('room'); //this will not work
})

app.get('/signup',(req,res)=>{
    res.sendFile(publicDirectoryPath+'/signup.html');
    // console.log(req.body);
})

// app.get('/data',auth,async(req,res)=>{   // it is 100% and working I just trying to modify it
//     await req.student.populate('StudtoSub').execPopulate()
//     subjectdata=req.student.StudtoSub
//     res.sendFile(publicDirectoryPath+'/attendence.html');
//     // res.send('room'); //this will not work
// })
app.get('/data',auth ,async (req, res) => {
    await req.student.populate('StudtoSub').execPopulate()
    subjectdata=req.student.StudtoSub
    var array=[];
    var outputArray = []; 
    await subjectdata.forEach(val => {
        array.push(val.name);
        // console.log("pushed "+val.name);
    });             
    var count = 0; 
    var start = false; 
    
    for (j = 0; j < array.length; j++) { 
        for (k = 0; k < outputArray.length; k++) { 
            if ( array[j] == outputArray[k] ) { 
                start = true; 
            } 
        } 
        count++; 
        if (count == 1 && start == false) { 
            outputArray.push(array[j]); 
        } 
        start = false; 
        count = 0; 
    }                                 
    // console.log("before");
    // console.log(outputArray);
    const retsub=[];
    outputArray.forEach((element)=>{
        retsub.push({name:element});
    })
    // res.render('data', {values: subjectdata})
    res.render('screen', {values: retsub})
})

app.get('/addsubject',async(req,res)=>{
    res.sendFile(publicDirectoryPath+'/subject.html');
    // value = value.split(" ").join("") remember to remove spaces between subject names
    // res.send('room'); //this will not work
})

app.get('/error',async(req,res)=>{
    res.sendFile(publicDirectoryPath+'/error.html');
    // value = value.split(" ").join("") remember to remove spaces between subject names
    // res.send('room'); //this will not work
})

app.get('/findsubject',auth,async(req,res)=>{
    await req.student.populate('StudtoSub').execPopulate()
    subjectdata=req.student.StudtoSub
    res.send( subjectdata);
})

app.get('/thank',async(req,res)=>{
    res.sendFile(publicDirectoryPath+'/thankyou.html');
})

app.get('/addsubject',auth,async(req,res)=>{
    // value = value.split(" ").join("") remember to remove spaces between subject names
     // const subject = new Subject(req.body) as we cannot directly create subjects rather we have to use a user
     const subject = new Subject({
        ...req.body,
        owner: req.student._id
    })
    subject.save().then(() => {
        res.send(subject)
    }).catch((e) => {
        res.send({bad:e})   //notice how we are sending status
    })
    // res.send('room'); //this will not work
})

app.post('/signup',async (req,res)=>{
    
    // console.log("New sign up request")
    // console.log(req.body);
    const student = new Student(req.body)
    student.save().then(() => {
        // res.send({student})
        student.generateAuthToken().then((token)=>{
            res.send({student,token})
        })
        
    }).catch((e) => {
        // res.status(400).send(e)
        res.send({bad:e}) 
    })
})


app.post('/login', async (req, res) => {
    try {
        // console.log("req  "+req.body);
        // console.log(req.body);
        // console.log("email "+req.body.email);
        // console.log("password "+req.body.password);
        console.log("in try 0");
        const student = await Student.findByCredentials(req.body.email, req.body.password) //a custom method defined by us
        // console.log("Inside "+student);
        const token = await student.generateAuthToken().then((token)=>{
            res.send({student,token})
        })
    } catch (e) {
        console.log(e);
        console.log("in catch");
        res.send({bad:e}) 
    }
})

app.post('/addsubject',auth,async (req,res)=>{
    
    // console.log("New add subject request")
    // console.log(req.body);
     // const subject = new Subject(req.body) as we cannot directly create subjects rather we have to use a user
     const subject = new Subject({
        ...req.body,
        owner: req.student._id
    })
    subject.save().then(() => {
        res.send(subject)
    }).catch((e) => {
        res.send({bad:e})    //notice how we are sending status
    })
})


app.post('/logout', auth, async (req, res) => {
    try {
        req.student.tokens = req.student.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.student.save()
        res.send({stat:"True"})
    } catch (e) {
        res.send({bad:e}) 
    }
})





app.get('/mobdata',auth ,async (req, res) => {
    await req.student.populate('StudtoSub').execPopulate()
    subjectdata=req.student.StudtoSub
    var array=[];
    var outputArray = []; 
    await subjectdata.forEach(val => {
        array.push(val.name);
        // console.log("pushed "+val.name);
    });             
    var count = 0; 
    var start = false; 
    
    for (j = 0; j < array.length; j++) { 
        for (k = 0; k < outputArray.length; k++) { 
            if ( array[j] == outputArray[k] ) { 
                start = true; 
            } 
        } 
        count++; 
        if (count == 1 && start == false) { 
            outputArray.push(array[j]); 
        } 
        start = false; 
        count = 0; 
    }                                 
    // console.log("before");
    // console.log(outputArray);
    const retsub=[];
    outputArray.forEach((element)=>{
        retsub.push({name:element});
    })
    // res.render('data', {values: subjectdata})
    res.render('mobdata', {values: retsub})
})

app.get('/nodemcu',async(req,res)=>{
    res.send("Hi from server , response of get request");
})

app.get('/nodemcujson',async(req,res)=>{
    res.send({ans:"Hello from server get resonse" ,v2:"I agree"});
})

app.post('/nodemcujson',async(req,res)=>{
    // console.log(req.body);
    res.send({reply:req.body});
})

app.post('/nodemcu',async(req,res)=>{
    res.send("Hi from server , response of post request");
})

app.get('/*',auth,async(req,res)=>{
    res.sendFile(publicDirectoryPath+'/error.html');
})



app.listen(port, () => {
    // console.log('Server is up on port ' + port)
})