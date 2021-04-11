const express = require('express')
const app = express()
const { commands } = require("../handlers/command")

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/assets`))
app.locals.basedir = `${__dirname}/assets`;

app.get('/', (req, res) => res.render('index'));
app.get('/commands', (req, res) => res.render('commands',{
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

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server is ready on port ${port}, http://localhost:${port}`));