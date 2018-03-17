module.exports = {
    "test": {
        "username": "x",
        "password": "x",
        "database": "x",
        "host": "x",
        "dialect": "mysql" 
    },
    "development": {
      "username": "root",
      "password": null,
      "database": "BatamNews",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.MY_USER,
      "password": process.env.MY_PASS,
      "database": process.env.MY_DBN,
      "host": process.env.MY_HOST,
      "dialect": "mysql",
      "dialectOptions": {
        "socketPath": "/cloudsql/"+"inbound-hawk-157511:us-central1:bacalahdb"
      }
    }

  }