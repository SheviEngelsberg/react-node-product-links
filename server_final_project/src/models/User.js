const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]+ [a-zA-Z]+$/.test(v);
            },
            message: props => `${props.value} is not a valid full name! Must include first and last name separated by space.`
        }
    },
    password: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password! Must include at least one digit, one lowercase, one uppercase letter, and one special character.`
        }
    },
    type: { 
        type: String, 
        enum: [ 'user','shopManager', 'siteAdmin'], 
        required: true 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
