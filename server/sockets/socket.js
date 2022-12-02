const { io } = require('../server');
const {Users} = require('../classes/user')
const { createMessage } = require('../utilities/utilities')
const users = new Users();



io.on('connection', (client) => {

 
    client.on('enterChat', (data, callback) => {

        if (!data.name){
            return callback({
                error: true,
                message: 'Name is required'
            })
        }

        let persons = users.addPerson( client.id, data.name );

        client.broadcast.emit('listPerson', users.getPersons() );

        callback(persons); // {persons}  - E.callback is not a function
        
    });

    client.on('createMessage', (data) => {

        let person = users.getPerson(client.id);
        
        let message = createMessage( person.name, data.message);
        client.broadcast.emit( 'createMessage', message);
    })

    client.on('disconnect', () => { 
        let deletedPerson = users.deletePerson( client.id );
        client.broadcast.emit('createMessage', createMessage('Admin', `${ deletedPerson.name} left the chat`));
        client.broadcast.emit('listPerson', users.getPersons() );
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