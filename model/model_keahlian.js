const { Store } = require("express-session");
const connection = require("../config/database");

class ModelKeahlian {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT keahlian.*, mahasiswa.nrp FROM keahlian INNER JOIN mahasiswa ON keahlian.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY keahlian.id_keahlian DESC", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async store(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO keahlian SET ?", data, function (err, result) {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM keahlian WHERE id_keahlian = ?", id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE keahlian SET ? WHERE id_keahlian = ?", [data, id], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM keahlian WHERE id_keahlian = ?", id, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = ModelKeahlian;
