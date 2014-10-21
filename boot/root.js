module.exports = function (server) {
    var router = server.vframe.Router();
    router.get('/', server.vframe.status());
    router.post('/info', function(req, res){
	console.log(req.body.itb_ajax_form);
    });
    server.use(router);
};
