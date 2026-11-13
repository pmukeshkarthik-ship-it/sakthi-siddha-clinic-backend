import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import Admin from "../models/Admin.js";
import { requireAdmin } from "../middleware/auth.js";
const router = Router();
router.post("/login", async (req,res,next) => {
  try {
    const parsed = z.object({email:z.string().email().max(254),password:z.string().min(1).max(200)}).safeParse(req.body);
    if (!parsed.success) return res.status(400).json({message:"Enter a valid email and password."});
    const admin = await Admin.findOne({email:parsed.data.email.toLowerCase()}).select("+passwordHash");
    if (!admin || !(await bcrypt.compare(parsed.data.password,admin.passwordHash))) return res.status(401).json({message:"Invalid login details."});
    const token = jwt.sign({sub:admin._id.toString(),role:"admin"},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN || "8h"});
    res.json({token,admin:{id:admin._id,name:admin.name,email:admin.email}});
  } catch(error) { next(error); }
});
router.get("/me",requireAdmin,(req,res)=>res.json({admin:{id:req.admin._id,name:req.admin.name,email:req.admin.email}}));
export default router;
