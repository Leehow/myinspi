$(document).ready(function(){
    $.getUrlParam = function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return unescape(r[2]); return null;
    };
    var t=$.getUrlParam('t');
    if(t){
        show_idcontent(t);
    }
});
function goTotop(obj){
	var _targetTop = $('#'+obj).offset().top;//获取位置
	jQuery("html,body").animate({scrollTop:_targetTop},300);//跳转
}
//寻找对应的类别
function get_value(kind,value,type){
    if(!value){
        return null;
    }
    for(var i=0,len=value.length;i<len;i++){
        var data=value[i];
        if(kind==data.data_kind){
            if(1==type){
               return data.data_content; 
            }
            else if(2==type){
               return data.data_id; 
            }
            return data;
        }
    }
}
function get_value_array(kind,value,type){
    var ii=0;var result=new Array();;
    for(var i=0,len=value.length;i<len;i++){
        var data=value[i]; 
        if(kind==data.data_kind){
            if(1==type){
               result[ii]=data.data_content; 
            }
            else if(2==type){
               result[ii]=data.data_id; 
            }
            else{
               result[ii]=data;
            }
            ++ii;
        }
    }
    return result;
}
/*转换时间，计算差值*/ 
    function comptime(beginTime){ 
        var nowtime = (new Date).getTime();/*当前时间戳*/ 
        var secondNum = parseInt((nowtime-beginTime*1000)/1000);//计算时间戳差值   
        if(secondNum<0)
            return '世界末日';
        if(secondNum>=0&&secondNum<60){ 
            return '刚刚'; 
        } 
        else if (secondNum>=60&&secondNum<3600){ 
            var nTime=parseInt(secondNum/60); 
            return nTime+'分钟前'; 
        } 
        else if (secondNum>=3600&&secondNum<3600*24){
            var nTime=parseInt(secondNum/3600); 
            return nTime+'小时前'; 
        } 
        else{ 
            var year   = get_time("year",beginTime);
            var month  = get_time("month",beginTime);
            var day    = get_time("day",beginTime);
            var hour   = get_time("hour",beginTime);
            var minute = get_time("minute",beginTime);
            var second = get_time("second",beginTime);
            var today  = get_time("day");
            var c = get_time("day","now",1)-get_time("day",beginTime,1);
            if(1==c){
                return '昨天 '+hour+':'+minute+':'+second;
            }
            return (year+'.'+month+'.'+day+' '+hour+':'+minute+':'+second);
        } 
    }
    //获取时间的年份，月份等信息
    function get_time(kind,time,inte){
        if(!time || "now"==time){
            var nowtime = (new Date).getTime();/*当前时间戳*/ 
        }
        else{
            var nowtime=time*1000;
        }
        var update = new Date(nowtime);//时间戳要乘1000
        var year   = update.getFullYear();
        var month  = (update.getMonth()+1<10)?('0'+(update.getMonth()+1)):(update.getMonth()+1);
        var day    = (update.getDate()<10)?('0'+update.getDate()):(update.getDate());
        var hour   = (update.getHours()<10)?('0'+update.getHours()):(update.getHours());
        var minute = (update.getMinutes()<10)?('0'+update.getMinutes()):(update.getMinutes());
        var second = (update.getSeconds()<10)?('0'+update.getSeconds()):(update.getSeconds());
        if("year"==kind){
            var out=year;
        }
        else if("month"==kind){
            var out=month;
        }
        else if("day"==kind){
            var out=day;
        }
        else if("hour"==kind){
            var out=hour;
        }
        else if("minute"==kind){
            var out=minute;
        }
        else if("second"==kind){
            var out=second;
        }
        else
            var out="";
        if(1==inte)
            return parseInt(out);
        return out;
    
    }
function show_idcontent(id){
        var $container = $('#show_mysell');
        //加载等待
        $.get(link_url+"m=show_mycontent",
            {page:0,pagesize:10,tapid:id},
            function(msg){
                //如果是第一页则清除内容
                goTotop("tab1");
                
                var data=msg;
                //-----------------------------这后面才是刷出来的内容
                $.each(data,function(l,re){
                    $.each(re,function(l,r){
                        var content    =get_value("con_content",r);
                        var pic         =get_value("con_pic",r,1);
                        var audi        =get_value("con_audi",r,1);
                        var swf         =get_value("con_swf",r,1);
                        var ytb         =get_value("con_ytb",r,1);
                        var author_email=get_value("usr_email",r,1);
                        var myid=sessionStorage.usrid;
                        for(var i=0,len=r.length;i<len;i++){
                            var data0=r[i];
                            if("con_book"==data0.data_kind && myid==data0.data_author){
                                var bookid=data0.data_id;
                                break;
                            }
                        }
                        var id      =content.data_id;
                        var title    =content.data_content;
                        var time    =content.data_changetime;
                        var author_id=content.data_author;
                        time=comptime(time);
                        var title3=replaceTextarea3(title);//去掉换行显示
                        var con0=title3.substr(0,10);
                        title=changw(title);
                        title = changmo(title);
                        var vpic='';
                        var shareurl=link_url_i+'?p=showout&t='+id;
                        if('0'===pic){
                            vpic='';
                        }
                        else{
                            vpic='<a href="http://mobilcms-temp.stor.sinaapp.com/'+pic+'.jpg" data-lightbox="image-'+id+'" data-title="'+con0+'"><img name="" src="http://mobilcms-temp.stor.sinaapp.com/'+pic+'_normal.jpg" width="500" height="500" class="img-rounded" alt="" /></a>';
                        }
                        if('0'===audi || !audi){
                            var ha='';
                        }
                        else{
                            var ha='<audio controls>'+
                            '<source src="http://mobilcms-upcon.stor.sinaapp.com/'+audi+'.mp3" type="audio/ogg">'+
                            'Your browser does not support the audio element.'+
                            '</audio>';
                        }
                        if(swf && swf!='0'){
                                var swf='<br /><embed src="'+swf+'" quality="high" width="100%" height="500" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>';
                           }
                           else{
                               var swf='';
                           }
                           if(ytb && ytb!='0'){
                               ytb=ytb.substr(17);
                                var ytb='<iframe width="100%" height="500" src="https://www.youtube.com/embed/'+ytb+'" frameborder="0" allowfullscreen></iframe>';
                           }
                           else{
                               var ytb='';
                           }
                            var words='<div class="col-sm-12 col-md-12">'+
                        '<div class="thumbnail"><div class="caption">'+
                                '<p><small class="gray">'+time+'</small><small class="pull-right"><a class="button button-tiny button-action button-plain button-borderless" data-toggle="collapse" href="#share'+id+'" aria-expanded="false" aria-controls="share'+id+'">分享share <i class="glyphicon glyphicon-new-window"></i></a></small></p>'+
                                '<span class="collapse" id="share'+id+'">'+shareurl+'<br /><br /><p align="center"><span id="share_pic_'+id+'"></span></p><hr /></span>'+
                                '<p>'+title+'</p>'+
                          '</div>'+vpic+ha+swf+ytb+'</div></div>';
                        //若有搜索内容则标出
    //                    if(search){
    //                        title=msg_mark(search,title);
    //                    }


                        $container.append(words);
                        $('#share_pic_'+id+'').qrcode(shareurl);
    //                $('#topicn_'+id).popover('hide');
                    }); 
                });
//                 $container.imagesLoaded(function(){
//                     $container.masonry({
//                        singleMode: true,
//                        animate: true,
//                      itemSelector: '.item'
//                    });
//                }); 
            },"json");
        
    }