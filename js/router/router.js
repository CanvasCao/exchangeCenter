/**
 * Created by Administrator on 2016/9/27.
 */
(function (w, d, $, undefined) {
    var Router = {};
    Router.$curPage = null;
    Router.navigateTo = function ($page, dir) {

        if (!Router.$curPage) {
            throw new Error('noCurPage--caoyuhao');
            return;
        }

        //dir 代表新页面从哪边进
        var dir = dir || 'right';
        var dirJson = {
            right: {
                oldPage: {left: '-100%'},
                newPage: {left: '100%'}
            },
            left: {
                oldPage: {left: '100%'},
                newPage: {left: '-100%'}
            },

        };
        Router.$curPage.css({'left': '0%'}).velocity(dirJson[dir]['oldPage'], 'fast', 'ease')
        $page.css(dirJson[dir]['newPage']).velocity({'left': '0%'}, 'fast', 'ease', function () {
            Router.$curPage = $page;
        })

    };

    Router.init = function () {
        if (!Router.$curPage) {
            throw new Error('noCurPage--caoyuhao');
            return;
        }
        Router.$curPage.css({left: '0%'})
    }

    w.Router = Router;

})(window, document, $);