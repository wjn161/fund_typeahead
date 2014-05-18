var dropdown=(function($){
    function Dropdown(){
        this.$text=$('#txtResult');
        this.$menu=$('.search-type>.search-type-menu');
        this.$item=$('.search-type>.search-type-menu>ul>li');
    }
    Dropdown.prototype={
        menu:function(){
            var thiz=this;
            this.$text.on('click',function(){
                thiz.$menu.show();
            });
            this.$item.on('click',function(){
                thiz.$text.text($.trim($(this).text()));
                thiz.$text.attr('data-type',$.trim($(this).attr('data-type')));
                thiz.$menu.hide();
            });
            $("body").on('click',function(e) {
                if(e.target.id!=='txtResult'){
                    thiz.$menu.hide();
                }
            });
        },
        hover:function(){
            this.$item.on('mouseenter',function(){
                $(this).addClass('over')
            }).on('mouseout',function(){
                    $(this).removeClass('over');
                });
        },
        init:function(){
            this.menu();
            this.hover();
        }

    };
    Dropdown.prototype.constructor=Dropdown;
    return {
        init:function(){
            var drop=new Dropdown();
            drop.init();
        }
    };
})(jQuery);

$(function(){
    dropdown.init();
});
