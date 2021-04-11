const express = require('express')
const { commands } = require("../../handlers/command")

const router = express.Router();


router.get('/', (req, res) => res.render('index'));
router.get('/commands', (req, res) => res.render('commands',{
    subtitle: "Commands",
    categories:[
    { name: 'Auto-Mod', icon: `fas fa-gavel`},
    { name: 'Fun', icon: `fas fa-gamepad`},
    { name: 'Anti-Alt', icon: `fas fa-users-slash`},
    { name: 'Music', icon: `fas fa-music`}
  ],
  commands: Array.from(commands.values()),
  commandsString: JSON.stringify(Array.from(commands.values()))
}));

module.exports = router;