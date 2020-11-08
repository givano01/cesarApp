const pg = require("pg");

class StorageHandler {

    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    async retrieveSecret(secretId) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT message from "Secrets" where id=$1', [secretId]);
            results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            results = err;
        }

        return results;
    }

    async saveSecret(secretMessage) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."Secrets"("message") VALUES($1) RETURNING "id"', [secretMessage]);
            results = results.rows[0].id
            client.end();
        } catch (err) {
            client.end();
            results = err;
        }

        return results;
    }
}

module.exports = StorageHandler