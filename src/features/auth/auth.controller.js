const authService = require("./auth.service");

class AuthController {

    // Register User
    async register(req, res, next) {
        try {

            const result = await authService.register(req.body);

            res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Login User
    async login(req, res, next) {
        try {

            const result = await authService.login(req.body);

            res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Get Logged-in User
    async profile(req, res, next) {
        try {

            const result = await authService.getProfile(req.user.id);

            res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AuthController();