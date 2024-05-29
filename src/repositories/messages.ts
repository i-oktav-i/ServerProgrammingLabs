import { Message } from "../core/domain/message";
import { database } from "../db";
import { CommonPGRepository, pgErrorToDbError } from "../shared/utils";

class MessageRepository extends CommonPGRepository<Message> {
  constructor() {
    super(database, "messages", ["text", "timestamp"]);
  }

  create = async (entity: Pick<Message, "text">): Promise<Message> => {
    try {
      const data = await this.database.query(
        `INSERT INTO messages (text, timestamp) VALUES ($1, NOW()) RETURNING *`,
        [entity.text]
      );
      return data.rows[0];
    } catch (error) {
      console.log("error", error);
      throw pgErrorToDbError(error);
    }
  };
}

export const messageRepository = new MessageRepository();
