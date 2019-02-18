(function($){
    $.fn.luckyCitySelect=function(settings){
        if(this.length<1){return;};console.log(2321)
        // 默认值
        settings=$.extend({
            url:"",
            prov_container:'.prov',
            city_container:'.city',
            dist_container:'.dist',
            select_prehtml_prov:'',
            select_prehtml_city:'',
            select_prehtml_dist:'',
            prov:"",
            city:"",
            dist:''
        },settings);

        var box_obj=this;
        var prov_obj=box_obj.find(settings.prov_container);
        var city_obj=box_obj.find(settings.city_container);
        var dist_obj=box_obj.find(settings.dist_container);


        var prov_val=settings.prov;
        var city_val=settings.city;
        var dist_val=settings.dist;

        var url=settings.url;

        var select_prehtml_prov = settings.select_prehtml_prov ? "<option>"+settings.select_prehtml_prov+"</option>":'';
        var select_prehtml_city = settings.select_prehtml_city ? "<option>"+settings.select_prehtml_city+"</option>":'';
        var select_prehtml_dist = settings.select_prehtml_dist ? "<option>"+settings.select_prehtml_dist+"</option>":'';
        var city_json;


        var add_province = function(data,id){
            data = data.data.prov
            if( !data ){return;}

            var html = select_prehtml_prov;
            $.each(data, function(k, v) {
                html += '<option value="'+v.province_id+'">'+v.province_name+'</option>';
            });
            prov_obj.html(html);
            prov_obj.val(id);
        }

        var add_city = function(data,id){
            data = data.data.city
            if( !data ){return}
            var html = select_prehtml_city;
            $.each(data, function(k, v) {
                html += '<option value="'+v.city_id+'">'+v.city_name+'</option>';
            });
            $(city_obj).html(html);
            $(city_obj).val(id);

        }
        var add_region = function(data,id){
            data = data.data.region
            if( !data ){return}
            var html =select_prehtml_dist;
            $.each(data, function(k, v) {
                html += '<option value="'+v.region_id+'">'+v.region_name+'</option>';
            });

            $(dist_obj).html(html);
            console.log( id )
            $(dist_obj).val(id);

        }

        var get_init_data = function(cb){
            $.post(url,{province_id:prov_val,city_id:city_val},function(data){
                if( data.code == 200){
                    add_province(data,prov_val);
                    add_city(data,city_val);
                    add_region(data,dist_val);
                }

            });
        }

        var onProvinceChange =function( self,cb){
            var id = $(self).find('option:selected').val();

            $( city_obj ).html( select_prehtml_city );
            $( dist_obj ).html( select_prehtml_dist );

            if(id != ''){

                $.post(url,{province_id:id},function(data){
                    if( data.code == 200){
                        add_city(data);

                    }
                });
            }
        }

        var onCityChange =function( self ,cb){
            id = $(self).find('option:selected').val();

            $( dist_obj ).html( select_prehtml_dist );

            if(id != ''){
                $.post(url,{city_id:id},function(data){
                    if( data.code == 200){
                        add_region(data)
                    }

                });
            }
        }


        var init = function(){
            get_init_data();

            $(prov_obj).bind("change",function(){
                onProvinceChange(this)
            });

            $(city_obj).bind("change",function(){
                onCityChange(this)
            });
        }

        init();

    };
})(jQuery);


//使用
$(function(){
    $("#city").samCitySelect({
        url:"/test/select_city",
        select_prehtml_prov:'省/直辖市',
        select_prehtml_city:'地级市',
        select_prehtml_dist:'县/区',

        prov:"360000",
        city:"361100",
        dist:'361102',
    });
})