const { client } = require('pg')
const client = new client({

    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "userData"
});
client.connect();

client.query('select * from user', (err, res) => {
    if (!err) {
        console.log(res.row);
    }
    else {
        console.log(err.massage)
    }
    client.end;

})
