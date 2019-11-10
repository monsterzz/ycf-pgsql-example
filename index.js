const {Client} = require('pg');

function dbClient() {
    const {
        PGHOST: host,
        PGPORT: port,
        PGDATABASE: database,
        PGUSER: user,
        PGPASSWORD: password
    } = process.env;

    const client = new Client({
        host,
        database,
        user,
        password,
        port: parseInt(port),
        ssl: {
            sslcert: 'root.crt',
            sslmode: 'require',
        }
    });

    client.on('error', (err) => {
        console.error(`db error: ${err}`);
    });

    return client;
}

const db = dbClient();

module.exports.handler = async function (event, context) {
    if (!db._connected) {
        await db.connect();
    }

    const result = await db.query('SELECT NOW() as now');
    return {
        dbTime: result.rows[0]['now'],
    }
};
