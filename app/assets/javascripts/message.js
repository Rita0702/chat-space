$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message-top">
                    <div class="message-top__user-name">${message.user_name}</div>
                    <div class="message-top__date">${message.date}</div>
                  </div>
                  <div class="message-bottom">
                    <div class="message-bottom__comment">
                      <div class="comment">${message.text}</div>
                      <img src=${ message.image.url }>   
                    </div>
                  </div>
                </div>`
  return html;
  }
  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight }, 'swing');
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    // console.log(this)
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url:url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.form__submit').prop('disabled',false);
      scroll();
    })
    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled',false);
    })
  })
});