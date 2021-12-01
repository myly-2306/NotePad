const router = require ('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');

router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
});

router.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuid(),
    };

    if (title && text) {
        readAndAppend(newNote, './db/db.json');
        res.json(`new note added!`);
    } else {
        res.json({
            message: `error! Note is not added!`
        });
    }
});

router.delete('/:id', (req, res) => {
    const deleteId = req.params.id;

    deleteFromFile(deleteId, './db/db.json');

    const response = {
        status: 'success'
    };

    res.json(response);
});

module.exports = router;