const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")

//import model
const Application = require("../models/Application");

router.get("/registerbaby", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("registerbaby");
});

//installing async function
router.post("/registerbaby",  connectEnsureLogin.ensureLoggedIn(), async(req, res) => {
  try {
    const baby = new Application(req.body);
    console.log(baby);
    await Application.register(sitter,req.body.password,(err)=>{
      if(err){
        throw err
    }
    res.redirect("/registerbaby");
  })
  } catch (error) {
    res.status(400).send("error, baby not registered")
    console.log("baby not registered", error)
  }
 
});

//fetching babies from the database
router.get("/babieslist", async(req, res) => {
  try {
    let babies = await Application.find();
    res.render("babiesmanagement", {babies:babies})
  } catch (error) {
    res.status(400).send("unable to fetch babies from the database")
  }
})

router.post("/delete", async (req, res) => {
  try { //try block
    await Application.deleteOne({_id:req.body.id});
  res.redirect("back")
  } catch (error) {
    res.status(400).send("unable to delete baby from the db")
    console.log("Error deleting baby", error);
  }
  
});

 //updating sitters in the database
  router.get("/babyupdate/:id", async(req, res) =>{
    try {
      const babyupdate = await Application.findOne({_id: req.params.id})
      res.render("babyupdate", {babies:babyupdate})
    } catch (error) {
      console.log("error finding a baby", error);
      res.status(400).send("unable to find babies from the db");
    }
  })

  router.post("/babyupdate", async(req, res) => {
    try {
      await Application.findOneAndUpdate({_id: req.query.id}, req.body);
      res.redirect("/babieslist")
    } catch (error) {
      res.status(404).send("unable to update babies in the db");
    }
  })


module.exports = router;
