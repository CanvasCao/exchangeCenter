/**
 * Created by Administrator on 2016/6/17.
 */
(function (w, d, $, undefined) {
    var controller = {};

    var ifAjaxing = false;

    controller.check = function (data, callback) {
        if (ifAjaxing) {
            return;
        }
        ifAjaxing = true;
        $.ajax({
            type: "post",
            url: jimiHost + '/checkExchangeCode.php',
//                url: 'package.json',
            data: data,
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "jsonpcallback",
            success: function (json) {
                ifAjaxing = false;
                console.log(JSON.stringify(json));
                callback(json);
            },
            error: function (err) {
                ifAjaxing = false;
                console.log('ERROR!');
                console.log(err);
            }
        });
    };


    controller.postExchangeCodeReceiverInfo = function (data, callback) {
        if (ifAjaxing) {
            return;
        }
        ifAjaxing = true;
        console.log(JSON.stringify(data))
        $.ajax({
            type: "post",
            url: jimiHost + '/postExchangeCodeReceiverInfo.php',
//                url: 'package.json',
            data: data,
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            jsonpCallback: "jsonpcallback",
            success: function (json) {
                ifAjaxing = false;
                console.log(JSON.stringify(json));
                callback(json);
            },
            error: function (err) {
                ifAjaxing = false;
                console.log('ERROR!');
                console.log(err);
                alert('网络有问题，请重试保存地址')
            }
        });
    };
    w.controller = controller;
})(window, document, $)
