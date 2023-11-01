module.exports.checkAuth = function(req,resp,next){
    const userid = req.session.userid

    if(!userid){
        resp.redirect('/login')
    }

    next()
}