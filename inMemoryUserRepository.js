const registeredUsers = [
    { email: 'utilisateur1@example.com', password: 'password1' },
    { email: 'utilisateur2@example.com', password: 'password2' },
    { email: 'utilisateur3@example.com', password: 'password3' }
];

const getRegisteredUsers = () => {
    return registeredUsers;
};

module.exports = {getRegisteredUsers};
