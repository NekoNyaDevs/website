const { Schema, model } = require('mongoose');

const ApiKeySchema = new Schema({
    key: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Number,
        required: true
    },
    /**
     * 0 = No limit (Owner only)
     * 1 = 200 requests per minute (Basic)
     * 2 = 1000 requests per minute (Premium)
     * 3 = 50000 requests per minute (Business)
     */
    type: {
        type: Number,
        required: true
    },
    isDisabled: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = model('ApiKey', ApiKeySchema);