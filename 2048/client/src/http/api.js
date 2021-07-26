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

    async getGeneralBestScore() {
        const response = await fetch(this.baseUrl + `score/general-best-score`, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            },
        });
        return await response.json();
    }

    async getUserBestScore(userId) {
        const response = await fetch(this.baseUrl + `score?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            },
        });
        return await response.json();
    }

    async getAdminDashBoardTable() {
        const response = await fetch(this.baseUrl + 'admin-dashboard/table', {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            },
        });
        return await response.json();
    }

    async getUserCount() {
        const response = await fetch(this.baseUrl + `admin-dashboard/user-count`, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
            },
        });
        return await response.json();
    }
}
