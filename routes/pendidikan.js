
var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const ModelPendidikan = require("../model/model_pendidikan.js");

router.get("/", async function (req, res, next) {
    try {
      let rows = await ModelPendidikan.getAll();
      res.render("pendidikan/index", {
        data: rows,
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/pendidikan");
    }
  });
  

router.get("/create", function (req, res, next) {
  res.render("pendidikan/create", {
    nama_instansi: "",
    jurusan: "",
    tahun_masuk: "",
    tahun_lulus: "",
    nomor_ijazah: "",
    id_mahasiswa: "",
  });
});

router.post("/store", async function (req, res, next) {
    try {
      let { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa } = req.body;
      let data = {
        nama_instansi,
        jurusan,
        tahun_masuk,
        tahun_lulus,
        nomor_ijazah,
        id_mahasiswa,
      };
      await ModelPendidikan.store(data);
      req.flash("success", "Berhasil menyimpan data");
      res.redirect("/pendidikan");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/pendidikan");
    }
  });
  

  router.get("/edit/:id", async function (req, res, next) {
    try {
      let id = req.params.id;
      let rows = await ModelPendidikan.getById(id);
      if (rows.length === 0) {
        throw new Error("Data pendidikan tidak ditemukan");
      }
      res.render("pendidikan/edit", {
        id: rows[0].id_pendidikan,
        nama_instansi: rows[0].nama_instansi,
        jurusan: rows[0].jurusan,
        tahun_masuk: rows[0].tahun_masuk,
        tahun_lulus: rows[0].tahun_lulus,
        nomor_ijazah: rows[0].nomor_ijazah,
        id_mahasiswa: rows[0].id_mahasiswa,
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/pendidikan");
    }
  });
  

  router.post("/update/:id", async function (req, res, next) {
    try {
      let id = req.params.id;
      let { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa } = req.body;
      let data = {
        nama_instansi,
        jurusan,
        tahun_masuk,
        tahun_lulus,
        nomor_ijazah,
        id_mahasiswa,
      };
      let updateSuccess = await ModelPendidikan.update(id, data);
      if (updateSuccess) {
        req.flash("success", "Berhasil mengubah data");
      } else {
        req.flash("error", "Gagal mengubah data");
      }
      res.redirect("/pendidikan");
    } catch (err) {
      req.flash("error", "Terjadi kesalahan saat mengubah data");
      res.redirect("/pendidikan");
    }
  });
  

router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await ModelPendidikan.delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/pendidikan");
});

module.exports = router;
