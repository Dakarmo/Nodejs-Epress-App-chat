const express =  require('express');
const router = express.Router();

/* Page d'accueil*/
router.get('/', function(req, resp) {
    // console.log('req.body = ', req.body);
    // console.log('req.cookie = ', req.cookie);
    resp.end('user')
})

router.post('/', function(req, resp) {
    console.log(req.body);
    resp.end('user edit')
})

module.exports = router;