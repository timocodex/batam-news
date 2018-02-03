module.exports = {
    "test": {
        "username": "root",
        "password": "kMF1tL1PnIMfsyAq",
        "database": "bacalah",
        "host": "35.187.218.165",
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
        "socketPath": "/cloudsql/"+"batam-news:asia-northeast1:bacalahsql"
      }
    }

  }