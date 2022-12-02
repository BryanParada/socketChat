

class Users {

    constructor(){
        this.persons = [];
    }

    addPerson(id, name, room){

         let person = {id, name, room};

         this.persons.push(person);

         return this.persons;
    }

    getPerson( id ){
        //OPCION 1
        // let person = this.persons.filter( pers =>{
        //     return person.id === id
        // })[0];
          
        //OPCION 2
        let person = this.persons.filter( person => person.id === id)[0]; //filter regresa un arreglo, por eso siempre necesito la primera posicion
       
        return person;
    }

    getPersons(){
        return this.persons
    }

    getPersonsByRoom( room ){
        //...
    }

    deletePerson(id){

        let deletedPerson = this.getPerson(id);

        //OPCION 1
        // this.persons = this.persons.filter( pers =>{
        //     return person.id != id
        // });

        //OPCION 2 
        this.persons = this.persons.filter( person => person.id != id); 
        return deletedPerson;
    }

    

}


module.exports = { Users }

