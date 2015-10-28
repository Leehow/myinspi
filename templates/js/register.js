$(document).ready(function(){
    
    if(sessionStorage.tkid){
        $('#main').show();
        $('.gototop').show();
        $('#loginbox').hide();
    }
    
    
    
    $('#username').keydown(function(){
        if(event.keyCode ==13){
            $('#password').focus();
        }
    });
    
    $('#password').keydown(function(){
        if(event.keyCode ==13){
            $('#login').click();
        }
    });
    

    var usr=$('#username').val();
    var psw=$('#password').val();
    var repsw=$('#repassword').val();
    var key=$('#key').val();
    function rer(){
        $('#rpsw').hide();//隐藏再次输入密码
        $('#ackey').hide();//隐藏邀请码
        $('#forget').hide();
        $('#forgetwarning').hide();//忘记密码提示隐藏
        $('#main').hide();//中间主要内容隐藏
        $('.gototop').hide();
        $('#username').val("");
        $('#password').val("");
        $('#repassword').val("");
        $('#key').val("");
        $('#goregister').show();
        $('#toregister').hide();
    }
    
    //----------------------------------------------注册功能
    //点击注册/如果重复密码有内容则直接注册
    $('#goregister').click(function(){ 
        $('#rpsw').show();//显示再次输入密码
        $('#ackey').show();//显示邀请码
        $('#goregister').hide();
        $('#toregister').show();

    });
    $('#toregister').click(function(){
        $("#toregister").button('loading');
        var rusr=$('#username').val();
        var rpsw=$('#password').val();
        var rrpsw=$('#repassword').val();
        var rallow=$('#key').val();
        if(!(rusr && rpsw && rrpsw)){
                    dialog('请填写完所有资料!Please complete all information!');
                    $("#toregister").button('reset');
                    return false;
                }
        if(rpsw!=rrpsw){
            dialog('两次密码输入不一致！请重新输入！Enter the password twice inconsistent! Please re-enter!');
            $("#toregister").button('reset');
            return false;
        }        
        $.post(link_url+"m=register",
                        {'usr':rusr,'psw':rpsw,'rpsw':rrpsw,'allow':rallow},
                        function(msg){
                            $("#toregister").button('reset');
                        if(msg==1){
                                dialog("注册成功！Success!");
                                rer();
                        }else{
                                dialog(msg);
                        }
        });
    });
    //----------------------------------------------登录
    $('#login').click(function(){
        $("#login").button('loading');
        var usr=$('#username').val();
        var psw=$('#password').val();
        $('#password').val("");
        var keep=document.getElementById("keeplogin").checked;
        if(!(usr && psw)){
                    dialog('请填写完用户名和密码!Please fill out the user name and password!');
                    $("#login").button('reset');
                    return false;
                } 
        $.post(link_url+"m=login",
                        {"usr":usr,"psw":psw},
                        function(msg){
                            $("#login").button('reset');
                            var data=msg;
                            if(data!='0') {
                                    sessionStorage.tkid=data;
                                    if(true==keep){
                                        localStorage.tkid=data;
                                    }
                                    $('#main').show();
                                    $('.gototop').show();
                                    $('#loginbox').hide();
                                    show_mycontent(0,10);
                                    }
                            else
                                    dialog('您的用户名或密码错误!Your user name or password is incorrect!');
                    },'json');
    });
    //----------------------------------------------注销
    $("#logout").click(function(){
            $.get(link_url+"m=logout",
                            {"tkid":sessionStorage.tkid},
                            function(msg){
                                    var data=msg;
                                    if(data==1) {
//                                        dialog('成功注销！');
                                            sessionStorage.clear(); 	
                                            localStorage.clear();
                                            $.cookie('tkid',null);
                                            
                                            $('#main').hide();
                                            $('.gototop').hide();
                                            $('#loginbox').show();
                                            rer();
                                            }
                                    else{
                                            dialog('注销失败！Logout failed!'+data);
                                    }
                            },'json');


    });
    
    
    
    
    //        --------------------------------------------修改密码
        $("#sendpassword").click(function(){
            var usr=$('#username').val();
            var psw=$('#password').val();
            var rpsw=$('#repassword').val();
            $('#password').val("");
            $('#repassword').val("");
            if(psw!=rpsw){
                dialog('两次密码不一致请重新输入!Please re-enter the password twice inconsistent!');
                return false;
            }
            $.post(link_url+"m=email_psw",
				{"usr":usr,"psw":psw,"rpsw":rpsw},
				function(msg){
                                    if(msg!=1){
                                        dialog("出错鸟~error~"+msg);
                                    }
                                    else{
                                        dialog("成功！快去邮箱看看吧！Success! Mailbox go see it!");
                                        $('#gologin').click();
                                    }
				});
        });
});
