const express = require ("express");
const router = express.Router();
const passport = require("passport");

//import model
const Register = require("../models/Register")

router.get("/register", (req, res) =>{
    res.render("adminregistration");
});

router.post("/register", async(req, res) => {
    try {
        const adminRegister = new Register(req.body);
        console.log(adminRegister)
        await Register.register(adminRegister,req.body.password,(err)=>{
            if(err){
                throw err
            }
            res.redirect("/register")
        })
    } catch (error) {
        res.status(400).send("user not registered")
        console.log(error)
    }
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", passport.authenticate("local",{failureRedirect: "/login"}), (req, res)=> {
    req.session.user = req.user
    console.log(req.body)
    if(req.user.role === "admin"){
        res.redirect("/admindash")
    }
    else if (req.user.role === "sitter"){
        res.redirect("/sitterdash")
    }
    else {res.send("you dont have a role in the system")}
 })

 router.get("/logout", (req, res) => {
    if(req.session){
        req.session.destroy((error) => {
            if(error){
                console.log("-----------------------", error)
                return res.status(500).send("error logging out")
            }
            res.redirect("/")
        })
    }
 })

 router.get("/", (req, res) =>{
    res.render("index")
 })

 router.get("/admindash", (req, res) =>{
    res.render("admindashboard")
 })

 router.get("/sitterdash", (req, res) =>{
    res.render("sittersdashboard")
 })

 router.get("/sittersmanagement", (req, res) =>{
    res.render("sittersmanagement")
 })

module.exports = router;