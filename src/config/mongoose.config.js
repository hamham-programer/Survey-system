const { default: mongoose } = require("mongoose");
mongoose.set('strictPopulate', false);
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("coonected to DB");
    
}).catch(err=>{
    console.log(err?.message ?? "Faild connection DB" );
    
})