var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res)=>res.render('index'));

router.get('/login',(req, res)=>res.render('login'));

/* GET create account page. */
//router.get('/create_account',function(req,res,next){
  //console.log(__dirname);
  //res.sendfile(htmlDir+'/create_account.html');
//});
// Get creation account page
router.get('/create_account', (req, res)=>res.render('create_account'));
module.exports = router;
