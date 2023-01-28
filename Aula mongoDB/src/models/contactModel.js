const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: false, default: ''},
    number: { type: String, required: false, default: ''},
    createdIn: { type: Date, default: Date.now}
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contac {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.valid();
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body);
    }

    static async idFinder(id) {
        if(typeof id !== 'string') return;
        const contact = await ContactModel.findById(id);
        return contact;
    }

    static async idShower() {
        const contact = await ContactModel.find();
        return contact;
    }

    static async delet(id) {
        if(typeof id !== 'string') return;
        const contact = await ContactModel.findOneAndDelete({_id: id});
        return contact;
    }

    valid() {
        this.cleanUp();

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if (!this.body.name) this.errors.push('Um nome é necessário');
        if (!this.body.email && !this.body.number) this.errors.push('é necessário um contato: email ou telefone');
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            email: this.body.email,
            number: this.body.number
        }
    }

    async edit(id) {
        if(typeof id !== 'string') return;
        this.valid();
        if(this.errors.value > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true});
    }
}

module.exports = Contac;