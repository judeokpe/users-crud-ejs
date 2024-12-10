import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';


let users = [
    {id:1, name: "John", age: 23},
    {id:2, name: "Jude", age: 21},
]

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res)=>{
    res.redirect('/users')
})

app.get('/users', (req, res)=>{
    res.render('user-list', {users})
})

app.get('/users/add', (req, res)=>{
    res.render('add-user.ejs')
})

app.post('/users/add', (req, res)=>{
    const {name , age} = req.body;
    const newUser = {id: users.length +1, name, age}

    users.push(newUser);
    res.redirect('/users')
})

app.get('/users/single-user/:id', (req, res)=>{
    const {id} = req.params;
    const user = users.find((u)=>u.id === parseInt(id))
    res.render('single-user.ejs', {user})
})

app.get('/users/edit/:id', (req, res)=>{
    const {id}= req.params;
    const user = users.find((u)=>u.id === parseInt(id))
    res.render('edit-user.ejs', {user})
})

app.post('/users/edit/:id', (req, res)=>{
    const {id} = req.params;
    const {name, age} = req.body;

    const user =  users.find((u)=>u.id === parseInt(id))
    user.name = name;
    user.age = age;
    res.redirect('/users')
})


app.post('/users/delete/:id', (req, res)=>{
    const {id} = req.params;

    const user = users.find(u=>u.id === parseInt(id));
    users = users.filter(u=>u.id !== parseInt(id))

    res.redirect('/users')
})


const Port = 4000;
app.listen(Port, ()=>{
    console.log(`server running on port ${Port}`)
})




