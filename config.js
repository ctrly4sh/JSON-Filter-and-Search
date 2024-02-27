const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    app:{
        port: process.env.PORT || 6500
    }
};
