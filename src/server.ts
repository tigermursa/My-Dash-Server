import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function server() {
  try {
    await mongoose.connect(config.dataBase as string);
    console.log("🎊 Mongoose connected successfully  🎉");
    app.listen(config.port, () => {
      console.log(`Dear app listening on port ${config.port} 📌`);
    });
  } catch (error) {
    console.log(error);
  }
}

server().catch((err) => console.log(err));
