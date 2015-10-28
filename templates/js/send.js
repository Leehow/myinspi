$(document).ready(function(){
    //--------------------------------------------录入内容
    $('#my_send').click(function(){
        var content      =$('#send_text').val();
        var pic          =$('#demo_pic').attr("src");
        var tid          =$('#linknum').val();
        var audi         =$('#show_audio').val();
        var swf          =$('#vswf').val();
        var ytb          =$('#vytb').val();
        content_insert(content,pic,audi,swf,ytb,tid);
        $('#vswf').val('');
        $('#vytb').val('');
        $('#send_text').val('');
        $('#pic').val('');
        $('#m_pic_show').html('');
        $('#m_audi_show').html('');
        $('#linknum').val('');
    });
    upic("#m_pic");
    upaudi("#m_audi");
    
    
});
function content_insert(content,pic,audi,swf,ytb,id){
        if(!sessionStorage.tkid){
            dialog('对不起！请登录后再输入内容！Sorry! Please first login!');
            return false;
        }
        var content0=replaceTextarea1(content);
        $.post(link_url+"tkid="+sessionStorage.tkid+"&m=insert",
            {"content":content0,"tid":id,"con_swf":swf,"con_ytb":ytb},
            function(msg){
//                    var data=msg;
                    var data=msg.substr(1);
                    if(pic){
                        var show_pic='<img name="" src="'+pic+'" width="500" height="500" class="img-rounded" alt="" />';
                    }
                    else{
                        var show_pic='';
                    }
                    if(audi){
                         var ha='<br /><audio controls>'+
                        '<source src="'+audi+'" type="audio/ogg">'+
                        'Your browser does not support the audio element.'+
                        '</audio>';
                    }
                    else{
                        var ha='';
                    }
                    if(swf){
                         var swf='<br /><embed src="'+swf+'" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>';
                    }
                    else{
                        var swf='';
                    }
                    if(ytb){
                        ytb=ytb.substr(17);
                         var ytb='<iframe width="420" height="315" src="https://www.youtube.com/embed/'+ytb+'" frameborder="0" allowfullscreen></iframe>';
                    }
                    else{
                        var ytb='';
                    }
                    
                    var content1=replaceTextarea3(content0);
                    var con0=content1.substr(0,10);
                    var con1=content.substr(0,50);
                    var con2=content.substr(50);
                    con1 = changmo(con1);
                    con2 = changmo(con2);
                    var shareurl=link_url_i+'?p=showout&t='+data;
                    if(con2){ 
                    var show_listtap='<div class="col-sm-6 col-md-4">'+
                    '<div class="thumbnail"><div class="caption">'+
                    
                     '<small class="gray">now</small>&nbsp;&nbsp;'+
                    '<div class="btn-group">'+
                    '<button class="button button-borderless button-highlight button-tiny" data-toggle="dropdown" aria-expanded="false">more <i class="glyphicon glyphicon-plus"></i></button>'+
                    '<ul class="dropdown-menu" role="menu">'+
                    '<li><a data-toggle="collapse" href="#share'+data+'" aria-expanded="false" aria-controls="share'+data+'">分享Share</a></li>'+
                    '<li><a href="#" onclick="show_send('+data+')">连发Link</a></li>'+
                    '<li class="divider"></li>'+
                    '<li><a href="javascript:;" onclick="delete_mycontent('+data+')">删除Delete</a></li>'+
                    '</ul>'+
                    '</div>'+
                            '<span class="collapse" id="share'+data+'"><textarea class="form-control" rows="2">http://mobilcms.sinaapp.com/?p=showout&t='+data+'</textarea><br /><p align="center"><span id="share_pic_'+data+'"></span></p><hr /></span>'+
                            
//                            '<p><small class="gray">now</small><small class="pull-right"><a data-toggle="collapse" href="#share'+data+'" aria-expanded="false" aria-controls="share'+data+'">分享share</a></small></p>'+
//                        '<span class="collapse" id="share'+data+'"><textarea class="form-control" rows="2">http://mobilcms.sinaapp.com/?p=showout&t='+data+'</textarea><hr /></span>'+    
                        '<p>'+con1+
                                '<span class="collapse" id="collapse1">'+con2+'</span></p>'+
                            '<p><a class="gray" data-toggle="collapse" href="#collapse1" aria-expanded="false" aria-controls="collapse1">more</a>'+
                            '</p>'+
//                            '&nbsp;<a href="#" onclick="show_send('+data+')" class="gray pull-right">link</a></p>'+
                            '</div>'+
                      '<a href="'+pic+'" data-lightbox="image-0" data-title="'+con0+'">'+show_pic+'</a>'+
                      ha+swf+ytb+
                    '</div></div>';
                    }
                    else{
                        var show_listtap='<div class="col-sm-6 col-md-4">'+
                    '<div class="thumbnail"><div class="caption">'+
                     '<small class="gray">now</small>&nbsp;&nbsp;'+
                    '<div class="btn-group">'+
                    '<button class="button button-borderless button-highlight button-tiny" data-toggle="dropdown" aria-expanded="false">more <i class="glyphicon glyphicon-plus"></i></button>'+
                    '<ul class="dropdown-menu" role="menu">'+
                    '<li><a data-toggle="collapse" href="#share'+data+'" aria-expanded="false" aria-controls="share'+data+'">分享Share</a></li>'+
                    '<li><a href="#" onclick="show_send('+data+')">连发Link</a></li>'+
                    '<li class="divider"></li>'+
                    '<li><a href="javascript:;" onclick="delete_mycontent('+data+')">删除Delete</a></li>'+
                    '</ul>'+
                    '</div>'+
                            '<span class="collapse" id="share'+data+'"><textarea class="form-control" rows="2">http://www.myinspi.com?p=showout&t='+data+'</textarea><br /><p align="center"><span id="share_pic_'+data+'"></span></p><hr /></span>'+
                            
//                            '<p><small class="gray">now</small><small class="pull-right"><a data-toggle="collapse" href="#share'+data+'" aria-expanded="false" aria-controls="share'+data+'">分享share</a></small></p>'+
//                        '<span class="collapse" id="share'+data+'"><textarea class="form-control" rows="2">http://mobilcms.sinaapp.com/?p=showout&t='+data+'</textarea><hr /></span>'+    
//                        '<p>'+content+'</p><p>&nbsp;<a href="#" onclick="show_send('+data+')" class="gray pull-right">link</a></p>'+
                                '<p>'+content+'</p>'+
                            '</div>'+
                      '<a href="'+pic+'" data-lightbox="image-0" data-title="'+con0+'">'+show_pic+'</a>'+
                      ha+swf+ytb+
                    '</div></div>';
                    }
                    
                    
                    $('#show_mysell_first').after(show_listtap);
                    $('#share_pic_'+data+'').qrcode('http://www.myinspi.com?p=showout&t='+data);
                    dialog('成功发布！Success!');
                    show_send();
            });
    }
