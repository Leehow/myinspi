$(document).ready(function(){
    //    获取get
//    $.getUrlParam = function(name){
//            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//            var r = window.location.search.substr(1).match(reg);
//            if (r!=null) return unescape(r[2]); return null;
//    };
//    var t=$.getUrlParam('t');
//    var uid=$.getUrlParam('uid');
//    var tkn=$.getUrlParam('token');
    //-----------------------------------如果无法获取cookie用localStorage获取！
//    var tkid;
//    if(tkid=localStorage.tkid){
//        $.cookie('tkid',tkid);
//    }
//    var usrid;
//    if(usrid=localStorage.usrid){
//        $.cookie('usrid',usrid);
//    }
//    var local;
//    if(local=localStorage.local){
//        $.cookie('local',local);
//    }
    //-----------------------------------如果无法获取cookie用localStorage获取！
    
    
    //变量赋值
    var usr=$('#username').val();
    var psw=$('#password').val();
    var repsw=$('#repassword').val();
    var key=$('#key').val();
    
    //最开始显示的
    $('#rpsw').hide();//隐藏再次输入密码
    $('#ackey').hide();//隐藏邀请码
    $('#forget').hide();
    $('#forgetwarning').hide();//忘记密码提示隐藏
    $('#main').hide();//中间主要内容隐藏
    $('.gototop').hide();//返回顶部隐藏
    $('#send').hide();//发送信息隐藏
    $('#toregister').hide();//隐藏注册
    
    
    
    
    //点击忘记密码
    $('#showrepsw').click(function(){
        $('#wpsw').text("新密码");
        $('#rpsw').show();
        $('#loreg').hide();
        $('#ackey').hide();
        $('#forgetwarning').show();
        $('#forget').show();
    });
    
    //点击返回注册登录
    $('#gologin').click(function(){
        $('#wpsw').text("密码");
        $('#rpsw').hide();
        $('#loreg').show();
        $('#forget').hide();
        $('#forgetwarning').hide();
    });
    
    //点击登录后
//    $('#login').click(function(){
//        $('#main').show();
//        $('.gototop').show();
//        $('#loginbox').hide();
//    });

    
    
    
    //反馈信息发送后
    $('#conm_sub').click(function(){ 
        if(!sessionStorage.tkid){
            dialog("对不起！请您登录后再反馈信息！","no");
            return false;
        }
        var content=$('#conm_cont').val();
        if(!content){
            dialog("对不起！您必须输入有效内容！","no");
        }
        $.post(link_url+"tkid="+sessionStorage.tkid+"&m=feedback",
            {"content":content},
            function(data){
                if(1==data){
                    dialog("您的反馈已成功提交！感谢您对自由寻的支持！","ok");
                    $('#conm_cont').val("");
                }
                else{
                    dialog(data,"no");
                }
            });
    });
    
    
    
    
    
    
    
    
    
    
    
    $("#gototop").click(function(){
       goTotop("tab1");
    });
    
    
    
    //icheck的插件
     $('input').iCheck({
        checkboxClass: 'icheckbox_flat-orange',
        radioClass: 'iradio_flat-orange'
      });
    
    
    
//    var $container = $('#show_selllist');
//    // initialize
//    $container.masonry({
//        columnWidth: 0,
//      itemSelector: '.item'
//    });
//    var msnry = $container.data('masonry');    
});

//获取地点





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
    
//    检查是否是数字
function is_endint(val){

    var isnum=val.match(/\d+$/); 
  if(isnum==null){
      return false;
  }
  else{
      return isnum;
  }
 } 
 
 function is_int(val){

    var isnum=val.match(/^\d+$/); 
  if(isnum==null){
      return false;
  }
  else{
      return isnum;
  }
 } 
  function is_num(val){

    var isnum=val.match(/^\d+(.\d+)*$/); 
  if(isnum==null){
      return false;
  }
  else{
      return isnum;
  }
 }
  function is_tel(val){

    var isnum=val.match(/^\d+(-\d+)*$/); 
  if(isnum==null){
      return false;
  }
  else{
      return isnum;
  }
 } 
   function is_email(val){

    var isemail=val.match(/^\w+@\w+.\w+$/); 
  if(isemail==null){
      return false;
  }
  else{
      return isemail;
  }
 } 
 
 
 function waiting(id){
     var opts = {
            lines: 9, // The number of lines to draw
            length: 0, // The length of each line
            width: 10, // The line thickness
            radius: 15, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var target = document.getElementById(id);
        var spinner = new Spinner(opts).spin(target);
 }
 
 function dialog(text,type){
     if(!type){
         type="ok";
     }
     if("ok"==type){
         var pic="http://freetofind-main.stor.sinaapp.com/check.png";
         var speed="1e3";
     }
     else if("no"==type){
         var pic="http://freetofind-main.stor.sinaapp.com/cross.png";
         var speed="2e3";
     }
     iosOverlay({
		text: text,
		duration: speed,
//		icon: pic
	});
 }
 
 
 function show_right_menu(){
     $('#right_menu').slideToggle("fast");
     
 }

  function hide_right_menu(){
     $('#right_menu').slideUp("fast");
     
 }
 
   function show_pic_menu(){
     $('#pic_menu').slideToggle("fast");
     
 }
 
   function hide_pic_menu(){
     $('#pic_menu').slideUp("fast");
     
    }
 
    function up_pic(){
        $('#m_pic').click();
        $('#m_pic').show();
    }
    
    function up_audi(){
        $('#m_audi').click();
        $('#m_audi').show();
    }
 
 
  function show_send(id){
     goTotop('tab1');
     $('#send').slideDown("fast");
     if(id){
         $('#linknum').val(id);
     }
     else{
         $('#linknum').val("");
     }
     
 }

 function goTotop(obj){
	var _targetTop = $('#'+obj).offset().top;//获取位置
	jQuery("html,body").animate({scrollTop:_targetTop},300);//跳转
}