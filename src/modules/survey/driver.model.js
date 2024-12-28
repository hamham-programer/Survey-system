const { Schema, model } = require('mongoose');

const DriverSchema = new Schema({
  name: { type: String, required: true , unique: true}
}, {
  timestamps: true 
});

const DriverModel = model("Driver", DriverSchema);

module.exports = DriverModel;
