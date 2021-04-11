const express = require('express')

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', (req, res) => res.render('dashboard/index'));

module.exports = router;