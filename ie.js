$(function(){
    var browser=navigator.appName;
    var b_version=navigator.appVersion;
    var version=b_version.split(";");
    if(version.length>2){
        var trim_Version=version[1].replace(/[ ]/g,"");
    }else{
        var trim_Version ='';
    }
    if(browser=="Microsoft Internet Explorer" && ( trim_Version=="MSIE6.0" || trim_Version=="MSIE7.0"  || trim_Version=="MSIE8.0" )   )
    {
        lt_ie9=true;
    }else{

        lt_ie9=false;

    }
    ie6placeholder();
});

function ie6placeholder(){
    $.each($('input.text_input'),function(k,v){
        $inp = $(v);
        if($inp.attr('ispwd') == '1' && $inp.val() === '') {
            if (lt_ie9) {
                id = $inp.attr('id');
                if(id === 'islogin'){//登录的不同情况
                    $('input.text_input').eq(k).after('<label class="ie_' + id + ' ief lief"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                    $('.ief').css('top', '305px');
                }else{
                    $('input.text_input').eq(k).after('<label class="ie_' + id + ' ief"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                    $('.ief').css('top', '15px');
                }
            } else {
                $inp.attr('type', 'text');
            }
        }else if($inp.attr('ispwd') == '2' && $inp.val() === ''){
            if (lt_ie9) {
                id = $inp.attr('id');
                $('input.text_input').eq(k).after('<label class="ie_' + id + ' ieg"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                $('.ieg').css('top', '85px');
            } else {
                $inp.attr('type', 'text');
            }
        }else{
            $inp.val($inp.attr('placeholder'));
        }
        if(!lt_ie9){
            $inp.val($inp.attr('placeholder'));
        }
        $inp.focus(function(){
            if($(this).val() === $(this).attr('placeholder')){
                $(this).val('');
            }
            if($(this).attr('ispwd') == '1'){
                if(lt_ie9){
                    id =$(this).attr('id');
                    $('.ie_'+id).hide();
                }else {
                    $(this).attr('type', 'password');
                }
            }
            if($(this).attr('ispwd') == '2'){
                if(lt_ie9){
                    id =$(this).attr('id');
                    $('.ie_'+id).hide();
                }else {
                    $(this).attr('type', 'password');
                }
            }
        });
        $inp.blur(function(){
            if($(this).val() === ''){
                if(!lt_ie9){
                    $(this).val($(this).attr('placeholder'));
                }else if( $(this).attr('ispwd')!='1' && $(this).attr('ispwd')!='2' ){
                    $(this).val($(this).attr('placeholder'));
                }
            }

            if($(this).attr('ispwd') == '1' &&  $(this).val()=== $(this).attr('placeholder')){
                $(this).attr('type','text') ;
            }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('ispwd') == '1' && $(this).attr('ispwd') ){
                id =$(this).attr('id');
                $('.ie_'+id).show();
            }

            if($(this).attr('ispwd') == '2' &&  $(this).val()=== $(this).attr('placeholder')){
                $(this).attr('type','text') ;
            }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('ispwd') == '2' && $(this).attr('ispwd') ){
                id =$(this).attr('id');
                $('.ie_'+id).show();
            }

        });
    });
}


//修改密码兼容
function password_placeholder(h,x,w){
    var browser=navigator.appName;
    var b_version=navigator.appVersion;
    var version=b_version.split(";");
    if(version.length>2){
        var trim_Version=version[1].replace(/[ ]/g,"");
    }else{
        var trim_Version ='';
    }
    if(browser=="Microsoft Internet Explorer" && ( trim_Version=="MSIE6.0" || trim_Version=="MSIE7.0"  || trim_Version=="MSIE8.0" )   )
    {
        lt_ie9=true;
    }else{
        lt_ie9=false;
    }
    $.each($('input.lyy_pass_input'),function(k,v){
        $inp = $(v);
        if($inp.attr('lyy_pwd') == '1' && $inp.val() === '') {
            if (lt_ie9) {
                id = $inp.attr('lyy_pwd');
                $('input.lyy_pass_input').eq(k).after('<label class="ie_' + id + ' pass_lyy1"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                $('.pass_lyy1').css('top', h);
            } else {
                $inp.attr('type', 'text');
            }
        }else if($inp.attr('lyy_pwd') == '2' && $inp.val() === ''){
            if (lt_ie9) {
                id = $inp.attr('lyy_pwd');
                $('input.lyy_pass_input').eq(k).after('<label class="ie_' + id + ' pass_lyy2"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                $('.pass_lyy2').css('top', x);
            } else {
                $inp.attr('type', 'text');
            }
        }else if($inp.attr('lyy_pwd') == '3' && $inp.val() === ''){
            if (lt_ie9) {
                id = $inp.attr('lyy_pwd');
                $('input.lyy_pass_input').eq(k).after('<label class="ie_' + id + ' pass_lyy3"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                $('.pass_lyy3').css('top', w);
            } else {
                $inp.attr('type', 'text');
            }
        }else{
            $inp.val($inp.attr('placeholder'));
        }
        if(!lt_ie9){
            $inp.val($inp.attr('placeholder'));
        }
        $inp.focus(function(){
            if($(this).val() === $(this).attr('placeholder')){
                $(this).val('');
            }
            if($(this).attr('lyy_pwd') == '1'){
                if(lt_ie9){
                    id =$(this).attr('lyy_pwd');
                    $('.ie_'+id).hide();
                }else {
                    $(this).attr('type', 'password');
                }
            }
            if($(this).attr('lyy_pwd') == '2'){
                if(lt_ie9){
                    id =$(this).attr('lyy_pwd');
                    $('.ie_'+id).hide();
                }else {
                    $(this).attr('type', 'password');
                }
            }
            if($(this).attr('lyy_pwd') == '3'){
                if(lt_ie9){
                    id =$(this).attr('lyy_pwd');
                    $('.ie_'+id).hide();
                }else {
                    $(this).attr('type', 'password');
                }
            }
        });
        $inp.blur(function(){
            if($(this).val() === ''){
                if(!lt_ie9){
                    $(this).val($(this).attr('placeholder'));
                }else if( $(this).attr('lyy_pwd')!='1' && $(this).attr('lyy_pwd')!='2' && $(this).attr('lyy_pwd')!='3'){
                    $(this).val($(this).attr('placeholder'));
                }
            }

            if($(this).attr('lyy_pwd') == '1' &&  $(this).val()=== $(this).attr('placeholder')){
                $(this).attr('type','text') ;
            }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('lyy_pwd') == '1' && $(this).attr('lyy_pwd') ){
                id =$(this).attr('lyy_pwd');
                $('.ie_'+id).show();
            }

            if($(this).attr('lyy_pwd') == '2' &&  $(this).val()=== $(this).attr('placeholder')){
                $(this).attr('type','text') ;
            }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('lyy_pwd') == '2' && $(this).attr('lyy_pwd') ){
                id =$(this).attr('lyy_pwd');
                $('.ie_'+id).show();
            }

            if($(this).attr('lyy_pwd') == '3' &&  $(this).val()=== $(this).attr('placeholder')){
                $(this).attr('type','text') ;
            }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('lyy_pwd') == '3' && $(this).attr('lyy_pwd') ){
                id =$(this).attr('lyy_pwd');
                $('.ie_'+id).show();
            }
        });
    });
}


//兼容ie
function ie_placeholder(h,x){
    var browser=navigator.appName;
    var b_version=navigator.appVersion;
    var version=b_version.split(";");
    if(version.length>2){
        var trim_Version=version[1].replace(/[ ]/g,"");
    }else{
        var trim_Version ='';
    }
    if(browser=="Microsoft Internet Explorer" && ( trim_Version=="MSIE6.0" || trim_Version=="MSIE7.0"  || trim_Version=="MSIE8.0" )   )
    {
        lt_ie9=true;
    }else{

        lt_ie9=false;

    }
    $.each($('input.lyy_text_input'),function(k,v){
        $inp = $(v);
        if($inp.attr('ispwd') == '1' && $inp.val() === '') {
            if (lt_ie9) {
                id = $inp.attr('id');
                if(id == 'islogin'){
                    $('input.lyy_text_input').eq(k).after('<label class="ie_' + id + ' ief lief"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                }else{
                    $('input.lyy_text_input').eq(k).after('<label class="ie_' + id + ' ief"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                }
                $('.ief').css('top', h);
            } else {
                $inp.attr('type', 'text');
            }
        }else if($inp.attr('ispwd') == '2' && $inp.val() === ''){
            if (lt_ie9) {
                id = $inp.attr('id');
                $('input.lyy_text_input').eq(k).after('<label class="ie_' + id + ' ieg"  for="' + id + '" >' + $inp.attr('placeholder') + '</label>');
                $('.ieg').css('top', x);
            } else {
                $inp.attr('type', 'text');
            }
        }else{
            $inp.val($inp.attr('placeholder'));
        }
        if(!lt_ie9){
            $inp.val($inp.attr('placeholder'));
        }
        $inp.focus(function(){
            if($(this).val() === $(this).attr('placeholder')){
                $(this).val('');
            }
            if($(this).attr('ispwd') == '1'){
                if(lt_ie9){
                    id =$(this).attr('id');
                    $('.ie_'+id).hide();
                }else {
                    $(this).attr('type', 'password');
                }
            }
            if($(this).attr('ispwd') == '2'){
                if(lt_ie9){
                    id =$(this).attr('id');
                    $('.ie_'+id).hide();
                }else {
                    $(this).attr('type', 'password');
                }
            }
        });
        $inp.blur(function(){
            if($(this).val() === ''){
                if(!lt_ie9){
                    $(this).val($(this).attr('placeholder'));
                }else if( $(this).attr('ispwd')!='1' && $(this).attr('ispwd')!='2' ){
                    $(this).val($(this).attr('placeholder'));
                }
            }

            if($(this).attr('ispwd') == '1' &&  $(this).val()=== $(this).attr('placeholder')){
                $(this).attr('type','text') ;
            }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('ispwd') == '1' && $(this).attr('ispwd') ){
                id =$(this).attr('id');
                $('.ie_'+id).show();
            }

            if($(this).attr('ispwd') == '2' &&  $(this).val()=== $(this).attr('placeholder')){
                $(this).attr('type','text') ;
            }else if(lt_ie9 &&  $(this).val() == '' && $(this).attr('ispwd') == '2' && $(this).attr('ispwd') ){
                id =$(this).attr('id');
                $('.ie_'+id).show();
            }

        });
    });
}
