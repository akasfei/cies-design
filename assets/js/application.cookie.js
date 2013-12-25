function csrfSafeMethod(method){
    return (/^(GET|HEAD|OPTION|TRACE)$/.test(method));
}

!function($){
    $(function(){
        $.ajaxSetup({
            crossDomain:false,
            beforeSend:function(xhr,settings){
                if(!csrfSafeMethod(settings.type)){
                    var csrftoken = $.cookie('csrftoken');
                    xhr.setRequestHeader('X-CSRFToken',csrftoken);
                }
            }
        });
    });
}(window.jQuery)

