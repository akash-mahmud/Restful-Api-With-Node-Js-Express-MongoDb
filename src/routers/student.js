const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

router.post("/students", async(req, res) => {


  try{

    const user = new Student(req.body);
    const createUser = await  user.save()
   
    res.status(201).send(createUser);
  }
  
  catch(e){
    
    res.status(400).send(e);
    
  
  }
})

router.get("/students" , async(req , res) => {

  try{

   const studentData = await Student.find();
   res.send(studentData)

  }

  catch(e){

    res.send(e)

  }
})


// Get the indeviusual data using id

router.get("/students/:id", async( req, res) => {

  try{
     const _id = req.params.id;

   const individualStudentData = await Student.findById(_id);

   if(!individualStudentData){
     return res.status(404).send();
   }else{
    res.send(individualStudentData);
   }
  

  }
   
  catch(e){

    res.status(500).send(e)
  }
})

// Delete the student bt its id

router.delete("/students/:id", async(req, res) =>{

  try{

      const deleteStudent  = await Student.findByIdAndDelete(req.params.id);
      if(!req.params.id){
        return res.status(400).send()
      }

        res.send(deleteStudent);

      

  } catch(e){

    res.status(500).send(e);
  }

})

// Update the student bt its id


router.patch("/students/:id" , async(req,res) => {

  try{

    const _id = req.params.id;
          const updateStudents =  await Student.findByIdAndUpdate(_id , req.body,{
            new: true
          });

          res.send(updateStudents);
  }catch(e){

    res.status(404).send(e);

  }
})

module.exports = router;
