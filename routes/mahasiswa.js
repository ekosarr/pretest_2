var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const ModelMahasiswa = require("../model/model_mahasiswa.js");

router.get("/", async function (req, res, next) {
  let rows = await ModelMahasiswa.getAll();
  res.render("mahasiswa/index", {
    data: rows,
  });
});

router.get("/create", function (req, res, next) {
  res.render("mahasiswa/create", {
    nrp: "",
    nama_depan: "",
    nama_belakang: "",
    jenis_kelamin: "",
    agama: "",
    umur: "",
    tinggi_badan: "",
    gol_darah: "",
    alamat: "",
    hobi: "",
    email: "",
    no_telepon: ""
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telepon } = req.body;
    let data = {
      nrp,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      agama,
      umur,
      tinggi_badan,
      gol_darah,
      alamat,
      hobi,
      email,
      no_telepon
    };
    await ModelMahasiswa.Store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/mahasiswa");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/mahasiswa");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await ModelMahasiswa.getId(id);
    if (rows.length === 0) {
      throw new Error("Data mahasiswa tidak ditemukan");
    }
    res.render("mahasiswa/edit", {
      id: rows[0].id_mahasiswa,
      nrp: rows[0].nrp,
      nama_depan: rows[0].nama_depan,
      nama_belakang: rows[0].nama_belakang,
      jenis_kelamin: rows[0].jenis_kelamin,
      agama: rows[0].agama,
      umur: rows[0].umur,
      tinggi_badan: rows[0].tinggi_badan,
      gol_darah: rows[0].gol_darah,
      alamat: rows[0].alamat,
      hobi: rows[0].hobi,
      email: rows[0].email,
      no_telepon: rows[0].no_telepon
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/mahasiswa");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telepon } = req.body;
    let data = {
      nrp,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      agama,
      umur,
      tinggi_badan,
      gol_darah,
      alamat,
      hobi,
      email,
      no_telepon
    };
    let updateSuccess = await ModelMahasiswa.Update(id, data);
    if (updateSuccess) {
      req.flash("success", "Berhasil mengubah data");
    } else {
      req.flash("error", "Gagal mengubah data");
    }
    res.redirect("/mahasiswa");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat mengubah data");
    res.redirect("/mahasiswa");
  }
});


router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await ModelMahasiswa.Delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/mahasiswa");
});




module.exports = router;
