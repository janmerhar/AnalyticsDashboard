import { CreateEventDto } from './create-event.dto';

export const CreateEventDtoStub = (): CreateEventDto => {
  return {
    _id: 1234567890,
    name: 'name',
    description: 'description',
    type: 'crosspromo',
    priority: 1,
  };
};
