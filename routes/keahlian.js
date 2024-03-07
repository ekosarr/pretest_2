var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const ModelKeahlian = require("../model/model_keahlian.js");

router.get("/", async function (req, res, next) {
  let rows = await ModelKeahlian.getAll();
  res.render("keahlian/index", {
    data: rows,
  });
});

router.get("/create", function (req, res, next) {
  res.render("keahlian/create", {
    nama_keahlian: "",
    tingkat_keahlian: "",
    id_mahasiswa: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
    let data = {
      nama_keahlian,
      tingkat_keahlian,
      id_mahasiswa,
    };
    await ModelKeahlian.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/keahlian"); 
  } catch (error) {
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/keahlian");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await ModelKeahlian.getById(id);
    if (rows.length === 0) {
      throw new Error("Data keahlian tidak ditemukan");
    }
    res.render("keahlian/edit", {
      id: rows[0].id_keahlian,
      nama_keahlian: rows[0].nama_keahlian,
      tingkat_keahlian: rows[0].tingkat_keahlian,
      id_mahasiswa: rows[0].id_mahasiswa,
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/keahlian"); 
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
    let data = {
      nama_keahlian,
      tingkat_keahlian,
      id_mahasiswa,
    };
    let updateSuccess = await ModelKeahlian.update(id, data);
    if (updateSuccess) {
      req.flash("success", "Berhasil mengubah data");
    } else {
      req.flash("error", "Gagal mengubah data");
    }
    res.redirect("/keahlian"); 
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat mengubah data");
    res.redirect("/keahlian"); 
  }
});

router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await ModelKeahlian.delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/keahlian");
});

module.exports = router;
