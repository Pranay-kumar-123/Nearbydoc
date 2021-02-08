const mongoose = require("mongoose");
const Appointment=require("./Appointments");
var userpschema=mongoose.Schema(
    {
      username:String,
      email:String,
      password:String,
      gender:String,
      Appointments:[{
        AppointmentId:{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
        DoctorName:String,
        date:String,
        time:String
      },],
    }
  );
module.exports=mongoose.model("patient", userpschema);