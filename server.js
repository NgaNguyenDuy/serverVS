var vf = require('vf');
var boot = require('vsoft-boot');
var bodyParser = require('body-parser');

var app = vf();


app.use(vf.favicon());
app.use(bodyParser.urlencoded({ extended: true }));
boot(app, __dirname);


var ds = app.datasources.db,
    info = app.models.info;


app.post('/info', function(req, res){
    var obj = {};
    // obj.Name = req.body.itb_ajax_form.name;
    // obj.email = req.body.itb_ajax_form.email;
    // obj.comment = req.body.itb_ajax_form.comments;
    
    obj.Name = req.body.name;
    obj.email = req.body.email;
    obj.comment = req.body.comments;
    
    info.create(obj, function(err) {
        if (err) return;
        res.send('OK');
        // res.redirect('http://vsoft.vn');
        // console.log('success');
    });
});




app.use(vf.urlNotFound());
app.use(vf.errorHandler());


app.start = function() {
    return app.listen(function() {
        app.emit('started');
        console.log('Server was running at %s', app.get('url'));
    });
};

//if(require.main === module) {
    app.start();
//}
