$(document).ready(function(){
    if(sessionStorage.tkid){
        show_mycontent(0,30);
    }
});


function show_mycontent(page,pagesize,search){
        var $container = $('#show_mysell');
        //加载等待
        if(0==page){
            $container.html('');
            $container.append('<div id="foott" class="col-md-12"><span class="center-block" id="foo" style="width:100px; height:200px;"></span></div>');
        }
        
        waiting("foo");
        
        $.get(link_url+"tkid="+sessionStorage.tkid+"&m=show_mycontent",
            {page:page,pagesize:pagesize,search:search},
            function(msg){
                //如果是第一页则清除内容
                goTotop("tab1");
                $('#foott').remove();//去掉加载等待
                $('#bmss').remove();//去掉无内容提示
                $("#more").button('reset');//恢复更多按钮
                
                var data=msg;
                if(data){
                    //更新更多按钮
                    var new_page=page+1;
                    $('#more').attr("onclick","get_more("+new_page+")");
                }
                else{
                    //加载无内容提示
                    $container.append('<div id="bmss" class="col-md-12"><h3 class="center-block">对不起！已经没有更多内容了！</h3><h3>Sorry!There are no more information!</h3></div>');
//                    $container.masonry('destroy');
                }
                //-----------------------------这后面才是刷出来的内容
                $.each(data,function(l,r){
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
                    var title2=replaceTextarea2(title);//获取换行
                    var con1=title2.substr(0,50);
                    var con2=title2.substr(50);
                    con1 = changmo(con1);
                    con2 = changmo(con2);
                    var vpic=''; //图片
                    var ha='';  //音频
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
                         var swf='<br /><embed src="'+swf+'" quality="high" width="100%" height="350" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash"></embed>';
                    }
                    else{
                        var swf='';
                    }
                    if(ytb && ytb!='0'){
                        ytb=ytb.substr(17);
                         var ytb='<iframe width="100%" height="350" src="https://www.youtube.com/embed/'+ytb+'" frameborder="0" allowfullscreen></iframe>';
                    }
                    else{
                        var ytb='';
                    }
                    
                    var shareurl=link_url_i+"?p=showout&t="+id;
                    if(!con2){
//                        如果没有被切断
                        var words='<div id="show_con_'+id+'" class="col-sm-6 col-md-4">'+
                    '<div class="thumbnail"><div class="caption">'+
                    '<small class="gray">'+time+'</small>&nbsp;&nbsp;'+
                    '<div class="btn-group">'+
                    '<button class="button button-borderless button-highlight button-tiny" data-toggle="dropdown" aria-expanded="false">more <i class="glyphicon glyphicon-plus"></i></button>'+
                    '<ul class="dropdown-menu" role="menu">'+
                    '<li><a data-toggle="collapse" href="#share'+id+'" aria-expanded="false" aria-controls="share'+id+'">分享Share</a></li>'+
                    '<li><a href="#" onclick="show_send('+id+')">连发Link</a></li>'+
                    '<li class="divider"></li>'+
                    '<li><a href="javascript:;" onclick="delete_mycontent('+id+')">删除Delete</a></li>'+
                    '</ul>'+
                    '</div>'+
                            '<span class="collapse" id="share'+id+'"><textarea class="form-control" rows="2">'+shareurl+'</textarea><br /><p align="center"><span id="share_pic_'+id+'"></span></p><hr /></span>'+
                            '<p>'+con1+'</p>'+
                      '</div>'+vpic+ha+swf+ytb+'</div></div>';
                    }
                    else{
//                        如果有被切断
                        var words='<div id="show_con_'+id+'" class="col-sm-6 col-md-4">'+
                            '<div class="thumbnail"><div class="caption">'+
                            '<div class="btn-group">'+
                            '<small class="gray">'+time+'</small>&nbsp;&nbsp;'+
                            '<button class="button button-borderless button-highlight button-tiny" data-toggle="dropdown" aria-expanded="false">more <i class="glyphicon glyphicon-plus"></i></button>'+
                            '<ul class="dropdown-menu" role="menu">'+
                            '<li><a data-toggle="collapse" href="#share'+id+'" aria-expanded="false" aria-controls="share'+id+'">分享Share</a></li>'+
                            '<li><a href="#" onclick="show_send('+id+')">连发Link</a></li>'+
                            '<li class="divider"></li>'+
                            '<li><a href="javascript:;" onclick="delete_mycontent('+id+')">删除Delete</a></li>'+
                            '</ul>'+
                            '</div>'+
                            '<span class="collapse" id="share'+id+'"><textarea class="form-control" rows="2">'+shareurl+'</textarea><br /><p align="center"><span id="share_pic_'+id+'"></span></p><hr /></span>'+
                            '<p>'+con1+
                                '<span class="collapse" id="collapse'+id+'">'+con2+'</span>'+
                            '</p><p><a class="gray" data-toggle="collapse" href="#collapse'+id+'" aria-expanded="false" aria-controls="collapse'+id+'">more</a></p>'+
                      '</div>'+vpic+ha+swf+ytb+'</div></div>';
                    }
                    
                    //若有搜索内容则标出
//                    if(search){
//                        title=msg_mark(search,title);
//                    }
                    
                    
                    $container.append(words);
                    $('#share_pic_'+id+'').qrcode(shareurl);
//                $('#topicn_'+id).popover('hide');
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
function delete_mycontent(id){
    $("#show_con_"+id).hide();
    $.post(link_url+"tkid="+sessionStorage.tkid+"&m=con_delete",
            {content_id:id},
            function(msg){
                var msg=msg.substr(1);
                if('0'!=msg){
                    alert("删除失败"+msg);
                    $("#show_con_"+id).show();
                }
            });
            }