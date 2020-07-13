$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
      `<div class="chat-main__message-list__items" data-message-id=${message.id}>
        <ul class="chat-main__message-list__items__headder">
          <li class="chat-main__message-list__items__headder__user-name">
            ${message.user_name}
          </li>
          <li class="chat-main__message-list__items__headder__time-stamp">
            ${message.created_at}
          </li>
        </ul>
        <div class="chat-main__message-list__items__bottom">
          <p class="chat-main__message-list__items__bottom__message">${message.content}</p>
          <img src=${message.image} class="chat-main__message-list__items__bottom__image">
        </div>
      </div>`
    } else {
      var html = 
      `<div class="chat-main__message-list__items" data-message-id=${message.id}>
        <ul class="chat-main__message-list__items__headder">
          <li class="chat-main__message-list__items__headder__user-name">
            ${message.user_name}
          </li>
          <li class="chat-main__message-list__items__headder__time-stamp">
            ${message.created_at}
          </li>
        </ul>
        <div class="chat-main__message-list__items__bottom">
          <p class="chat-main__message-list__items__bottom__message">${message.content}</p>
        </div>
      </div>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__message-list').append(html);
        $('.chat-main__message-list').animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $('form')[0].reset();
        $('.chat-main__message-form__submit-btn').prop('disabled', false);
      })
      .fail(function(){
        alert("メッセージの送信に失敗しました");
        $('.chat-main__message-form__submit-btn').prop('disabled', false);
      });
  })

  var reloadMessages = function(){
    var last_message_id = $('.chat-main__message-list__items:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0 ){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});