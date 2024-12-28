const { Schema, model } = require('mongoose');

const OutgoingRouteSchema = new Schema({
  start: { type: String, required: true }
}, {
  timestamps: true 
});

const ReturnRouteSchema = new Schema({
  end: { type: String, required: true }
}, {
  timestamps: true 
});

const OutgoingRouteModel = model("OutgoingRoute", OutgoingRouteSchema);
const ReturnRouteModel = model("ReturnRoute", ReturnRouteSchema);

module.exports = { OutgoingRouteModel, ReturnRouteModel };
