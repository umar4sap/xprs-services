module.exports = {
    rethinkdb: {
        host: process.env.DB_HOST ||"localhost", // for docker 
        port: process.env.DB_PORT || 28015,
        authKey: "",
        db: "dev_xprs_carriers",
    },
    tables: [
        {
            table: "carrier",
            id:"carrierId"
        }
    ]
}
