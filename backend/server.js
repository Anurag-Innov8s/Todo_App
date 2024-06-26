const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const pool = require('./db')
const cors = require('cors')
const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.get('/',(req,res)=>{
    res.send("Server is running")
}) 
app.use(cors());   
app.use(express.json()) 

// get todo
app.get('/todos/:userMail', async(req,res)=>{
    const userMail = req.params.userMail
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email=$1',[userMail])
        res.json(todos.rows)
    } catch (error) {
        console.error(error);
    }
})


// create todo
app.post("/todos",async (req,res)=>{
    const {user_email,title,progress,date} =req.body;
    const id = uuidv4(); 
    try { 
        const new_todo = await pool.query(`INSERT INTO todos(id,user_email,title,progress,date) VALUES ($1,$2,$3,$4,$5)`,
        [id, user_email, title, progress,date])
        res.json(new_todo)
    } catch (error) {
        console.error(error)
    }
})


// update todo

app.put("/todos/:id",async(req,res)=>{
    const {id} = req.params;
    const {user_email,title,progress,date} =req.body;
    try {
        const edit_todo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5',[user_email,title,progress,date,id])
        res.json(edit_todo)
    } catch (error) {
        console.error(error);
    }
})

app.delete("/todos/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const del_todo = await pool.query('DELETE FROM todos WHERE id = $1',[id])
        res.json(del_todo)
    } catch (error) {
        console.error(error);
    }
})

//signup 

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
  
    try {
      const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
        [email, hashedPassword])
    
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
      
      res.json({ email, token })
    } catch (err) {
      console.error(err)
      if (err) {
        res.json({ detail: err.detail})
      }
    }
  })

  // login

  app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  
      if (!users.rows.length) return res.json({ detail: 'User does not exist!' })
      
      const success = await bcrypt.compare(password, users.rows[0].hashed_password)
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
  
      if (success) {
        res.json({ 'email' : users.rows[0].email, token})
      } else {
        res.json({ detail: "Login failed"})
      }
    } catch (err) {
      console.error(err)
    }
  })
  

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
}) 