export default class HTTPError extends Error {
    constructor(status, message,data={}) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = this.constructor.name;
    }
}