exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Login necessário');
        req.session.save(() => res.redirect('back'));
        return;
    }
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('error');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}