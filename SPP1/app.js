import express from 'express'
import path from "path";
import apiRouter from "./routers/apiRouter.js";
import {getAllStatusesMiddleware} from "./middlewares/middlewares.js";

const PORT = 3000
const app = express()
const __dirname = path.resolve()

app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.set('views',path.resolve(__dirname, 'templates'))
app.use(apiRouter)
app.use(getAllStatusesMiddleware)

app.get('/create', async (req, res)=>{
    res.render('crupdate', {actionType:'Create', title:'Create task', statuss: req.statuses})
})

app.get('/update/:id', async (req, res)=>{
    let model = await (await fetch(`${req.protocol}://${req.get('host')}/api/getUpdateModel/${req.params.id}`)).json()
    res.render('crupdate', {actionType:'Update', title:'Update task', statuss: req.statuses, model: model})
})

app.get('/:taskStatus?', async (req, res)=>{
    let taskList = []
    let status = (typeof req.params.taskStatus === 'undefined') ? req.statuses[0] : req.params.taskStatus
    //if (!(req.statuses.includes(status))) return
    taskList = await (await fetch(`${req.protocol}://${req.get('host')}/api/getAllTasks/${status}`)).json()
    res.render('index', {title:'Task List', taskList: taskList, statuss: req.statuses, currentStatus: status})
})

app.post('/delete/:id', async (req, res) => {
    await fetch(`${req.protocol}://${req.get('host')}/api/deleteTask/${req.params.id}`, {method: 'POST'})
    res.writeHead(302, {
        'Location': `${req.protocol}://${req.get('host')}/`
    });
    res.end();
})

app.post('/create', async(req, res) => {
    const {taskText, taskStatus, taskDate} = req.body
    await fetch(`${req.protocol}://${req.get('host')}/api/createTask`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text: taskText, status: taskStatus, date: (new Date(taskDate).toLocaleDateString())})
    });
    res.writeHead(302, {
        'Location': `${req.protocol}://${req.get('host')}/`
    });
    res.end();
})

app.listen(PORT, ()=>{
    console.log("workin")
})