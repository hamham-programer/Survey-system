const { Schema, model } = require("mongoose");
const AllowedNumberSchema = new Schema({
  phoneNumber: {type: String,required: true,unique: true, match: /^[0-9]{11}$/},
},{
    timestamps:true
});
const AllowedNumber = model("AllowedNumber", AllowedNumberSchema);
module.exports = AllowedNumber;