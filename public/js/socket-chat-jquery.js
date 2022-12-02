var params = new URLSearchParams( window.location.search);

var user = params.get('name');
var room = params.get('room')

//referencias de jquery
var divUsers = $('#divUsers');
var formSend = $('#formSend');
var txtMessage  = $('#txtMessage');
var divChatbox  = $('#divChatbox');

// funciones para renderizar usuarios
function renderizeUsers( persons ){ //[{},{},{}]

    var html = '';
    
    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat of <span> ' + params.get('room') + ' </span></a>';
    html += '</li>';

for( var i = 0; i<persons.length; i++){
    html += '<li>'
    html +=  ' <a data-id="'+ persons[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persons[i].name + ' <small class="text-success">online</small></span></a>'
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
        renderizeMessages(message);
    });


})

function renderizeMessages( message){
    var html = ''

    html += '<li class="animated fadeIn">'
    html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
    html += '   <div class="chat-content">'
    html += '       <h5>'+ message.name +'</h5>'
    html += '       <div class="box bg-light-info">'+message.message+'</div>'
    html += '   </div>'
    html += '   <div class="chat-time">10:56 am</div>'
    html += '</li>'

    divChatbox.append(html);

}