const { Store } = require("express-session");
const connection = require("../config/database");

class ModelPendidikan {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT pendidikan.*, mahasiswa.nrp FROM pendidikan INNER JOIN mahasiswa ON pendidikan.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY pendidikan.id_pendidikan DESC", (err, rows) => {
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
      connection.query("INSERT INTO pendidikan SET ?", data, function (err, result) {
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
      connection.query("SELECT * FROM pendidikan WHERE id_pendidikan = ?", id, (err, rows) => {
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
      connection.query("UPDATE pendidikan SET ? WHERE id_pendidikan = ?", [data, id], function (err, result) {
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
      connection.query("DELETE FROM pendidikan WHERE id_pendidikan = ?", id, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = ModelPendidikan;
