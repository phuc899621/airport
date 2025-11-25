export default class DBError extends Error {
    constructor(error) {
        super("Database Error");
        this.status = 500;
        this.data = {};
        this.name = this.constructor.name;
        this.error = error;
    }
}