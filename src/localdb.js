import fs from "fs";
import path from "path";
class LocalDb {
  constructor(seeds, seedName = "feedbacks") {
    this.createdAt = new Date().getFullYear() - 1;
    this.fileName = `${seedName}-${this.createdAt}.json`;
    this.seeds = JSON.stringify(seeds);
  }
  async load() {
    try {
      await fs.promises.writeFile(this.fileName, this.seeds);
      const content = await fs.promises.readFile(this.fileName);
      return {
        fileName: path.basename(this.fileName),
        content: content,
      };
    } catch (error) {
      console.error(error);
    }
  }
}

export default LocalDb;
