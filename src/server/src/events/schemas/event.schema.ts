import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

