import { Repository } from "../../shared/typings";

export type Message = {
  id: number;
  text: string;
  timestamp: string;
};

export type MessageRepositoryInterface = Repository<Message>;
