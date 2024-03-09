const express =  require('express');
const router = express.Router();

/* Page d'accueil*/
router.get('/', function(req, resp) {
    // resp.end('Message depuis le fichier indes .  js !')
    // console.log(req.user);

    if(!req.user){
       return resp.redirect('login');
    }
    resp.render('index');
})

module.exports = router;