

import Profile from '../models/Profile.model.js';

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.userId); 
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};


const createProfile = async (req, res) => {
    const { preferences, history } = req.body;
    
    try {
        const profile = new Profile({
            _id: req.params.userId, 
            preferences,
            history
        });

        await profile.save(); 
        res.status(201).json(profile);
    } catch (error) {

        if (error.code === 11000) {
             return res.status(409).json({ message: "Profile already exists for this user ID" });
        }
        res.status(400).json({ message: "Error creating profile", error: error.message });
    }
};

const updateProfile = async (req, res) => {
    const { preferences, history } = req.body;
    
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.userId,
            { preferences, history },
            { new: true, runValidators: true }
        );
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(400).json({ message: "Error updating profile", error: error.message });
    }
};


const deleteProfile = async (req, res) => {
    try {
        await Profile.findByIdAndDelete(req.params.userId); 
        
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Error deleting profile", error: error.message });
    }
};

export default {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
};