let bcrypt = require('bcrypt');
bcrypt.genSalt(10, function(error, salt){
    bcrypt.hash()
})