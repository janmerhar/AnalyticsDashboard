import { AxiosInstance } from "axios";

export type EventType = "crosspromo" | "liveops" | "app" | "ads";
export type EventPriority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface EventDetails {
  id: number;
  name: string;
  description: string;
  type: EventType;
  priority: EventPriority;
}

export type FilterBy = "name" | "id";
export type FilterSortField = "name" | "type" | "priority";
export type FilterSortOrder = "asc" | "desc";

export interface EventFilter {
  searchby?: FilterBy;
  query?: string | null;
  type?: EventType;
  priority?: EventPriority;
  sort?: FilterSortField;
  order?: FilterSortOrder;
}

export class Event implements EventDetails {
  id: number;
  name: string;
  description: string;
  type: EventType;
  priority: EventPriority;

  constructor(event: EventDetails) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.type = event.type;
    this.priority = event.priority;
  }

  private toObject() {
    if (this.isValid() !== true) {
      throw new Error("Invalid event");
    }

    return {
      _id: parseInt(this.id),
      name: this.name,
      description: this.description,
      type: this.type,
      priority: this.priority,
    };
  }

  isValid(): boolean | string[] {
    const errors: string[] = [];

    if (!this.id || this.id < 0) {
      errors.push("id");
    }

    if (this.name.length == 0) {
      errors.push("name");
    }

    if (this.description.length == 0) {
      errors.push("description");
    }

    if (!this.type) {
      errors.push("type");
    }

    if (this.priority < 0 && this.priority > 10) {
      errors.push("priority");
    }

    if (errors.length > 0) {
      return errors;
    }

    return true;
  }

  static async fetchAll(
    axios: AxiosInstance,
    filter: EventFilter,
    page: number = 1
  ): Promise<Event[]> {
    const response = await axios.get(`/events/${page}`, { params: filter });

    return response.data.map((event: EventDetails) => new Event(event));
  }

  static async deleteOne(axios: AxiosInstance, event: Event): Promise<boolean> {
    await axios.delete(`/events/delete/${event.id}`);

    return true;
  }

  async save(axios: AxiosInstance): Promise<boolean> {
    if (this.isValid() !== true) {
      return false;
    }

    const response = await axios.post("/events/add", this.toObject());

    return true;
  }

  async update(axios: AxiosInstance, newId: number): Promise<boolean> {
    if (this.isValid() !== true) {
      return false;
    }

    const response = await axios.patch(
      `/events/update/${newId}`,
      this.toObject()
    );

    return true;
  }
}
