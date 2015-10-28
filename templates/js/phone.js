$(document).ready(function(){
    if(sessionStorage.tkid){
        $('#take_photo').show();
    }
    else{
        $('#take_photo').hide();
    }
});
















var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

// Wait for Cordova to connect with the device
//
document.addEventListener("deviceready",onDeviceReady,false);

// Cordova is ready to be used!
//初始化
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    document.addEventListener("menubutton", onMenuKeyDown, false);
    document.addEventListener("backbutton", onBackKeyDown, false);

}
//-----------------------------------退出命令
function exit_app(){
    navigator.notification.confirm(
            '是否退出？Exit?',
            onconfirm,
            '退出程序 Exit',
            '确认 yes,取消 no'
            );
}
function onconfirm(button){
    if(button==1){
        navigator.app.exitApp();
    }
}

//-------------------------------------------------------------------menu键
function onMenuKeyDown() {
//    $("header").attr("class","headroom headroom--pinned");
    $("#list_rightmenu").click();
    
}
//-------------------------------------------------------------------返回键
function onBackKeyDown(){
    exit_app();
}
//-------------------------------------------------------------------下面是照相相关的
//“From Photo Library”/“From Photo Album”按钮点击事件触发函数 这里是上传头像
function getPhoto(source) {

             // 从设定的来源处获取图像文件URI
             navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
             destinationType: destinationType.FILE_URI,sourceType: source,allowEdit:true });
}
function cameraTopic(){
    // 从设定的来源处获取图像文件URI
             navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,allowEdit:true });
}

function cameraPic(){
    // 从设定的来源处获取图像文件URI
             navigator.camera.getPicture(onPicURISuccess, onFail, { quality: 50,allowEdit:true });
}

function getPic(source) {

             // 从设定的来源处获取图像文件URI
             navigator.camera.getPicture(onPicURISuccess, onFail, { quality: 50,
             destinationType: destinationType.FILE_URI,sourceType: source,allowEdit:true });
}

var imguri;
// 当成功得到一张头像照片的URI后被调用
//function onPhotoURISuccess(imageURI) {
//             // 获取图片句柄
//             var largeImage = document.getElementById('tpic');
//             imguri=imageURI;
//             // 取消隐藏的图像元素
//             largeImage.style.display = 'block';
//             // 使用内嵌CSS规则来缩放图片
//             largeImage.src = imageURI;
//
//
//
//                var options = new FileUploadOptions();
//                options.fileKey="mypic";
//                options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
//                options.mimeType="image/jpeg";
//                options.chunkedMode=false;
//
//                var params = new Object();
//                params.value1 = "test";
//                params.value2 = "param";
//
//                options.params = params;
//
//                var ft = new FileTransfer();
//                ft.upload(imageURI, link_url+"tkid="+sessionStorage.tkid+"&m=show_uptopic&type=1", win_topic, fail, options);
//     }

 //当成功获取图片以后
 function onPicURISuccess(imageURI) {

                var options = new FileUploadOptions();
                options.fileKey="mypic";
                options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                options.mimeType="image/jpeg";
                options.chunkedMode=false;
                imguri=imageURI;
                
                dialog('正在上传请稍后 Wait a second...');
                $('#m_pic_show').html('<div id="foott" class="col-md-12"><span class="center-block" id="foo" style="width:100px; height:200px;"></span></div>');
                waiting("foo");
                

                var params = new Object();
                params.value1 = "test";
                params.value2 = "param";

                options.params = params;

                var ft = new FileTransfer();
                ft.upload(imageURI, link_url+"tkid="+sessionStorage.tkid+"&m=show_upic&type=1", win, fail, options);
     }
             // 当有错误发生时触发此函数
function onFail(message) {
             navigator.notification.alert('没上传成功！Fail: ' + message);
}

//function win_topic(r) {
//    var pid     =$('#cpicid').val(),
//        picn    ="mypic";
//    var u=set_usr();
//    u.chg_my(null,pid,picn);
//    if(1==r.response){
//        // 获取图片句柄
//        $('#m_pic_show').html('<img id="demo_pic" src="'+imguri+'" width="80%" class="img-rounded">');
//        navigator.notification.alert("成功上传图片！Success!", null, '提示Notice');
//        imguri=null;
//    }
//    else{
//        navigator.notification.alert(r.response, null, '提示Notice');
//        imguri=null;
//    }
//
//
//}
function win(r) {
    var search=new RegExp("1");
    var ob=search.test(r.response); 
    if(true==ob){
        $('#m_pic_show').html('<img id="demo_pic" src="'+imguri+'" width="80%" class="img-rounded">');
        navigator.notification.alert("成功上传图片！Success!", null, '提示 Notice');
        imguri=null;
    }
    else{
        navigator.notification.alert(r.response, null, '提示 Notice');
        imguri=null;
    }


}
//上传过程过发生错误
function fail(error) {
    alert("出现了一丢丢错误 Wrongwrong: Code = " + error.code);
//            console.log("upload error source " + error.source);
//            console.log("upload error target " + error.target);
}
//-------------------------------------------------------------------照相相关的完