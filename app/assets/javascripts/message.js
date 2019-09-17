$(function(){
  function buildHTML(message){
    var image = message.image.url ? `<img src="${ message.image.url }">` : ``;
    var html = `<div class="message" data-id="${message.id}">
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
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight }, 1);
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
      $('.form__submit').prop('disabled',false);
      scroll();
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージを送信することに失敗しました');
      $('.form__submit').prop('disabled',false);
    })
  })

  var reloadMessages = function(){
    
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message_last:last').data("message-id");

      $.ajax({
        Type: 'GET',
        url:  'api/messages',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages){
        var insertHTML ='';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
          $('.messages').append(insertHTML);
          scroll();
        })
      })
      .fail(function(){
        alert('メッセージを送信することに失敗しました');
      });
    };
  }
  setInterval(reloadMessages, 5000);
});
  


