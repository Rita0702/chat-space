$(function(){
  function buildHTML(message){
    var image = '';
    if (message.image.url) {
      image = `<img src="${message.image.url}">`;
    }
    var html = `<div class="message">
                  <div class="message-top">
                    <div class="message-top__user-name">${message.user_name}</div>
                    <div class="message-top__date">${message.date}</div>
                  </div>
                  <div class="message-bottom">
                    <div class="message-bottom__comment">
                      <div class="comment">${message.text}</div>
                      <din class="lower-message__image">${ image }</div>
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
      alert('メッセージを送信することに失敗しました');
      $('.form__submit').prop('disabled',false);
    })
  })
});