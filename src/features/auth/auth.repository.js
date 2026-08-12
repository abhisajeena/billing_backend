const User = require("./auth.model");

class AuthRepository {

    // Create New User
    async createUser(userData) {
        return await User.create(userData);
    }

    // Find User By Email (Include Password)
    async findUserByEmail(email) {
        return await User.findOne({ email }).select("+password");
    }

    // Find User By ID
    async findUserById(userId) {
        return await User.findById(userId);
    }

    // Update User
    async updateUser(userId, data) {
        return await User.findByIdAndUpdate(
            userId,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    // Delete User
    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }

    // Get All Users
    async getAllUsers() {
        return await User.find();
    }
}

module.exports = new AuthRepository();