$(document).ready(function(){
    //文字域自动增长
    autosize(document.querySelectorAll('textarea'));
});  
function moretake(id){
    $('#loreg').show();
    $('#forget').hide();
}