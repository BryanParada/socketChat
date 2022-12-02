var socket = io();

var params = new URLSearchParams( window.location.search);

if (!params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('Name and room is required');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Connected to the server');

    socket.emit('enterChat', user, function( resp ){
        //console.log('Connected users', resp); 
        renderizeUsers(resp); //resp = arreglo de usuarios
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Lost connection to the server');

});


// Enviar información
// socket.emit('createMessage', {
//     name: 'Fernando',
//     message: 'Hola Mundo'
// }, function(resp) {
//     console.log('Server response: ', resp);
// });

// Escuchar información
socket.on('createMessage', function(mensaje) {

    console.log('Server:', mensaje);

});

//Escuchar cambiso de usuarios
// cuando un usario entra o sale del chat
socket.on('listPerson', function(persons) { 
    //console.log(persons);
    renderizeUsers(persons);
});

//mensajes privados
//ACCION DEL CLIENTE
socket.on('privateMessage', function(message){
    console.log('Private message: ', message);
    
})

