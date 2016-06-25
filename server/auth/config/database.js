
module.exports.database = {
  prod: {
    uri: process.env.DATABASE_URL,
    dialect: process.env.DB_DIALECT,
    protocol: process.env.DB_PROTOCOL,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  dev: {
    uri: process.env.DATABASE_URL,
    dialect: process.env.DB_DIALECT,
    protocol: process.env.DB_PROTOCOL,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  test: {
    uri: process.env.TEST_DATABASE_URL,
    dialect: process.env.TEST_DB_DIALECT,
    protocol: process.env.TEST_DB_PROTOCOL,
    database: process.env.TEST_DB_NAME,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    port: process.env.TEST_DB_PORT
  }
}
