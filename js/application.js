!function ($) {

  $.fn.floatmsg = function(opt) {
    var self = $(this);
    var alert_class = 'alert alert-danger';
    var msg = 'An error has occurred.';
    if (typeof opt === 'string'){
      if (opt === 'show')
        return self.addClass('active');
      if (opt === 'hide')
        return self.removeClass('active');
    }
    else if (typeof opt.msg === 'undefined')
      return self;
    if (typeof opt.style === 'undefined')
      alert_style = 'alert alert-danger';
    else
      alert_style = 'alert alert-' + opt.style;
    msg = opt.msg;
    self.html('<div class="' + alert_style + '"><p>' + msg + '</p></div>').floatmsg('show');
    return self;
  }

  $(function(){
    // $('.float-msg').floatmsg({msg: 'An error has occurred. Click <a href="#">here</a> for details'});

    $('#modal-login .modal-login-submit').on('click', function (e) {
      var self = $(this);
      var logindata = {};
      logindata.email = $('#modal-login #cies_email').val();
      logindata.password = $('#modal-login #cies_password').val();
      $('#modal-login .form-group').removeClass('has-error');
      if (logindata.email.search(/[a-zA-z0-9]+@[a-zA-z0-9]+\.[a-zA-z]+/g) < 0) {
        $('.float-msg').floatmsg({msg: '请输入正确的电子邮箱。'});
        $('#modal-login #cies_email').parents('.form-group').addClass('has-error');
        return;
      }
      if (logindata.password.length < 6 || logindata.password.length > 16) {
        $('.float-msg').floatmsg({msg: '请输入6~16位的密码。'});
        $('#modal-login #cies_password').parents('.form-group').addClass('has-error');
        return;
      }
      $('.float-msg').floatmsg('hide');
      $('#modal-login .form-group').removeClass('has-error');
      self.button('loading');
      $.ajax({
        url: '/login_ajax',
        method: 'POST',
        data: logindata,
        dataType: 'json',
        success: function (data, status, xhr) {
          var navbar_right = $('.navbar .navbar-right');
          navbar_right.find('.nav-before-login').remove();
          navbar_right.prepend('<li class=""><a href="#">OPS>>' + data.username + '</a></li>');
          $('#modal-login').modal('hide');
          self.button('complete');
        },
        error: function (xhr, status, err) {
          $('.float-msg').floatmsg({msg: '噢，出错了。\n' + err});
          self.button('reset');
        }
      });
    });

    $('#modal-login').on('hide.bs.modal', function (e) {
      $('#modal-login .form-group').removeClass('has-error');
      $('.float-msg').floatmsg('hide');
    })
  })

}(window.jQuery)
