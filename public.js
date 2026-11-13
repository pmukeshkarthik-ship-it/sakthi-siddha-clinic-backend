import { Router } from "express";
import Doctor from "../models/Doctor.js";
import Treatment from "../models/Treatment.js";
import { clinicHours } from "../utils/clinicSchedule.js";
const router=Router();
router.get("/clinic",(_req,res)=>res.json({
  name:"Sakthi Siddha Maruthuvam & Vethasatthi Varma Sikichalayam",
  doctor:"Dr. T. Porselvi",qualifications:["M.D. (Siddha)","M.Sc. (Yoga)"],
  phone:"9443869373",
  address:"No. 2/93, Ponniyamman Koil Street, Periya Mathur, Near Mathur Gate, Chennai - 600 068",
  appointmentPolicy:"Consultation by appointment only.",hours:clinicHours
}));
router.get("/doctor",async(_req,res,next)=>{try{res.json({doctors:await Doctor.find({isPublished:true}).select("-__v").lean()});}catch(e){next(e);}});
router.get("/treatments",async(_req,res,next)=>{try{res.json({treatments:await Treatment.find({isPublished:true}).select("-__v").lean()});}catch(e){next(e);}});
export default router;
