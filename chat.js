//提示语句
function form_placeholder(form,class_name,style){
    var $input = $(form).find('input:not(input[type=submit]):not(input[type=button]),textarea');
    $(form).find('.placeholder').remove();
    $input.each(function(){
        var data = $(this).data();

        if( data.placeholder ){
            var parent = $(this).parent();
            if( !class_name){
                class_name = '';
            }
            if( !style){
                style = '';
            }
            $(this).after('<div class="'+class_name+' placeholder" style="'+style+'">'+data.placeholder+'</div>');
            // $input = $(this);
            var name = $(this).attr('name');
            //对所有层点击隐藏浮层
            parent.find('.placeholder').click(function(event) {
                $(this).hide();
                parent.find('input[name='+name+']').focus();

            });
            $(this).focus(function(event) {
                parent.find('.placeholder').hide();

            });
            $(this).blur(function(event) {
                if($(this).val() == ''){
                    parent.find('.placeholder').show();
                }
            });

        }
    });
}


//表单验证
function formValidator(self,exclude){
    var mothod = {
        account :{
            fun:function(val){
                var regular = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                var regular2 = /^1\d{10}$/;
                if( !val.match(regular) && !val.match(regular2)){
                    return false;
                }
                return true;
            },
            error:'请输入正确的手机号或邮箱地址'
        },
        nickname:{
            fun:function(val){
                var regular = /^[—_\u4e00-\u9fa5a-zA-Z\d]{2,12}$/;
                if( !val.match(regular) ){
                    return false;
                }
                return true;
            },
            error:'昵称仅可使用汉字、字母、数字、下划线组合'
        },
        mobile:{
            fun:function(val){
                var regular = /^1[3|4|5|7|8]\d{9}$/;
                if(!val.match(regular)){
                    return false;
                }
                return true;
            },
            error:'请填写正确的手机号码'
        }
    }
    var $form = $(self).parents('form');
    var $input = $form.find('input:not(input[type=submit]):not(input[type=button]),textarea,select');
    var passing = 0;

    $input.each(function(){
        var data = $(this).data();
        var val = $(this).val();
        var name = $(this).attr('name');

        var placeholder = $(this).attr('placeholder');
        if(!placeholder){
            placeholder = data['placeholder'];
        }
        if( !!data.required ){
            if(!val || val == placeholder ){
                error = [$(this),placeholder+'不能为空'];
                return false;
            }
        }
        if(data.max&&data.min){
            if( data.max < val.length || val.length < data.min){
                error = [$(this),placeholder+"长度必须为 "+data.min+" 至 "+data.max+" 位"];
                return false;
            }
        }else if(data.max &&  data.max < val.length){
            error =  [$(this),placeholder+"长度必须小于 "+data.max];
            return false;
        }else if(data.min &&  val.length < data.min){
            error =  [$(this),placeholder+"长度必须大于 "+data.min];
            return false;
        }
        if(data.length &&  val.length < data.length){
            error =  [$(this),placeholder+"长度必须为 "+data.length];
            return false;
        }
        if( !!data.equalto ){
            if( val != $form.find('input[name='+data.equalto+']').val() ){
                error =  [$(this),data.equaltomsg];
                return false;
            }
        }
        if( !data.nomethod ){
            if( mothod.hasOwnProperty( name ) ){
                var verify =mothod[name];
                if( !verify.fun(val) ){
                    error  = [$(this),verify.error];
                    return false;
                }
            }
        }

        passing ++;
    });
    if( $input.length != passing){
        // layer.msg(error,{icon:5,time:2000});
        return {'msg_error':error};
        // return false;
    }
    var post_data ={};
    $input.each(function(){
        if( $(this).attr('type') == 'checkbox' ){
            post_data[$(this).attr('name')] = $(this).is(':checked');
        }else{
            post_data[$(this).attr('name')] =$(this).val();
        }
    });
    return post_data;
}



//验证码倒计时
function verify_countdown( u_class ,post_url, time, verify_get_post_data,type,msg,style){
    $( u_class ).click(function(){
        var post_data = verify_get_post_data();
        if( post_data == false){
            return false;
        }
        //解除click绑定
        $( u_class ).unbind();

        //计时循环
        var seconds = 0;
        if(type && type == 'input'){
            content = $(u_class).val();
        }else{
            content = $(u_class).text();
        }
        var timer = setInterval(function(){
            seconds += 1;
            $(u_class).text( time-seconds );
            if(msg){
                var text_msg = msg.replace('%d',time-seconds);
            }else{
                var text_msg = time-seconds;
            }
            if(type && type == 'input'){
                $(u_class).val( text_msg );
            }else{
                $(u_class).text( text_msg );
            }

            if(seconds == time){
                clearInterval( timer );
                if(type && type == 'input'){
                    $(u_class).val( content );
                }else{
                    $(u_class).text( content );

                }
                //重新绑定
                verify_countdown(u_class ,post_url, time, verify_get_post_data ,type,msg,style);
                //移除样式 lucky
                if(style){
                    $(u_class).removeClass(style);
                }
            }
        },1000);

        //用于给按钮加上不同的样式
        if(style){
            $(u_class).addClass(style);
        }

        $.post( post_url , post_data);
    });
}



