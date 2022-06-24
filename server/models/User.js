import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    try {
        let salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(this.password, salt);
        this.password = newPassword;
        // console.log()
        next()
    } catch (error) {
        console.log(error)
    }
})

const User = mongoose.model("User", userSchema);

export default User