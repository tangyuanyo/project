var http = require('http');
var cheerio = require("cheerio");
var url = 'http://chart.cp.360.cn/kaijiang/kaijiang?lotId=255401';
var moment = require('moment');
var schedule = require("node-schedule");
var fs = require('fs');
var mysql = require('mysql');

var ssc = {
    //将得到的数字存入数据库
    Insertdata:function(code,time,issue,endtime){
        try{
            var connection = mysql.createConnection({
                /*host:'localhost',
                user:'root',
                password:'1234567',
                port:'3306',
                database:'yiyuan'*/
                host:'192.168.2.251',
                user:'root',
                password:'root',
                port:'23306',
                database:'108admin'
            });
            connection.connect();
            //var addSql = 'INSERT INTO codes(code,time,issue,endtime) VALUES(?,?,?,?)';
            var addSql = 'INSERT INTO onethink_ticket_lssj(code,time,issue,endtime) VALUES(?,?,?,?)';
            var params = [code,time,issue,endtime];
            connection.query(addSql,params,function(err,res){
                if(err){
                    return console.log(err.message);
                }
                console.log(res);
            });
            connection.end();
        }catch(err){
            return console.log('写入数据异常');
        }
    },
    //执行获取数据
    init:function(params){
        var time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        var ss = '';
        var prefix = 0;
        if(params){
            url = url+'&spanType=2&span='+params+'_'+params;
            ss = 120;
            prefix = moment(params).format('YYMMDD');
        }else{
            //当前时间期号
            var issues = ssc.setIssue(time);//计算当前期数
            ss = parseInt(issues.toString().substring(6));
            prefix = moment(time).format('YYMMDD');
        }

        http.get(url,function(resp){
            resp.on('error',function(error){
                return console.error(error.message);
            });
            var datas = '';
            resp.on('data',function(data){
                datas += data;
            });
            resp.on('end',function(){
                var $ = cheerio.load(datas);
                $('.history-tab tr').each(function(){
                    var txts = $(this).find('td').eq(0).text();
                    if(parseInt(txts) <= ss){
                        var issue = prefix+txts;
                        var code = $(this).find('td').eq(1).text();
                        console.log(issue+code);
                        if(code){
                            //判断是否写入
                            ssc.checkData(time,issue,code);
                        }
                    }
                });
            });
        });
    },
    //计算期号
    setIssue:function(data){
        var tou = moment(data).format('YYMMDD');//160816
        var hour = moment(data).format('HH');
        var second = moment(data).format('mm');
        var ss = 0;
        //5分钟执行的
        switch(true){
            case (hour == 0 && second < 5):
                ss = 120;
                break;
            case (hour>0 &&hour<2):
                ss = parseInt((parseInt(hour*60)+parseInt(second))/5);
                break;
            case (hour>=10 && hour<22):
                ss = parseInt((parseInt((hour-10)*60)+parseInt(second))/10)+24;
                break;
            case (hour>=22):
                ss = parseInt((parseInt((hour-22)*60)+parseInt(second))/5)+96;
                break;
            default:
                break;
        }

        //是昨天的
        if(ss == 120){
            tou = parseInt(tou)-1;
        }

        if(ss < 10){
            ss = '00'+ss;//不足十位加00
        }else if(ss >= 10 && ss < 100){
            ss = '0'+ss;//不足百位加0
        }
        var qishu = tou.toString()+ss;
        return qishu;
    },
    //计算发布时间
    setEndtime:function(data){
        var time = data.toString().substring(0,6);
        var qi = parseInt(data.toString().substring(6));
        var sec = 0;
        var min = 0;
        switch(true){
            case (qi < 24):
                sec = parseInt((qi*5)/60);
                min = (qi*5)%60;
                break;
            case (qi>= 24 && qi < 96):
                sec = parseInt(((qi-24)*10)/60)+10;
                min = (qi*10)%60;
                break;
            case (qi >= 96 && qi <= 120):
                sec = parseInt(((qi-96)*5)/60)+22;
                min = (qi*5)%60;
                break;
            default:
                break;
        }
        if(sec < 10){
            sec = '0'+sec;
        }
        if(min < 10){
            min = '0'+min;
        }
        var ddd = time+sec+min;
        ddd = moment(ddd, "YYMMDDHHmm").format("YYYY-MM-DD HH:mm:ss");//2016-08-15 16:40:00
        return ddd;
    },
    //检查是否本期数据写入到数据库中
    checkData:function(time,issue,code){
        var conn = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'1234567',
            port:'3306',
            database:'yiyuan'
        });
        conn.connect();
        var endtime = ssc.setEndtime(issue);
        var sql = 'select * from onethink_ticket_lssj where issue = ? and endtime = ?';
        //var sql = 'select * from codes where issue = ? and endtime = ?';
        var params = [issue,endtime];
        conn.query(sql,params,function(err,result){
            if(err){
                return console.log(err.message);
            }
            if(result[0]){
                console.log('已经写入');
            }else{
                //没有写入则写入
                ssc.Insertdata(code,time,issue,endtime);
            }
        });
        conn.end();
    }
};


//带参数为某一天的   不带为今天的
ssc.init('2016-08-30');
//ssc.init();