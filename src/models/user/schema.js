import mongoose from 'mongoose';


let UserSchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  name: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
},{
    versionKey: false
});

UserSchema.set('toJSON', { getters: true });
let User = mongoose.model('User', UserSchema);

module.exports = User;