const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/update/:id_hd', controller.update);

module.exports = router;
