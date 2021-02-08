const mongoose = require("mongoose");
const Appointment=require("./Appointments")
var userdschema=mongoose.Schema(
    {
      username:String,
      email:String,
      password:String,
      specialist:String,
      location:String,
      hname:String,
      hadrs:String,
      time:String,
      cfee:String,
      Appointments:[{
        AppointmentId:{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }
      },],
    }
  );
module.exports=mongoose.model("doctor", userdschema);