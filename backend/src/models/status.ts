import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    text: {
        type: String,
        // minlength: 2000,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Status = mongoose.model("Status", statusSchema);

export default Status;
