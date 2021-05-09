const express = require('express')
const mysql = require('mysql2')

// DATABASE CONNECTION

var pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wad_lab7',
});

// EXPRESS

const app = express()

app.use(express.json()); // BODY PARSER

// Sign in
app.post('/signin', (req, res) => {
    console.log('client attempts signing in ...')
    const username = req.body.username
    const password = req.body.password

    pool.getConnection((err, con) => {
        if(err) {
            console.log(err)
            res.status(500).json({err: err})
            return
        }

        const sql = "SELECT * FROM student WHERE StudentID = ?"

        con.query(mysql.format(sql, [username]), (err, rows) => {
            con.release()
            if (err) {
                console.log(err);
                res.status(500).json({err: err})
                return
            }
            if (rows.length === 0) {
                res.json({err: 'username was not found in database'})
                return
            }
            if (password !== username) {
                res.json({err: 'username and password mismatch'})
                return
            }
            res.status(200).json({student: rows[0]})
        })
    })
})

// Get All Courses
app.get('/courses/:studentID', (req, res) => {
    const studentID = req.params.studentID
    console.log(`client (student_id = ${studentID}) attempts getting all courses ...`)
    pool.getConnection((err, con) => {
        if(err) {
            console.log(err)
            return
        }

        const sql = "SELECT * FROM course"

        con.query(sql, (err, rows) => {
            con.release()
            if (err) {
                console.log(err);
                res.status(500).json({err: err})
                return
            }
            res.status(200).json(rows)
        })
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))