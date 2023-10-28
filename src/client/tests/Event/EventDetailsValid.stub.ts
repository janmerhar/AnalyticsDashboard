import { EventDetails } from "../../src/entities/Event";

export const EventDetailsValid = (): EventDetails => {
  return {
    id: 1,
    name: "test",
    description: "test",
    type: "app",
    priority: 1,
  };
};
