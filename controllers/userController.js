import User from '../models/User.model.js';
const listUsers = async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); 
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body); 
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const [updatedRows] = await User.update(req.body, {
            where: { id: req.params.id },
            returning: true, 
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findByPk(req.params.id);
        res.json(updatedUser);

    } catch (error) {
        res.status(400).json({ message: "Error updating user", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedCount = await User.destroy({
            where: { id: req.params.id },
        });
        
        if (deletedCount === 0) {
            console.log(`Attempted to delete user ID ${req.params.id}, not found.`);
        }
        res.status(204).end(); 
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

export default {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};