class Api {
    baseUrl = "";

    constructor() {
        this.baseUrl = baseUrl;
    }

    async createNewUser(username, password, isAdmin) {
        const response = await fetch(this.baseUrl + "users/register", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ username, password, isAdmin }),
        });
        return await response.json();
    }

    async loginUser(username, password) {
        const response = await fetch(this.baseUrl + "users/login", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ username, password }),
        });
        return await response.json();
    }
}
