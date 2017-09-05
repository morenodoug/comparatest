// This class is used for logins
class Login {
    constructor(hash) {
        this.users = [];
        this.sessions = [];

        this.users = Object.keys(hash).map((user) => ({ user, password: hash[user] }));
    }

    logout(user) {
        this.sessions.forEach((session, i) => {
            if (session === user) {
                this.sessions[i] = null;
            }
        });
        this.sessions = this.sessions.filter(session => session !== null);
    }

    // Checks if user exists
    userExists(user) {

        for (let i of this.users) {
            if (i.user === user)
                return true;
        }
        return false;

    }

    // Register user
    registerUser(user, password) {
        if (!this.userExists(user)) {
            this.users.push({ user, password });
        }

    }

    removeUser(user) {
        let index = this.idx(user, this.users);
        this.users[index] = null;
        this.passwords[index] = null;
        this.users = this.users.filter(user => user !== null);
        this.passwords = this.passwords.filter(password => password !== null);
    }

    checkPassword(user, password) {
        let index = this.idx(user, this.users);
        let passwordCorrect = this.passwords[index] === password;
        return passwordCorrect;
    }

    updatePassword(user, oldPassword, newPassword) {
        // First we check if the user exists
        let user1 = '';
        for (let i of this.users) {
            if (i === user) {
                user1 = user;
            }
        }
        if (user1 === user) {
            let index = this.idx(user, this.users);
            if (this.passwords[index] === oldPassword) {
                this.passwords[index] = newPassword;
                return true;
            }
        }
        return false;
    }

    login(user, password) {
        let index = this.idx(user, this.users);
        if (this.passwords[index] === password) {
            this.sessions.push(user);
        }
    }

    // Gets index of an element in an array
    idx(element, array) {
        let cont = 0;
        for (let i of array) {
            if (i === element) {
                return cont;
            }
            cont += 1;
        }
        return cont;
    }
}

let registeredUsers = {
    user1: 'pass1',
    user2: 'pass2',
    user3: 'pass3'
};

let login = new Login(registeredUsers);

login.registerUser('user4', 'pass4');
login.login('user4', 'pass4');
login.updatePassword('user3', 'pass3', 'pass5');
login.login('user3', 'pass5');
login.logout('user4');
login.logout('user3');