const { io } = require('../server');
const {Users} = require('../classes/user')
const { createMessage } = require('../utilities/utilities')
const users = new Users();



io.on('connection', (client) => {

 
    client.on('enterChat', (data, callback) => {

        //console.log(data);
        
        if (!data.name || !data.room){
            return callback({
                error: true,
                message: 'Name and Room is required'
            })
        }

        client.join(data.room);

        users.addPerson( client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('listPerson', users.getPersonsByRoom(data.room) );
        client.broadcast.to(data.room).emit('createMessage', createMessage('Admin', `${ data.name} has joined the chat`));

        callback(users.getPersonsByRoom(data.room)); // {persons}  - E.callback is not a function
        
    });

    client.on('createMessage', (data, callback) => {

        let person = users.getPerson(client.id);
        
        let message = createMessage( person.name, data.message);
        client.broadcast.to(person.room).emit( 'createMessage', message);

        callback(message);
    })

    client.on('disconnect', () => { 
        let deletedPerson = users.deletePerson( client.id );
        client.broadcast.to(deletedPerson.room).emit('createMessage', createMessage('Admin', `${ deletedPerson.name} left the chat`));
        client.broadcast.to(deletedPerson.room).emit('listPerson', users.getPersonsByRoom( deletedPerson.room ) );
    })

    //MENSAJES PRIVADOS SERVER
    client.on('privateMessage', data =>{

        let person = users.getPerson(client.id);

        //mandar msje a todas las personas conectadas
        //client.broadcast.emit('privateMessage', createMessage( person.name, data.message))

        //mandar msje a alguien
        client.broadcast.to(data.toUser).emit('privateMessage', createMessage( person.name, data.message))

    })



});