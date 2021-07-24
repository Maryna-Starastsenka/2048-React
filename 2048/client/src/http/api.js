class Api {
    baseUrl = '';

    constructor() {
        this.baseUrl = baseUrl;
    }

    createNewUser(username, password, isAdmin) {
        return fetch(this.baseUrl + 'users/register', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({ username, password, isAdmin})
        });
    }
}




