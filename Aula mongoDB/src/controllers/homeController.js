const contact = require('../models/contactModel');


exports.index = async (req, res) => {
    const contacts = await contact.idShower();
    res.render('index', {
        contacts
    });
}
