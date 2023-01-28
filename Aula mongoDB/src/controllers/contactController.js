const Contact = require("../models/contactModel");

exports.index = (req, res) => {
    if (!req.session.user) return res.render('notAllowed');
    res.render('contact', {
        contact: {},
    });
}

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => res.redirect('back'))
            return;
        }

        req.flash('success', 'contato criado');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`))
        return
    } catch (e) {
        console.log(e);
        return res.render('error');
    }
}

exports.editContact = async (req, res) => {
    if (!req.params.id) return res.render('error');

    const contact = await Contact.idFinder(req.params.id);
    if (!contact) return res.render('error');

    res.render('contact', {
        contact
    })
}

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) res.render('error');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => res.redirect('back'))
            return;
        }

        req.flash('success', 'contato editado');
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`))
        return
    } catch (e) {
        console.log(e);
        res.render('error');
    }
}

exports.delet = async (req, res) => {
    try {

        if (!req.params.id) return res.render('error');

        const contact = await Contact.delet(req.params.id);
        if (!contact) return res.render('error');


        req.flash('success', 'contato apagado');
        req.session.save(() => res.redirect(`back`));
    } catch (e) {
        console.log(e);
        res.render('error');
    }
}