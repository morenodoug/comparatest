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
        for (let a = 0; a < this.users.length; a++) {
            if (user === this.users[a].user) {
                this.logout(user);
                this.users.forEach((userForEach, i) => {
                    if (userForEach.user === user) {
                        this.users[i] = null;
                    }

                });

            }
        }
        this.users = this.users.filter(user => user !== null);

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

        if (this.idx(user, this.sessions) < 0) {

            for (let a = 0; a < this.users.length; a++) {
                if (this.users[a].user === user && this.users[a].password === password) {
                    this.sessions.push(user);
                    break;
                }
            }

        }

    }


    // Gets index of an element in an array
    //return -1 si el elemento no se encuentra en el array
    idx(element, array) {
        let cont = 0;
        for (let i of array) {
            if (i === element) {
                return cont;
            }
            cont += 1;
        }
        return -1;
    }
}

let registeredUsers = {
    user1: 'pass1',
    user2: 'pass2',
    user3: 'pass3'
};

let login = new Login(registeredUsers);
// console.log(login.users);
login.registerUser('user4', 'pass4');
login.registerUser('user4', 'pass4');

login.login('user4', 'pass4');
login.login('user4', 'pass4');
login.login('user1', 'pass1');
login.login('user2', 'pass2');

login.login('user3', 'pass3');
console.log(login.sessions);
console.log('-----------------------------------------sessions');
login.logout('user2');
login.removeUser('user4');
console.log(login.sessions);
console.log('-----------------------------------------  users');
console.log(login.users);