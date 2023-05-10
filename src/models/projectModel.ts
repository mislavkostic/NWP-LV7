import mongoose, { ObjectId, Schema } from "mongoose";
//interface that represents structure of data that user must send to create new project
interface ProjectInput {
  projectName: string;
  description: string;
  cost: number;
  jobsDone: string;
  members: ObjectId[];
  startDate: Date;
  endDate: Date;
  leaderId: string;
  archived: boolean;
}
//interface that represents whole document, it contains all projectInput data plus some additional like _id
interface ProjectDocument extends ProjectInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
//schema that defines structure of single document
const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      default: 0,
    },
    jobsDone: {
      type: String,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    startDate: {
      type: Date,
      default: new Date(),
    },
    endDate: {
      type: Date,
      default: new Date(),
    },
    leaderId: {
      type: String,
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//model that will be used to "talk" to project collection
const projectModel = mongoose.model<ProjectDocument>("project", projectSchema);

export { ProjectDocument, ProjectInput, projectModel };
