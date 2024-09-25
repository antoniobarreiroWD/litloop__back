const express = require('express');
const User = require('../models/user.model');


const userController = {

    getUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await

                User.findById
                    (userId);
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            res.send(user);
        } catch (error) {
            res.status(500).send
                (error);

        }
    }

};

module.exports = userController;