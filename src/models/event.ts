import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are requried to create a new User
interface EventAttrs {
  id: string;
  name: string;
  startedAt: Date;
  endedAt?: Date;
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
  startedAt: Date;
  endedAt?: Date;
  challengersIds: string[];
}

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    startedAt: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
      }
    }
  }
);

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event(attrs);
};

const Event = mongoose.model<EventDoc, EventModel>('Event', eventSchema);

export { Event };
