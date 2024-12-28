const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UnitSchema = new Schema({
  workLocation: { type: String, required: true }, // محل کار
  organization: {
    id: { type: Schema.Types.ObjectId, auto: true }, 
    name: { type: String, required: true }, // نام واحد
  },
}, {
  timestamps: true, 
});


const UnitModel = mongoose.models.Unit || model("Unit", UnitSchema);

module.exports = UnitModel;
