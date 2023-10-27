import { CreateEventDto } from './create-event.dto';

export const UpdateEventDtoStub = (): CreateEventDto => {
  return {
    _id: 1234567890,
    name: 'new name',
    description: 'new description',
    type: 'crosspromo',
    priority: 1,
  };
};
