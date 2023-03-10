import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
        },
        password: {
            type: String, 
            required: true
        },
        name : {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
const model = mongoose.model('User',schema);

export default model;