var vf = require('vf');
var boot = require('vsoft-boot');
var bodyParser = require('body-parser');

var app = vf();


app.use(vf.favicon());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});


boot(app, __dirname);


var ds = app.datasources.db,
    info = app.models.info;


app.post('/info', function(req, res){
    var obj = {};
    
    obj.Name = req.body.name;
    obj.email = req.body.email;
    obj.comment = req.body.comments;
    
    info.create(obj, function(err) {
        if (err) return;
	res.json({"message": "success"});
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
