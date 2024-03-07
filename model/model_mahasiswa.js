const { Store } = require("express-session");
const connection = require("../config/database");

class Model_Mahasiswa {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("select * from mahasiswa order by id_mahasiswa desc", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }



  static async Store(Data) {
    return new Promise((resolve, reject) => {
      connection.query("insert into mahasiswa set ?", Data, function (err, result) {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getId(id) {
    return new Promise((resolve, reject) => {
      connection.query("select * from mahasiswa where id_mahasiswa = " + id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Update(id, Data) {
    return new Promise((resolve, reject) => {
      connection.query("update mahasiswa set ? where id_mahasiswa = " + id, Data, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async Delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("delete from mahasiswa where id_mahasiswa =" + id, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

static async getAllNRP() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT nrp FROM mahasiswa ORDER BY id_mahasiswa DESC", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  
}

module.exports = Model_Mahasiswa;
