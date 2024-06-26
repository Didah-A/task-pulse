import mongoose, { Schema, model, models } from "mongoose";

interface IIssue {
  title: string;
  description: string;
  creator: {
    name: string;
    creatorId: string;
  };
  creatorId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema = new Schema<IIssue>({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  creator: {
    type: new Schema({
      name: {
        type: String,
        required: [true, "Creator name is required!"],
      },
      creatorId: {
        type: String,
        required: [true, "Creator Id is required!"],
      },
    }),
    required: false,
  },
  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
    required: [true, "Status is required!"],
    default: "OPEN",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Issue = models.Issue || model("Issue", IssueSchema);

export default Issue;
