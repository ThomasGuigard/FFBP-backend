import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface LeagueAttrs {
  name: string;
  startedAt: Date;
  endedAt?: Date;
  challengersIds: string[];
}

// An interface that describes the properties
// that a User Model has
interface LeagueModel extends mongoose.Model<LeagueDoc> {
  build(attrs: LeagueAttrs): LeagueDoc;
}

// An interface that describes the properties
// that a User Document has
interface LeagueDoc extends mongoose.Document {
  id: string;
  name: string;
  startedAt: Date;
  endedAt?: Date;
  challengersIds: string[];
}

const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    startedAt: {
      type: Date,
      required: true
    },
    challengersIds: {
      type: [],
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

leagueSchema.statics.build = (attrs: LeagueAttrs) => {
  return new League(attrs);
};

const League = mongoose.model<LeagueDoc, LeagueModel>('League', leagueSchema);

export { League };
