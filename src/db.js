const mongoose = require('mongoose').default;
const APIKey = require('./models/apikey');

class Database {
    constructor(logger) {
        this.connect();
        this.logger = logger;

        mongoose.connection.on('connected', () => {
            this.logger.info('Connected to MongoDB.', 'Database');
        });
        mongoose.connection.on('disconnected', () => {
            this.logger.warn('Disconnected from MongoDB.', 'Database');
        });
    };

    async connect() {
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch((err) => {
            this.logger.error('Unable to connect to MongoDB.', 'Database');
            this.logger.error(err, 'Database');
        });
    };

    async disconnect() {
        await mongoose.disconnect().catch((err) => {
            this.logger.error('Unable to disconnect from MongoDB.', 'Database');
            this.logger.error(err, 'Database');
        });
    };

    get isConnected() {
        return mongoose.connection.readyState === 1;
    };

    async getKey(query) {
        const key = await APIKey.findOne(query);
        if(!key) return null;
        return key;
    };

    async createKey(doc) {
        const newKey = new APIKey(doc);
        await newKey.save();
        return newKey;
    };

    async updateKey(query, doc) {
        return APIKey.findOneAndUpdate(query, doc, {
            new: true
        });
    };

    async deleteKey(query) {
        return APIKey.findOneAndDelete(query);
    };
}

module.exports = Database;