var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/StudentAPI', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var StudentSchema = new mongoose.Schema({
    firstName: {
            type: String,
            required: [true, "Please enter a First Name."],
            minlength: [true, "The First Name must be at least 2 characters long."]
    },
    lastName: {
            type: String,
            required: [true, "Please enter a Last Name."],
            minlength: [true, "The Last Name must be at least 2 characters long."]
    }, //Live or Video
}, {timestamps:true})


module.exports = mongoose.model('student', StudentSchema);