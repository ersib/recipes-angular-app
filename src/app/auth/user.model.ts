export class User {
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {

    }

    // EB: It can be accessed in this way: user.token
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

}