function upic(cid){
        $(cid).wrap("<form id='myupload' action='"+link_url+"tkid="+sessionStorage.tkid+"&m=show_upic' method='post' enctype='multipart/form-data'></form>");
        function th(Val){
            $(cid+'_show').html('<div class="progress">'+
                             '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+Val+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Val+'%"></div>'+
                            '<div>'+Val+'%</div></div>');
        }
        $(cid).change(function(){
            ;
		$("#myupload").ajaxSubmit({
			dataType:  'json',
			beforeSend: function() {
                        $('#c_bar').attr("class","");
                        var Val = '0';
                        th(Val);
    		},
    		uploadProgress: function(event, position, total, percentComplete) {
        		var percentVal = percentComplete + '%';
                        th(percentComplete);
    		},
			success: function(data) {
                        $('#m_pic_show').html("");
    			var img_name= data.pic_name;
    			var img_url = data.pic_url;
                        $('#m_pic_show').html('<img id="demo_pic" src="'+img_url+'" width="100%" class="img-rounded"><br /><a href="#" onclick="delpic()">删除</a>');
			},
			error:function(xhr){
                            $('#m_pic_show').html("上传失败:"+xhr.responseText);
//				btn.html("上传失败");
//				bar.width('0')
//				files.html(xhr.responseText);
//                                xx.show();
			}
		});
	});
    }
    
    function upaudi(cid){
        $(cid).wrap("<form id='myupload2' action='"+link_url+"tkid="+sessionStorage.tkid+"&m=upradio' method='post' enctype='multipart/form-data'></form>");
        function th(Val){
            $(cid+'_show').html('<div class="progress2">'+
                             '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+Val+'" aria-valuemin="0" aria-valuemax="100" style="width: '+Val+'%"></div>'+
                            '<div>'+Val+'%</div></div>');
        }
        $(cid).change(function(){
            ;
		$("#myupload2").ajaxSubmit({
			dataType:  'json',
			beforeSend: function() {
                        $('#c_bar').attr("class","");
                        var Val = '0';
                        th(Val);
    		},
    		uploadProgress: function(event, position, total, percentComplete) {
        		var percentVal = percentComplete + '%';
                        th(percentComplete);
    		},
			success: function(data) {
                        $(cid+'_show').html("");
    			var audi_name= data.m_name;
    			var audi_url = data.m_url;
                        var ha='<audio controls>'+
                        '<source src="'+audi_url+'" type="audio/ogg">'+
                        'Your browser does not support the audio element.'+
                        '</audio>'+
                        '<input type="hidden" id="show_audio" value="'+audi_url+'">';
                        $(cid+'_show').html('<br />'+ha+'<br /><a href="#" onclick="delpic()">删除</a>');
			},
			error:function(xhr){
                            $(cid+'_show').html("上传失败:"+xhr.responseText);
//				btn.html("上传失败");
//				bar.width('0')
//				files.html(xhr.responseText);
//                                xx.show();
			}
		});
	});
    }
    
    function delpic(){
        $('#m_pic_show').html('');
        $('#m_audi_show').html('');
        $.get(link_url+"tkid="+sessionStorage.tkid+"&m=pic_delet",function(msg){
            return true;
        });
    }
    