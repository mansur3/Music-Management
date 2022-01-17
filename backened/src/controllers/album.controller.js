const express = require("express");
const router = express.Router();

const Album = require("../models/album.model")




router.post("/", async (req, res) => {
    const album = await Album.create(req.body);

    return res.status(201).send({album});
})



router.get("/pagination", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;

    const album = await Album.find().skip(offset).limit(size).lean().exec();
    const totalAlbum = await Album.find().countDocuments().lean().exec();

    let totalPage = Math.ceil(totalAlbum/size);


    return res.status(200).send({album, totalPage})
})
router.get("/", async (req, res) => {
    const album = await Album.find().lean().exec();
    return res.status(200).send({album});
})

router.get("/:name", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;
    const album = await Album.find({name: req.params.name}).skip(offset).limit(size).lean().exec();
    const totalAlbum = await Album.find({name : req.params.name}).countDocuments().lean().exec();

    let totalPage = Math.ceil(totalAlbum/size);
    return res.status(200).send({album, totalPage});
})

router.get("/:id", async (req, res) => {
    const album = await Album.findById(req.params.id).lean().exec();
    console.log(album);

    return res.status(200).send({album})
})

router.get("/find/:genre", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;
    const album = await Album.find({genre : req.params.genre}).skip(offset).limit(size).lean().exec();
    const totalAlbum = await Album.find({genre : req.params.genre}).countDocuments().lean().exec();
    let totalPage = Math.ceil(totalAlbum/size);


    return res.status(200).send({album, totalPage})
})
router.get("/asc/data/find", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;
    if(req.query.gen == "all") {
        const album = await Album.find().sort({year : 1}).skip(offset).limit(size).lean().exec();
        const totalAlbum = await Album.find().countDocuments().lean().exec();
        let totalPage = Math.ceil(totalAlbum/size);
        return res.status(200).send({album, totalPage})
    } else {
        const album = await Album.find({genre : req.query.gen}).sort({year : 1}).skip(offset).limit(size).lean().exec();
    const totalAlbum = await Album.find({genre : req.query.gen}).countDocuments().lean().exec();
    let totalPage = Math.ceil(totalAlbum/size);
    return res.status(200).send({album, totalPage})
    }
    
})

router.get("/desc/data/find", async (req, res) => {
    let size = +req.query.size;
    let page = +req.query.page;
    let offset = (page - 1) * size;
    // let genre = req.query.gen;
    if(req.query.gen == "all") {
        const album = await Album.find().sort({year : -1}).skip(offset).limit(size).lean().exec();
    const totalAlbum = await Album.find().countDocuments().lean().exec();
    let totalPage = Math.ceil(totalAlbum/size);
    return res.status(200).send({album, totalPage})
    } else {
    const album = await Album.find({genre : req.query.gen}).sort({year : -1}).skip(offset).limit(size).lean().exec();
    const totalAlbum = await Album.find({genre : req.query.gen}).countDocuments().lean().exec();
    let totalPage = Math.ceil(totalAlbum/size);
    return res.status(200).send({album, totalPage})
    }
})








module.exports = router;