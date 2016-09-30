function app() {
    if (!window.location.search) {
        window.location = window.location + '?uid=10430';
    }
    window.searchJson = searchJson = (window.location.search.searchToJson());

    FastClick.attach(document.body);


    //$jqBtn..................................................................
    $addressChange = $('.addressChange');
    $addressSave = $('.addressSave');
    $addressBack = $('.addressBack');
    $address = $('.address');


    //jqInput............................................................
    $inputName = $('#inputName');
    $inputMobile = $('#inputMobile');
    $selProvince = $('#selProvince');
    $selCity = $('#selCity');
    $inputAddress = $('#inputAddress');


    //initRouter..........................................................
    //$jqPage
    $pageExchange = $('.pageExchange');
    $pageAddress = $('.pageAddress');
    Router.$curPage = $pageExchange;
    Router.init();


    //init bind省市Data......................................................................
    bindProvince();
    bindCity($selProvince.val());
    $selProvince.change(function () {
        var a = $(this).val();
        bindCity(a);
    })


    //initAjax 根据uid判断这个人有没有兑换过....................................
    controller.check({uid: searchJson.uid}, function (json) {
        $('#loading').hide();
        $('#loaded').show();

        if (json.status == 2) {
            GM.ifExchanged = true;
            console.log('该用户已领取兑换码');
            GM.emodel = GM.exchangeModel = json;
            bindAddress();
            bindPrizeData(true);

        }
        else if (json.status == 3) {
            GM.ifExchanged = false;
            console.log('该用户未领取兑换码');
            bindPrizeData(false);

        }


        //根据是否兑换字段 判断点击兑换逻辑.................................
        if (GM.ifExchanged == false) {
            $('.exchangeBtn').click(function () {
                var val = $('.inputBox').val();
                if (val == '') {
                    alert({
                        alertTxt: "兑换码不能为空",
                        alertBtn: "返回",
                    });
                } else {
                    controller.check({ecode: val, uid: searchJson.uid}, function (json) {
                        if (json.status == 0) {//兑换码出错
                            alert({
                                alertTitle: '兑换失败',
                                alertTxt: "无此兑换码",
                                alertBtn: "返回",
                            });
                        } else if (json.status == 4) {//兑换码已经被兑换
                            alert({
                                alertTitle: '兑换失败',
                                alertTxt: "该兑换码已被使用",
                                alertBtn: "返回",
                            });
                        } else if (json.status == 1) {
                            alert({
                                alertTitle: '兑换成功',
                                alertTxt: "恭喜您，获得【竹纤维化妆棉】一份。<br>提交收货信息，即领取成功啦。<br>发货后我们将通过系统消息通知您，<br>好东西都值得耐心等待哦。",
                                alertBtn: "填写地址",
                            });
                            Router.navigateTo($pageAddress, 'right');
                            $('.exchangeBtn').unbind('click');
                            GM.emodel.prize = json.prize;
                            GM.emodel.imgUrl = json.imgUrl;
                            GM.emodel.id = json.id;
                            $('.addressCon').show();
                            bindPrizeData(true);
                        }
                    })
                }
            });
        }


    });


    //bindDataFns..................................................................

    //para1 是是否绑定奖品的布尔值
    function bindPrizeData(para1) {
        if (para1) {
            $('.prizeContent').html("<div class='prizeSec'>" +
                "<div class='prizeSecTxt'>" + GM.emodel.prize +
                "<img src=" + GM.emodel.imgUrl + " class='prizeSecImg'/>" +
                "</div></div>");
            $('.address').html(GM.emodel.address);
            $('.addressChange').html('修改').css('display', 'inline-block');
            $('.inputBox').attr('placeholder', GM.emodel.ecode).attr({'disabled': 'disabled'});
            $('.exchangeBtn').css({'background': '#f4f4f4', color: '#aaa'});
            $('.absoluteBottom').html('系统提示发货后地址将不可修改，普通快递不到的偏远地区不发货。<br>如有任何问题请联系微信公众号：肌秘jimi <br>我们将及时为您解决。');


        }
        else {
            $('.prizeContent').html('<img src="img/nodata.jpg" class="nodata" width="80%"/>' +
                '<div style="text-align: center;color: #444">暂无获奖记录</div>');
            $('.addressChange').html('修改').css('display', 'none');
            $('.inputBox').attr('placeholder', '请输入兑换码').removeAttr("disabled");
        }
    }


    //用户领过兑换码的情况下 才会绑定address
    function bindAddress() {
        $('.addressCon').show();
        $inputName.val(GM.emodel.uname);
        $inputMobile.val(GM.emodel.mobile);
        $inputAddress.val(GM.emodel.address);

        bindProvince();

        $selProvince.find('option').each(function (i, e) {
            if (GM.emodel.province == $(e).val()) {
                $(e).attr('selected', 'selected');
            }
        });

        bindCity(GM.emodel.province);
        $selCity.find('option').each(function (i, e) {
            if (GM.emodel.city == $(e).val()) {
                $(e).attr('selected', 'selected');
            }
        })
    }


    //绑定省份
    function bindProvince() {
        var str = '';
        [].forEach.call($.cityInfo, function (e, i, arr) {
            str += '<option value=' + e.n + ' >' + e.n + '</option>'
        });
        $selProvince.html(str);
    }

    //根据省份绑定城市
    function bindCity(provinceName) {
        var CityArray = _GetCityArrayByProvince(provinceName);
        var str = '';
        [].forEach.call(CityArray, function (e, i, arr) {
            str += '<option value=' + e + ' >' + e + '</option>'
        });
        $selCity.html(str);


        function _GetCityArrayByProvince(provinceName) {
            for (i = 0; i < $.cityInfo.length; i++) {
                if (provinceName == $.cityInfo[i].n) {
                    return $.cityInfo[i].c;
                }
            }
        }
    }


    //bindEvent..................................................................

    //routerEvent

    //改变地址按钮 导航至填写地址页面
    $addressChange.click(function () {
        Router.navigateTo($pageAddress, 'right');
    });

    //保存地址按钮
    //输入不为空时 服务器保存地址 导航至兑换页面
    $addressSave.click(function () {
        var uname = $inputName.val().trim();
        var mobile = $inputMobile.val().trim();
        var address = $inputAddress.val().trim();
        if (uname == '' || address == '') {
            alert('输入不能为空');
            return;
        }
        else if (mobile == '') {
            alert('联系电话格式不正确');
            return;
        }
        else {
            GM.emodel.uname = uname;
            GM.emodel.mobile = mobile;
            GM.emodel.address = address;
            GM.emodel.province = $selProvince.val();
            GM.emodel.city = $selCity.val();
            GM.emodel.address = address;

            $address.html(GM.emodel.address);
            Router.navigateTo($pageExchange, 'left');
            controller.postExchangeCodeReceiverInfo({
                id: GM.emodel.id,
                uid: searchJson.uid,
                uname: GM.emodel.uname,
                mobile: GM.emodel.mobile,
                province: GM.emodel.province||'北京市',
                city: GM.emodel.city||'北京市',
                address: GM.emodel.address,
            }, function (json) {
            })

        }

    });


    //地址页返回按钮 直接导航至 兑换码页面
    $addressBack.click(function () {
        Router.navigateTo($pageExchange, 'left');
    });


    //键盘弹出 修正..........................................................
    var $absoluteBottom = $('.absoluteBottom');
    $('input').focus(function () {
        $absoluteBottom.hide();
    }).blur(function () {
        $absoluteBottom.show();
    })

}
