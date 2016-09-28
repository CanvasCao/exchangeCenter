/*!
 * jimiAlert, a JavaScriptPlugIn v1.0.0
 * http://www.jimi.la/
 *
 * Copyright 2016, CaoYuhao
 * All rights reserved.
 * Date: 2016-9-14 16:21:24
 */

;
(function (w, d, $, undefined) {
    var jimiAlertBox = null;

    function alert(str) {
        if (jimiAlertBox) {

        }
        else {
            jimiAlertBox = new JimiAlertBox(null, null);
        }
        jimiAlertBox.alert(str);
    }

    function JimiAlertBox(container, data) {
        this.data = data;
        this.config = {};
        this.JM = this.jqueryMap = {};
        this.init();
    }

    JimiAlertBox.prototype = {
        init: function () {
            this.initConfig();
            this.createDom();
            this.initCSS();
            this.bindEvent();
        },
        initConfig: function () {

        },
        createDom: function () {
            var that = this;


            $('body').append('<div id="alertBox"><div id="alertContent"></div></div>');
            this.JM.alertBox = $('#alertBox');
            this.JM.alertContent = $('#alertContent');

            this.JM.alertContent.html('<img src="img/alert/close.png" class="alertClose"/>' +
                "<div class='alertTitle'></div>" +
                "<div class='alertTxt'></div>" +
                "<div class='alertBtn'></div>");

            this.JM.alertClose = this.JM.alertContent.find('.alertClose');
            this.JM.alertTitle = this.JM.alertContent.find('.alertTitle');
            this.JM.alertTxt = this.JM.alertContent.find('.alertTxt');
            this.JM.alertBtn = this.JM.alertContent.find('.alertBtn');
        },
        initCSS: function () {
            var that = this;
            this.JM.alertBox.css({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'none',
                'background': 'rgba(0,0,0,0.75)'
            });


            this.JM.alertContent.css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                width: '100%',
                transform: 'translateX(-50%) translateY(-50%)',
                'text-align': 'center'

            })
            this.JM.alertClose.css({
                'white-space': 'nowrap',
                width: '10%',
                display: 'block',
                margin: '0 auto 1rem',
            });
            this.JM.alertTitle.css({
                'text-align': 'center',
                'white-space': 'nowrap',
                color: 'white',
                'font-size': '1.6rem'
            });
            this.JM.alertTxt.css({
                'font-size': '1.4rem',
                color: 'white',
                'box-sizing': 'border-box',
                padding: '1rem 1rem',
                'line-height': '2.4rem',

            });
            this.JM.alertBtn.css({
                color: 'white',
                background: '#3881e0',
                'box-sizing': 'border-box',
                padding: '0.7rem 3rem',
                display: 'inline-block',
                margin: '0 auto',
                'border-radius': '2rem',
                'font-size': '1.2rem',
            });

        },
        bindEvent: function () {
            var that = this;
            this.JM.alertBox.click(function () {
                $(this).hide();
            })
        },
        alert: function (para) {
            this.JM.alertTitle.show();
            this.JM.alertTxt.show();
            this.JM.alertBtn.show();

            if (typeof para == 'string') {
                this.JM.alertTxt.html(para);
                this.JM.alertTitle.hide();
                this.JM.alertBtn.hide()
            }
            else {
                this.JM.alertTitle[0].innerHTML = (para.alertTitle) ? para.alertTitle : this.JM.alertTitle.hide();
                this.JM.alertTxt[0].innerHTML = (para.alertTxt) ? para.alertTxt : this.JM.alertTxt.hide();
                this.JM.alertBtn[0].innerHTML = (para.alertBtn) ? para.alertBtn : this.JM.alertBtn.hide();
            }
            this.JM.alertBox.show();
        }
    }

    w.JimiAlertBox = JimiAlertBox;
    w.alert = alert;
})(window, document, jQuery)


