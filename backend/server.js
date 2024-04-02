const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const pool = require('./db')
const cors = require('cors')
app.get('/',(req,res)=>{
    res.send("Server is running")
}) 
app.use(cors());    
app.get('/todos/:userMail', async(req,res)=>{
    const userMail = req.params.userMail
    // console.log(userMail);
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email=$1',[userMail])
        res.json(todos.rows)
    } catch (error) {
        console.error(error);
    }
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
}) 