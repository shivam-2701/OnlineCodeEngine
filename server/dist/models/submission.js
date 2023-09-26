import mongoose, { Schema } from "mongoose";
const submissionSchema = new Schema({
    src: {
        type: String,
        required: true,
    },
    lang: {
        type: String,
        enum: ["cpp", "javac", "python"],
        required: true,
    },
    input: {
        type: String,
    },
    output: {
        type: String,
    },
    error: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: "Problem",
    }
}, {
    timestamps: true,
});
export const SubmissionModel = mongoose.model('Submission', submissionSchema);
//# sourceMappingURL=submission.js.map