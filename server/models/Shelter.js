var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var ShelterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be at least 2 characters"],
        minlength: [2,"Name must be at least two characters in length"],
        maxlength: [255, "Name cannot be more than 255 characters in length"]
    },
    address: {
        streetNum: {
            type: Number,
            required: [true, "Street number is required"],
            minlength: [1, "Street number needs to be at least 1 digit"],
            maxlength: [6, "Street number needs to be less than 6 digits"]
        },
        streetName:{
            type: String,
            required: [true, "Street name is required"],
            minlength: [2,"Street name must be at least two characters in length"],
            maxlength: [255, "Street name cannot be more than 255 characters in length"]
        },
        suiteNo: {
            type: String,
            required: false,
            default: ""
        },
        city: {
            type: String,
            required: [true, "City is required"],
            minlength: [3, "No city has less than three characters"]
        },
        state: {
            type: String,
            required: [true, "State is required"]
        },
        zipcode: {
            type: Number,
            required: [true, "Zipcode is required"],
            minlength: [5, "Zipcode must be 5 digits"],
            maxlength: [5, "Zipcode must be 5 digits"]
        },
        zipsuffix: {
            type: Number,
            required: false,
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [6, "Email must be at least 6 characters in length"],
        maxlength: [255, "E-mail cannot be more than 255 characters in length"],
        validate: {
            validator: function(value){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: "Email must be in the following format: example@example.com"
        }
    },
    telephone: {
        type: Number,
        required: [true, "Phone number is required"],
        minlength: [10,"Phone number must be 10 digits"],
        maxlength: [10, "Phone number must be 10 digits"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters in length"],
        maxlength: [255, "Password length cannot exceed 255 characters"],
        validate: {
            validator: function(value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
            },
            message: "Password must have at least 1 number and 1 uppcase character"
        }
    },
    confirm_pw: {
        type: String,
        required: [true, "Must have password confirmation for registration"],
        validate: {
            validator: function(value){
                return value == this.password;
            },
            message: "Password confirmation does not match password"
        }
    },
    approval: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

//Hashes new password
ShelterSchema.methods.hash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

//Saves Password
ShelterSchema.pre("save", function(done){
    this.password = this.hash(this.password);
    this.confirm_pw = undefined;
    done();
})


//Below compares input password with password in db
ShelterSchema.methods.authenticate = function(form_pw, password){
    return bcrypt.compareSync(form_pw, password);
}

let User = mongoose.model("Shelter", ShelterSchema);
