const { io } = require('../server');


io.on('connection', (client) => {

    console.log('User Connected');

    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Welcome to the app'
    });



    client.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Escuchar el cliente
    client.on('sendMessage', (data, callback) => {

        console.log(data);

        client.broadcast.emit('sendMessage', data);


        // if (mensaje.user) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });

});