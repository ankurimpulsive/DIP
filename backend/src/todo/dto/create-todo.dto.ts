import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
  @ApiProperty()
  todo: string;

  @ApiProperty({default: false})
  isCompleted: boolean;
}
