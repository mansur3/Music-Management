const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const newToken = (user) => {
    return jwt.sign({user}, "secret");
}

router.post("/register", async (req, res) => {
    try {

        let u = await User.findOne({email : req.body.email});
        if(u) return res.status(400).send({status : "failed", message : "Email already exist, Try with anotehr email"})

        let user = await User.create(req.body);

        let token = newToken(user);

        return res.status(201).send({ token,  user})




    } catch (err) {
        return res.status(400).send(err);
    }
   


})



router.post("/login", async (req, res) => {
    try {

        let user = await User.findOne({email : req.body.email});
        if(!user) return res.status(400).send({status : "failed", message : "Please your email id"});

        let match = user.checkPassword(req.body.password);
        if(!match) return res.status(400).send({status : "failed", message : "Please enter the valid password"})

        let token = newToken(user);

        return res.status(201).send({token, user})

    } catch(err) {
        return res.status(400).send({err})
    }
})



router.get("/update/:id/:album", async (req, res) => {
    // let album = await User.findByIdAndUpdate()
    let user = await User.findOne({_id : req.params.id});
    user.album.push(req.params.album);
    user.save();
    let token = newToken(user);
    return res.status(201).send({token, user})
})

router.get("/user/:id", async (req, res) => {
    let user = await User.findOne({_id : req.params.id});
    let token = newToken(user);
    return res.status(200).send({token, user})
})





module.exports = router;