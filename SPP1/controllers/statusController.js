import {statuses} from "../models/statuses.js";

export const getAllStatuses = (req, res) => {
    return res.status(200).json(statuses)
}