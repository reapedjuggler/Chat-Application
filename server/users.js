// To maintain Users
const users = [];

// To add a new user
const addUser = ({id, name, room}) => { // Destructuring the props

    // Name - reapedJuggler  Room - Temp
    // We want reapedjugglertemp

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const exist = users.find((user) => (user.room === room && user.name === name));       // finding from whole array so mapping it

    if (exist) {
        return {error: 'Username already exist :/'};
    }

    else {
        users.push({id, name, room});
    }

    const user = {id, name, room};

    return {user};

}

const removeUser = (id) => {

    const exist = users.findIndex((user) => (user.id === id));

    if (exist !== -1) {
         return users.splice(exist, 1)[0];
    }

};

const getUser = id => users.find((user) => (user.id === id));

// All users from a particular room
const getUserInRoom = room => users.filter((user) => user.room === room);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom,
}