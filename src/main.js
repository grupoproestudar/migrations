import dotenv from "dotenv";
import FirebaseAuth from "./firebase.js";
import LocalDb from "./localdb.js";
import NotificationDispatcher from "./notification.js";

dotenv.config();

const startup = async () => {
  try {
    const documents = await new FirebaseAuth().getDocuments();
    const content = await new LocalDb(documents).load();
    NotificationDispatcher.send(content);
  } catch (error) {
    console.error(error);
  }
};

startup();
