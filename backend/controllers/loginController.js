const signupModel = require('../Model/loginModel');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await signupModel.findOne({ email: email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid);
            if (isPasswordValid) {
                return res.status(200).json({ message: 'Login successful', user });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);

        // Check if the user already exists
        const existingUser = await signupModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new signupModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save user to the database
        const user = await newUser.save();
        res.status(201).json({ user })

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { login, signup };