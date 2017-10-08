import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true}
}, {
    versionKey: false
});

UserSchema.set('toJSON', {getters: true});
let User = mongoose.model('User', UserSchema);

export default User;