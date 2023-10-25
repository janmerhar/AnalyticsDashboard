import { IsString, IsInt, Min, Max } from 'class-validator';

export type EventType = 'crosspromo' | 'liveops' | 'app' | 'ads';
export type EventPriority = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export class CreateEventDto {
  @Min(1, { message: '_id' })
  @IsInt({ message: '_id' })
  readonly _id: number;

  @IsString({ message: 'name' })
  readonly name: string;

  @IsString({ message: 'description' })
  readonly description: string;

  @IsString({ message: 'type' })
  readonly type: EventType;

  @IsInt({ message: 'priority' })
  @Min(0, { message: 'priority' })
  @Max(10, { message: 'priority' })
  readonly priority: EventPriority;
}
