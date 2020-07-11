$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
      `<div class="chat-main__message-list__items">
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
      `<div class="chat-main__message-list__items">
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
});