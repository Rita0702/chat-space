$(function(){
  var search_list = $('#user-search-result');
  var member_list = $('#user-add-result');

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <div class ="chat-group-user__name">${ user.name }</div>
                  <a class ="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name } >追加</a>
                </div> `
    search_list.append(html);
  }
  function appendMember(name, userId){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                  <input name="group[user_ids][]" type="hidden" value=${ userId }>
                  <p class="chat-group-user__name">${ name }</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    member_list.append(html);
  }
  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <div class="chat-group-user__name">${ user }</div>
                </div> `
    search_list.append(html);
  }
  
  $(function(){
    $('#user-search-field').on('keyup',function(){
      var input = $('#user-search-field').val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(user){
        if (user.length !== 0){
          $('#user-search-result').empty();
          user.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          $('#user-search-result').empty();
          appendNoUser('一致するユーザーがいません');
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    });
  });
  
    $(document).on('click','.user-search-add',function(){
      var name = $(this).data('userName');
      var userId = $(this).data('userId');
      $(this).parent().remove();
      appendMember(name, userId);
    });

    $(document).on('click','.user-search-remove',function(){
      $(this).parent().remove();
    });
  
});

