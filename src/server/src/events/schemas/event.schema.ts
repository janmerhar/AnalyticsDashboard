import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sanitize = require('mongo-sanitize');

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: ['crosspromo', 'liveops', 'app', 'ads'], required: true })
  type: string;

  @Prop({ min: 0, max: 10, required: true })
  priority: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.pre('save', function (next) {
  const schema = this.schema.paths;

  for (const field in schema) {
    this[field] = sanitize(this[field]);
  }

  next();
});

EventSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
