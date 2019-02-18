function msgFilter(msg){
    var key=[];

    var str = msg.match(/^:caitiao\[([a-z0-9\.\/\u4e00-\u9fa5]+?)\]$/g);
    if( str ){
        var ckey = str[0].substr(9, str[0].indexOf(']')-9 );
        msg = '<img src="' + phiz_path +'color_bar/'+caitiao[ckey]+'"/>';
        return msg;
    }
    key =msg.match(/\[([a-zA-Z0-9=\.\/\u4e00-\u9fa5]+?)\]/g);
    if( key == null) return msg;
    for(i = 0;i< key.length;i++){
        var pkey = key[i].substr(1,key[i].indexOf(']')-1 );
        if( pkey.length >24 && pkey.substr(0,4) =='img='){
            pkeys=pkey.split('/');
            if(pkeys.length == 2){
                msg = msg.replace(key[i],'<img class="talk_pic" src="' + image_url + '/Uploads/' + pkeys[0].substr(4) + '/m_' + pkeys[1] + '" title="点击看大图" onClick="talk_pic(\'' +pkeys[0].substr(4) + '/' + pkeys[1] + '\')">');
            }
        }else{
            if(!phiz.hasOwnProperty(pkey)){
                continue;
            }

            msg = msg.replace( key[i],'<img src="' + phiz_path +'phiz/'+phiz[pkey]+'"/>');
        }
    }
    return  msg;
}