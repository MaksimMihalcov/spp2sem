import sqlite3 from 'sqlite3'

const TABLE_NAME = 'tasks'
const sqlite = sqlite3.verbose()
const db = new sqlite.Database('./models/spp2.db', sqlite3.OPEN_READWRITE,(err)=>{
    if(err) throw err
})

db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, TABLE_NAME, (err, row) => {
    if (row === undefined)
        db.run(`CREATE TABLE ${TABLE_NAME}(id INTEGER PRIMARY KEY, text, status, completionDate)`);
})

export const getAllTasks = (req, res) => {
    db.all(`SELECT * FROM ${TABLE_NAME} WHERE status=?`, [req.params.status], (err, rows)=>{
        if(err) {
            console.log(err)
            return res.status(500).json([])
        }
        return res.status(200).json(rows)
    })
}

export const getUpdateModel = (req, res) => {
    db.all(`SELECT * FROM ${TABLE_NAME} WHERE id=?`, [req.params.id], (err, rows)=>{
        if(err) {
            console.log(err)
            return res.status(500).json([])
        }
        return res.status(200).json(rows[0]);

    })
}

export const createTask = (req, res) => {
    const {text, status, date} = req.body
    db.run(`INSERT INTO ${TABLE_NAME}(text, status, completionDate) VALUES (?, ?, ?)`, [text, status, date], (err)=>{
        if(err) throw err
    })
    res.end()
}

export const updateTask = (req, res) => {
    const {id, text, status, date} = req.body
    db.run(`UPDATE ${TABLE_NAME} SET text=?, status=?, completionDate=? WHERE id=?`, [text, status, date, id], (err)=>{
        if(err) throw err
    })
    res.end()
}

export const deleteTask = (req, res) => {
    db.run(`DELETE FROM ${TABLE_NAME} WHERE id=?`, [req.params.id], (err)=>{
        if(err) throw err
    })
    res.end()
}