const mongoose = require('mongoose');
console.log("mongoose server is running");
mongoose.connect('mongodb://127.0.0.1:27017/homeTuition',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true
});
