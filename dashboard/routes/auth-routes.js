const express = require('express');
const config = require("../../config.json")
const authClient = require("../auth-client");

const router = express.Router();

router.get('/login', (req, res) => 
res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.id}&redirect_uri=${config.dashboardURL}/auth&response_type=code&scope=identify guilds&prompt=none`));

router.get('/auth', async (req, res) => {
    try {
    const code = req.query.code;
    const key = await authClient.getAccess(code);
    res.cookies.set('key', key);
    res.redirect('/dashboard');
    } catch {
        res.render("/")
    }
})

module.exports = router;