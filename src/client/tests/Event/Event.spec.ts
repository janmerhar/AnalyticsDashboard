import { describe, expect, test, vi, beforeEach, it } from "vitest";
import { Event } from "../../src/entities/Event";

import { EventDetailsValid } from "./EventDetailsValid.stub";
import axios from "axios";
import { events } from "./events";

vi.mock("axios");

describe("Event", () => {
  beforeEach(() => {
    // @ts-ignore
    axios.get.mockReset();
  });

  describe("constructor", () => {
    test("should return an event if the event is valid", () => {
      const event = new Event(EventDetailsValid());

      expect(event instanceof Event).toBe(true);
    });
  });

  describe("toObject", () => {
    test("should return an object if the event is valid", () => {
      const event = new Event(EventDetailsValid());
      // @ts-ignore
      const eventObject = event.toObject();

      expect(eventObject._id).toEqual(event.id);
      expect(eventObject.name).toEqual(event.name);
      expect(eventObject.description).toEqual(event.description);
      expect(eventObject.type).toEqual(event.type);
      expect(eventObject.priority).toEqual(event.priority);
    });
  });

  describe("fetchAll", () => {
    test("should return an array of events if the response is successful", async () => {
      // @ts-ignore
      axios.get.mockResolvedValue({ data: events });
      const eventsFetched = await Event.fetchAll(axios, {});

      eventsFetched.forEach((event) => {
        expect(event instanceof Event).toBe(true);
      });
    });

    test("should return an empty array if the search is unsuccessful", async () => {
      // @ts-ignore
      axios.get.mockResolvedValue({ data: [] });
      const eventsFetched = await Event.fetchAll(axios, { type: "liveops" });

      // return should be empty array
      expect(eventsFetched instanceof Array).toBe(true);
      expect(eventsFetched.length).toBe(0);
    });
  });

  describe("deleteOne", () => {
    test("should return true if the response is successful", async () => {
      // @ts-ignore
      axios.delete.mockResolvedValue({ data: true });

      const eventCreated = new Event(EventDetailsValid());
      const result = await Event.deleteOne(axios, eventCreated);

      expect(result).toEqual(true);
    });
  });

  describe("save", () => {
    test("should return new event if the event is valid and the response is successful", async () => {
      // @ts-ignore
      axios.post.mockResolvedValue({ data: EventDetailsValid() });

      const event = new Event(EventDetailsValid());
      const result = await event.save(axios);

      expect(result).toEqual(true);
    });
  });

  describe("update", () => {
    test("should return true if the event is valid and the response is successful", async () => {
      const eventToUpdate = EventDetailsValid();
      eventToUpdate.id = 1;

      // @ts-ignore
      axios.patch.mockResolvedValue({ data: eventToUpdate });

      const event = new Event(EventDetailsValid());
      const result = await event.update(axios, 1);

      expect(result).toEqual(true);
    });
  });
});
