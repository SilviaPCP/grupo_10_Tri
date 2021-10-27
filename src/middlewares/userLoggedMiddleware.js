function userLoggedMiddleware(req, res, next){
    if (req.session && req.session.userLogged){
        res.locals.isLogged = true;   
    }
    else{
        res.locals.isLogged = false;
    }
    next();
}


module.exports =  userLoggedMiddleware; 
