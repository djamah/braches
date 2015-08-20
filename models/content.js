var db = require('./config').db;

var contentSchema = db.Schema({
    title: String,
    content: String,
    date: Date,
    publish: Boolean,
    visual: String,
    preview: String,
    preview_img: String,
    show_main_page: Boolean
});

var Content = db.model('Content', contentSchema);

module.exports = Content;
