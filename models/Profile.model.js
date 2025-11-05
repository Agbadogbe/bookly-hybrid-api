import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    _id: { 
        type: Number,
        required: true 
    },
    preferences: {
        type: [String],
        default: []
    },
    history: {
        type: [{
            book: { type: String, required: true },
            rating: { type: Number, min: 1, max: 5 },
            comment: String
        }],
        default: []
    },
}, { 
    id: false, 
    timestamps: false,
});
const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;