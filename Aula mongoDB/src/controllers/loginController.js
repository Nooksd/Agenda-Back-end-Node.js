const Login = require('../models/loginModel')

exports.index = (req, res) => {
    if (req.session.user) return res.render('usuario-logado')
    res.render('login');
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Usuário criado com sucesso');
        req.session.save(() => {
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e)
        res.render('error');
    }


}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Bem vindo de volta');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e)
        res.render('error');
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}