import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

import { EventType } from './create-event.dto';
import { EventPriority } from './create-event.dto';

export type SearchBy = 'name' | 'id';
export type SearchSortField = 'name' | 'type' | 'priority';
export type SearchSortOrder = 'asc' | 'desc';

export class SearchEventDto {
  @IsString({ message: 'searchby' })
  @IsOptional()
  readonly searchby?: SearchBy;

  @IsString({ message: 'query' })
  @IsOptional()
  readonly query?: string | null;

  @IsString({ message: 'type' })
  @IsOptional()
  readonly type?: EventType;

  @IsInt({ message: 'priority' })
  @Min(0, { message: 'priority' })
  @Max(10, { message: 'priority' })
  @IsOptional()
  readonly priority?: EventPriority;

  @IsString({ message: 'sort' })
  @IsOptional()
  readonly sort?: SearchSortField;

  @IsString({ message: 'order' })
  @IsOptional()
  readonly order?: SearchSortOrder;
}
