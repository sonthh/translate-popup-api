import { FindWordDto } from "./app.dto";

export interface FindWordService {
  query: FindWordDto,
}

export interface ControllerError {
  code: number,
  message: string,
}