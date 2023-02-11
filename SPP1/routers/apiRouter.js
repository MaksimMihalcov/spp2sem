import {Router} from "express";
import {getAllStatuses} from "../controllers/statusController.js";
import {createTask, deleteTask, getAllTasks, getUpdateModel, updateTask} from "../controllers/taskController.js";

const router = Router()

router.get('/api/getAllTasks/:status', getAllTasks)

router.get('/api/getAllStatuses', getAllStatuses)

router.get('/api/getUpdateModel/:id', getUpdateModel)

router.post('/api/createTask', createTask)

router.post('/api/updateTask', updateTask)

router.post('/api/deleteTask/:id', deleteTask)

export default router;