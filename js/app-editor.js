!function ($) {

  $(function(){
    $('.blog-tag-select').on('click', function (e) {
      var self = $(this);
      var tag = self.text();
      $('.blog-selected-tags').append('<div class="btn-group blog-selected-tag" data-tagname="' + tag + '"><a href="#" class="btn btn-default btn-sm blog-tag-selected active">' + tag + '</a><a href="#" class="blog-tag-remove btn btn-default btn-sm"><i class="glyphicon glyphicon-remove"></i></a></div>');
    });
    $('.blog-tag-add').on('click', function (e) {
      var tag = $('.blog-tag-input').val();
      if (tag.length < 1)
        return;
      $('.blog-selected-tags').append('<div class="btn-group blog-selected-tag" data-tagname="' + tag + '"><a href="#" class="btn btn-default btn-sm blog-tag-selected active">' + tag + '</a><a href="#" class="blog-tag-remove btn btn-default btn-sm"><i class="glyphicon glyphicon-remove"></i></a></div>');
    });
    $('.blog-selected-tags').on('click', '.blog-tag-remove', function (e) {
      $(this).parents('.blog-selected-tag').remove();
    });
    $('.blog-submit').on('click', function (e){
      e.preventDefault();
      var $titleInput = $('#blog_title');
      var $abstractInput = $('#blog_abstract');
      var $contentInput = $('#blog_content');
      $('#blog_editor .form-group').removeClass('has-error');
      if ( $titleInput.val().length < 4 ) {
        $('.float-msg').floatmsg({msg: '请输入至少为4个字的博客标题。'});
        $titleInput.parents('.form-group').addClass('has-error');
        return;
      }
      if ( $abstractInput.val().length < 4 ) {
        $('.float-msg').floatmsg({msg: '请输入至少为4个字的博客摘要。'});
        $abstractInput.parents('.form-group').addClass('has-error');
        return;
      }
      if ( $contentInput.val().length < 10) {
        $('.float-msg').floatmsg({msg: '博客内容太短！至少写10个字以上吧=_='});
        return;
      }
      $('.float-msg').floatmsg('hide');
      var $tags = $('.blog-selected-tag');
      var tags = [];
      for (var i=0; i < $tags.length; i++)
        tags.push($($tags[i]).attr('data-tagname'));
      $('#blog_tags').val(tags.join(','));
      $('#blog_editor').submit();
    });
  })

}(window.jQuery)
