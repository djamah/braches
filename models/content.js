var db = require('./config').db;

var contentSchema = db.Schema({
    title: String,
    content: String,
    date: String,
    publish: Boolean,
    visual: String,
    preview: String,
    preview_img: String,
    show_main_page: Boolean,
    file: String
});

var Content = db.model('Content', contentSchema);

module.exports = Content;
