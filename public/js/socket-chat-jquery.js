var params = new URLSearchParams( window.location.search);

var user = params.get('name');
var room = params.get('room')

//referencias de jquery
var divUsers    = $('#divUsers');
var formSend    = $('#formSend');
var txtMessage  = $('#txtMessage');
var divChatbox  = $('#divChatbox');
var divTitle    = $('#divTitle');

// funciones para renderizar usuarios
function renderizeUsers( persons ){ //[{},{},{}]

    divTitle.html('<h3 class="box-title">Chat room <small>' + params.get('room') + '</small> </h3>')

    var html = '';
    
    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat of <span> ' + params.get('room') + ' </span></a>';
    html += '</li>';

for( var i = 0; i<persons.length; i++){ 
    var imgUs = i + 1;
    
    html += '<li>'
    html +=  ' <a data-id="'+ persons[i].id + '" href="javascript:void(0)"><img src="assets/images/users/'+imgUs.toString()+'.jpg" alt="user-img" class="img-circle"> <span>' + persons[i].name + ' <small class="text-success">online</small></span></a>'
    html += '</li>'
}

divUsers.html(html);



}

//Listeners
divUsers.on('click', 'a', function(){ //a = en cualquier anchortype

    var id = $(this).data('id');

    if (id){
        console.log(id);
    }
});

formSend.on('submit', function(event){

    event.preventDefault();

    if (txtMessage.val().trim().length === 0 ){
        return;
    } 
     
    
    socket.emit('createMessage', {
        name: user,
        message: txtMessage.val()
    }, function(message) {
        txtMessage.val('').focus();
        renderizeMessages(message, true);
        scrollBottom();
    });


})

function renderizeMessages( message, me ){
    var html = ''
    var date = new Date(message.date)
    var hour = date.getHours() + ':' + date.getMinutes();

    var adminClass = 'info';
    if (message.name === 'Admin'){
        adminClass = 'danger';
    }

    if (me){
        html += '<li class="reverse">'
        html += '<div class="chat-content">'
        html += '    <h5>'+ message.name +'</h5>'
        html += '    <div class="box bg-light-inverse">'+message.message+'</div>'
        html += '</div>'
        html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        html += '<div class="chat-time">'+hour+'</div>'
    }else{
        html += '<li class="animated fadeIn">'
        if(message.name !== 'Admin'){
            html += '   <div class="chat-img"><img src="assets/images/users/2.jpg" alt="user" /></div>' 
        }
        html += '   <div class="chat-content">'
        html += '       <h5>'+ message.name +'</h5>'
        html += '       <div class="box bg-light-'+adminClass+'">'+message.message+'</div>'
        html += '   </div>'
        html += '   <div class="chat-time">'+hour+'</div>'
        html += '</li>'

    }
 

    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}