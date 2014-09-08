/**
 * sugguest.js
 * https://github.com/wjn161/fund_typeahead
 * Copyright 2013 wjn. and other contributors; Licensed MIT
 * jsload: https://github.com/PaulGuo/In
 * datafile: http://hqqd.fund123.cn/funddataforsearch.js
 * 
 */
var sugguest=(function($){
    var defaults={
        view:{
            textBox:'',
            container:''
        },
        data:{

        }
    };
    function Sugguest(config){
        this.option= $.extend({},defaults,config);
        this.tmpl=window.tmpl;
    }

    var _dataset={

    };
    var _view={

    };
    var _sugguest={

    };

    var utils={
        debug:function(msg){
            if (window.console)console.log(msg);
            else alert(msg);
        }
    };

    Sugguest.prototype={
        init:function(){
            utils.debug(this.option);
            utils.debug(window.tmpl('body'));
        }
    };

    Sugguest.prototype.constructor=Sugguest;
    return {
        init:function(config){
            var sug=new Sugguest(config);
            sug.init();
        }
    };
})(jQuery);

$(function(){
    sugguest.init({
        id:'123',
        name:'hello world'
    });
});