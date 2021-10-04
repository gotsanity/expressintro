// dependencies
var express = require('express');
var router = express.Router();

// --------------------------------------------------------- Endpoints/Routes

// base route localhost:port/
router.get('/', function(req, res) {
    res.send("root");
})



// ----------------------------------------------------------------- end routes/endpoints

module.exports = router;