Date.prototype.format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

function countdown(self,g,time,callback){
    if( !time || time < 0){
        return;
    }
    var overDate = 1000 * time;
    var NowTime = new Date();
    var date_str = new Date(NowTime.getTime() + overDate).format("yyyy/MM/dd hh:mm:ss");
    $(self).fnTimeCountDown(g,date_str,callback);

}

$.extend($.fn,{
    fnTimeCountDown:function(s,d,callback){
        this.each(function(){
            var $this = $(this);
            var f = {
                haomiao: function(n){
                    if(n < 10)return "00" + n.toString();
                    if(n < 100)return "0" + n.toString();
                    return n.toString();
                },
                zero: function(n){
                    var _n = parseInt(n, 10);
                    if(_n > 0){
                        if(_n <= 9){
                            _n = "0" + _n
                        }
                        return String(_n);
                    }else{
                        return "00";
                    }
                },
                dv: function(){
                    var _d = $this.data("end") || d;
                    var now = new Date(),
                        endDate = new Date(_d);
                    var dur = (endDate - now.getTime()) / 1000 , mss = endDate - now.getTime() ,pms = {
                        hm:"00",
                        sec: "00",
                        minute: "00",
                        hour: "00",
                        day: "00",
                        month: "00",
                        year: "0"
                    };
                    if(mss > 0){
                        pms.hm = f.haomiao(mss % 1000).substr(0,2);
                        pms.sec = f.zero(dur % 60);
                        pms.minute = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
                        pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                        pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
                        //月份，以实际平均每月秒数计算
                        pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
                        //年份，按按回归年365天5时48分46秒算
                        pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
                    }else{
                        pms.year=pms.month=pms.day=pms.hour=pms.minute=pms.sec="00";
                        pms.hm = "00";
                        callback();
                        //alert('结束了');
                        return;
                    }
                    return pms;
                },
                ui: function(){
                    if( typeof s == 'function' ){
                        var _d = $this.data("end") || d;
                        var now = new Date(),
                            endDate = new Date(_d);
                        var g = s( endDate - now.getTime() );
                    }else{
                        var g = s;
                    }

                    if( f.dv() ){

                        var hm = String( f.dv().hm ).split('');
                        var sec = String( f.dv().sec ).split('');
                        var minute = String( f.dv().minute ).split('');
                        var hour = String( f.dv().hour ).split('');


                        var t = g
                            .replace('{h}', hour[0])
                            .replace('{h}', hour[1])
                            .replace('{i}', minute[0])
                            .replace('{i}', minute[1])
                            .replace('{s}', sec[0])
                            .replace('{s}', sec[1])
                            .replace('{x}', hm[0])
                            .replace('{x}', hm[1])
                        ;
                        $this.html(t);
                        setTimeout(f.ui, 90);
                    }else{
                        var t = g
                            .replace('{i}', 0 )
                            .replace('{i}', 0 )
                            .replace('{s}', 0 )
                            .replace('{s}', 0 )
                            .replace('{x}', 0 )
                            .replace('{x}', 0 )
                        ;
                        $this.html(t);

                    }

                }
            };
            f.ui();
        });
    }
});



function input_add_less(obj,x,callback){
    var $obj = $(obj);

    var $input = $obj.find('input[type=text]');
    var $add = $obj.find(':contains(+)');
    var $less = $obj.find(':contains(-)');

    var fun_callback = function(n){
        if(callback){
            callback(n);
        }
    }

    var num_change = function(input,i){
        if( i < 2 ){
            $(input).val(1);
            fun_callback(1);
        }else if(x && i > x){
            $(input).val(x);
            fun_callback(x);
        }else{
            $(input).val(i);

            fun_callback(i);
        }
    }

    $input.blur(function(){
        var i = Number( $(this).val() );
        num_change($input,i);

    });
    $add.click(function() {
        var i = Number( $input.val() );
        num_change($input,i+1);

    });
    $less.click(function() {
        var i = Number( $input.val() );
        num_change($input,i-1);
    });
}


//占位符替换
$.format = function (source, params){
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};