const router = require ('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');

router.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
});

router.post('/', (req, res) => {
    console.log(red.body);

    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        note_id: uuid(),
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

router.delete('/:note_id', (req, res) => {
    const id = req.params.note_id;
    deleteFromFile(id, './db/db.json');
    res.json(`delete sucessfully!`)
})

module.exports = router;