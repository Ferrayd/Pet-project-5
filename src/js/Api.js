export class Api {
    constructor(baseUrl) {
        this.baseUrl = 'https://nomoreparties.co'
        this.headers = {
            authorization: '258a1c0c-9006-4e76-a355-08167ecd8d6c'
        }
    }

    async getUser() {
        return fetch(`${this.baseUrl}/cohort12/users/me`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(res.status)
                }
            })
    }

    /**
     * GET places
     * @returns {Promise<Response>}
     */
    async getPlaces() {
        return await fetch(`${this.baseUrl}/cohort12/cards`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(res.status)
                }
            })
    }

    async patchUser(body) {
        return await fetch(`${this.baseUrl}/cohort12/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: this.headers.authorization
            },
            body: JSON.stringify(body),
            method: 'PATCH'
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res.status)
            }
        })
    }
}
