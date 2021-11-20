let Express = require("express");
let router = Express.Router();
const { models } = require("../models");
let validateJWT = require("../middleware/validate-jwt");

// Log Create
router.post("/create", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    LogModel.create(logEntry)

});

// Get All Logs
router.get("/all", async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get Logs by User
router.get("/log/:log_id", (req, res) => {
    models.LogModel.findOne({
        where: {
            id: req.params.log_id
        }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.json(err))
});

// Update Logs
router.put('/log/:log_id', validateJWT, (req, res)=> {
    const {description, definition, result} = req.body.log;

    models.LogModel.update({
        description,
        definition,
        result
    }, {
        where: {
            id: req.params.log_id
        }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({
        error: err
    }))
});

// Delete Logs
router.delete('/log/:log_id', validateJWT, (req, res) => {
    models.LogModel.destroy({
        where: {
            id: req.params.log_id
        }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({
        error: err
    }))
});

module.exports = router;