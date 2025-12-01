export default class DBError extends Error {
    constructor(detail) {
        super();
        this.status = 500;
        this.type = "Database Error";
        this.name = this.constructor.name;
        this.detail = detail;
    }
}