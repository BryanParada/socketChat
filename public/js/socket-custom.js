var socket = io();

socket.on('connect', function() {
    console.log('Connected to the server');
});

// escuchar
socket.on('disconnect', function() {

    console.log('Lost connection to the server');

});


// Enviar información
socket.emit('sendMessage', {
    user: 'Fernando',
    message: 'Hola Mundo'
}, function(resp) {
    console.log('Server response: ', resp);
});

// Escuchar información
socket.on('sendMessage', function(mensaje) {

    console.log('Server:', mensaje);

});