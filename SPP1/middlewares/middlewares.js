export const getAllStatusesMiddleware = async (req, res, next)=> {
    req.statuses = await (await fetch(`${req.protocol}://${req.get('host')}/api/getAllStatuses/`)).json()
    next()
}