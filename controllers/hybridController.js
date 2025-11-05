import User from '../models/User.model.js';   
import Profile from '../models/Profile.model.js';

const getUserFull = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: `Utilisateur SQL non trouvé pour l'ID: ${userId}` });
        }
        
        const profile = await Profile.findById(userId);
        const hybridData = {
            user: user, 
            profile: profile || null
        };
        res.json(hybridData);
    } catch (error) {
        console.error('Erreur lors de la récupération des données hybrides:', error);
        res.status(500).json({ 
            message: 'Erreur serveur lors de la requête hybride.', 
            error: error.message 
        });
    }
};

const updateUserFull = async (req, res) => {

    const userId = req.params.id;
    const sqlData = {};
    if (req.body.name) sqlData.name = req.body.name;
    if (req.body.email) sqlData.email = req.body.email;

    const mongoData = {};
    if (req.body.preferences) mongoData.preferences = req.body.preferences;
    if (req.body.history) mongoData.history = req.body.history;

    try {
        let updatedUser = null;
        if (Object.keys(sqlData).length > 0) {
            const [updatedRows] = await User.update(sqlData, {
                where: { id: userId },
                returning: true,
            });
            if (updatedRows === 0) {
                return res.status(404).json({ message: `Utilisateur SQL non trouvé pour l'ID: ${userId}` });
            }
            updatedUser = await User.findByPk(userId);
        } else {
            updatedUser = await User.findByPk(userId);
            if (!updatedUser) {
                 return res.status(404).json({ message: `Utilisateur SQL non trouvé pour l'ID: ${userId}` });
            }
        }
        
        let updatedProfile = null;
        if (Object.keys(mongoData).length > 0) {
             updatedProfile = await Profile.findByIdAndUpdate(
                userId,
                mongoData,
                { new: true, upsert: true }
            );
        } else {
            updatedProfile = await Profile.findById(userId);
        }
        const hybridData = {
            user: updatedUser,
            profile: updatedProfile || null
        };
        res.json(hybridData);
    } catch (error) {
        console.error('Erreur lors de la mise à jour des données hybrides:', error);
        res.status(500).json({ 
            message: 'Erreur serveur lors de la mise à jour hybride.', 
            error: error.message 
        });
    }
};

const deleteUserFull = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedRows = await User.destroy({
            where: { id: userId }
        });

        if (deletedRows === 0) {
        
            return res.status(404).json({ message: `Utilisateur SQL non trouvé pour l'ID: ${userId}` });
        }
        await Profile.findByIdAndDelete(userId);
        res.status(204).end();
    } catch (error) {
        console.error('Erreur lors de la suppression des données hybrides:', error);
        res.status(500).json({ 
            message: 'Erreur serveur lors de la suppression hybride.', 
            error: error.message 
        });
    }
};

export default {
    getUserFull,
    updateUserFull,
    deleteUserFull
};