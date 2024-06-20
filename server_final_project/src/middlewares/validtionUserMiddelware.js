const User = require('../models/User');
const bcrypt = require('bcrypt');

// פונקציה לבדיקת שם מלא
function validName(name) {
    const nameParts = name.trim().split(' ');
    return nameParts.length >= 2 && nameParts.every(part => /^[A-Za-z]+$/.test(part));
}

// פונקציה לבדיקת סיסמה
function validPassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
}

// המידלוואר עצמו
const validUser = async (req, res, next) => {
    try {
        const user = req.body;

        // בדיקת שם המשתמש
        if (!validName(user.name)) {
            return res.status(400).json({ message: `${user.name} is not a valid full name! Must include first and last name separated by space` });
        }
        const valid = validPassword(user.password);
        // בדיקת הסיסמה
        if (!valid) {
            return res.status(400).json({ message: `${user.password} is not a valid password! Must include at least one digit, one lowercase, one uppercase letter, and one special character` });
        }

        next(); // לקרוא למידלוואר או לסנג'ין הבא בשורת התקן או לטפל בשגיאה
    } catch (err) {
        next(err); // להעביר שגיאה למידלוואר לטיפול
    }
};

const notExistUser = async (req, res, next) => {
    try {
        const user = req.body;
        const usersWithSameName = await User.find({ name: user.name });
        if (usersWithSameName && usersWithSameName.length > 0) {
            for (const userWithSameName of usersWithSameName) {
                const isMatch = await bcrypt.compare(user.password, userWithSameName.password);
                if (isMatch) {
                    return res.status(400).json({ message: 'The user already exists' });
                }
            }
        }
        next(); // Call the next middleware or route handler
    } catch (err) {
        next(err); // Pass error to error handling middleware
    }
};


const existUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;

        // Find users in the database with the same name
        const usersWithSameName = await User.find({ name });

        // If no users found with the given name
        if (!usersWithSameName || usersWithSameName.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        let foundUser = null;

        // Loop through each user with the same name and compare passwords
        for (const user of usersWithSameName) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                foundUser = user; // Set foundUser to the user object
                break; // Exit loop if password matches for any user
            }
        }

        // If no password matches
        if (!foundUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Add foundUser to request object
        req.foundUser = foundUser;

        // If user exists and password matches, continue to the next middleware
        next();
    } catch (err) {
        // Handle errors
        next(err);
    }
};


module.exports = {
    validUser,
    existUser,
    notExistUser
};
