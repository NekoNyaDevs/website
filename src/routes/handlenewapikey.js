const express = require('express');
const ms = require('ms');

module.exports = {
    path: "/newapikey",
    method: "post",
    router: async (req, res, logger, data) => {
        const password = req.query.password;
        if(password && password === process.env.PASSWORD) {
            if(Object.keys(req.body).length > 5) {
                return res.status(400).json({
                    status: 400,
                    error: {
                        code: 400,
                        message: 'Bad Request, too many parameters.',
                        text: 'BAD_REQUEST'
                    }
                });
            }
            if(!req.body.api_key || !req.body.user_id || !req.body.expires_in || !req.body.type) {
                return res.status(400).json({
                    status: 400,
                    error: {
                        code: 400,
                        message: 'Bad Request, missing parameters.',
                        text: 'BAD_REQUEST'
                    }
                });
            }

            const key = req.body.api_key;
            const userId = req.body.user_id;
            let expiresAt;
            if (Number(req.body.expires_in) === -1) expiresAt = -1;
            else expiresAt = Date.now() + ms(req.body.expires_in);
            const type = Number(req.body.type);
            const isDisabled = req.body.is_disabled || false;
            const createdAt = Date.now();

            const opts = {
                key: key,
                ownerId: userId,
                expiresAt: expiresAt,
                type: type,
                isDisabled: isDisabled,
                createdAt: createdAt
            };
            let entry = await data.db.getKey({ key });
            if(entry) {
                return res.status(400).json({
                    status: 400,
                    error: {
                        code: 400,
                        message: 'Bad Request, key already exists.',
                        text: 'BAD_REQUEST'
                    }
                });
            }
            entry = await data.db.getKey({ userId });
            if(entry) {
                return res.status(400).json({
                    status: 400,
                    error: {
                        code: 400,
                        message: 'Bad Request, user already has a key.',
                        text: 'BAD_REQUEST'
                    }
                });
            }

            const dbRes = await data.db.createKey(opts).catch(err => {
                logger.error(err.stack, 'MongoDB');
                return null;
            });
            if(!dbRes) {
                return res.status(500).json({
                    status: 500,
                    error: {
                        code: 500,
                        message: 'Internal Server Error, please try again later.',
                        text: 'INTERNAL_SERVER_ERROR'
                    }
                });
            }

            return res.status(200).json({
                status: 200,
                code: 'OK',
                message: 'API Key created.',
                key: key,
                userId: userId,
                expiresAt: expiresAt,
                type: type,
                isDisabled: isDisabled,
                createdAt: createdAt
            });
        }
        return res.redirect('/');
    }
};