import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        proof: Object,
        publicSignals: Array,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;