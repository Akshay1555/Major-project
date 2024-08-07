const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminRecordsSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(v);
            },
            message: props => 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
        },
    },
    role: { type: String, default: "admin" }
}, {
    timestamps: true
});

adminRecordsSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('AdminRecords', adminRecordsSchema);
