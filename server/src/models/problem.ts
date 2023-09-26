import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    sanitizedHtml: {
        type: String,
    },
    testcases: {
        type: [String],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
});

export const ProblemModel = mongoose.model('Problem', problemSchema);