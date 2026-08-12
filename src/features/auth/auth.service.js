const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRepository = require("./auth.repository");

class AuthService {

    // Register User
    async register(userData) {

        const { name, email, password, role } = userData;

        // Check if email already exists
        const existingUser = await authRepository.findUserByEmail(email);

        if (existingUser) {
            throw new Error("Email already exists");
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save User
        const user = await authRepository.createUser({
            name,
            email,
            password: hashedPassword,
            role
        });

        return {
            success: true,
            message: "User created successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    // Login User
    async login(loginData) {

        const { email, password } = loginData;

        // Find User
        const user = await authRepository.findUserByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Check Active Status
        if (!user.isActive) {
            throw new Error("User account is inactive");
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return {
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    // Get Logged-in User
    async getProfile(userId) {

        const user = await authRepository.findUserById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return {
            success: true,
            data: user
        };
    }

}

module.exports = new AuthService();