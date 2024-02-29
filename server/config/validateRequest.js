module.exports = function(req, res, next) {

if (req.user) {
    console.log("권한체크1 userid : ", sess.userid) ;
    // console.log("권한체크1 userid : ", req.user.userid) ;
    next(); // To move to next middleware
  } else {
    console.log("권한체크2 ") ;
    var err = new Error('custom error');
    err.status = 404;

    next(err);
  }
};
