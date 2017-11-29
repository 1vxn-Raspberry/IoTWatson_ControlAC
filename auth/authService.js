module.exports={
  ensureAuthenticated,
  isItOnOurBlueGroup
}
function ensureAuthenticated(req, res, next) {

     if(!req.isAuthenticated()) {

                    req.session.originalUrl = req.originalUrl;

             res.redirect('/login');

     } else {
             return next();

     }

}

function isItOnOurBlueGroup(array){
  if(array.indexOf('Devolpers_IoT')>-1||array.indexOf('monitoreocuartosIT')>-1)
    return true;
  else
    return false;


}
