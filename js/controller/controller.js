/**
 * Created by Administrator on 2016/6/17.
 */
(function (w, d, $, undefined) {
    var controller = {};

    controller.ifAjaxing = false;

    controller.checkExchangeCode = function (data, callback) {

        $.ajax({
            type: "post",
            url: jimiHost + '/checkExchangeCode.php',
//                url: 'package.json',
            data: data,
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "jsonpcallback",
            success: function (json) {
                console.log(JSON.stringify(json));
                callback(json);
            },
            error: function (err) {
                console.log('ERROR!');
                console.log(err);
            }
        });
    };

    w.controller = controller;
})(window, document, $)
