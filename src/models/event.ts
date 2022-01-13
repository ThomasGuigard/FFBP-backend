import mongoose from 'mongoose';
import {EventKind} from "../enums/event-kind";

// An interface that describes the properties
// that are requried to create a new User
interface EventAttrs {
  name: string;
  date: Date;
  kind: EventKind;
  challengersIds: string[];
}

// An interface that describes the properties
// that a User Model has
interface EventModel extends mongoose.Model<EventDoc> {
  build(attrs: EventAttrs): EventDoc;
}

// An interface that describes the properties
// that a User Document has
interface EventDoc extends mongoose.Document {
  id: string;
  name: string;
  date: Date;
  kind: EventKind;
  challengersIds: string[];
}

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    challengersIds: {
      type: [],
      required: true,
    },
    kind: {
      type: Number,
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

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event(attrs);
};

const Event = mongoose.model<EventDoc, EventModel>('Event', eventSchema);

export { Event };
