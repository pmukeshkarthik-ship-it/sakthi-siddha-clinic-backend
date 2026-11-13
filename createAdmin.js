import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import {connectDB} from "../src/config/db.js";
import Admin from "../src/models/Admin.js";
await connectDB();
const {ADMIN_NAME,ADMIN_EMAIL,ADMIN_PASSWORD}=process.env;
if(!ADMIN_NAME||!ADMIN_EMAIL||!ADMIN_PASSWORD||ADMIN_PASSWORD.length<12){console.error("Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters) in .env.");process.exit(1);}
const email=ADMIN_EMAIL.toLowerCase();
if(await Admin.findOne({email})){console.error("Admin already exists; no changes made.");process.exit(1);}
const passwordHash=await bcrypt.hash(ADMIN_PASSWORD,12);
await Admin.create({name:ADMIN_NAME,email,passwordHash,role:"admin"});
console.log(`Administrator created: ${email}`);
await mongoose.disconnect();
