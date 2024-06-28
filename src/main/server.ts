import { env } from "../enviroment";
import { mongoHelper } from "../infra/db/mongodb/Account-repository/helpers/mong-helper";
import { app } from "./config/app";

mongoHelper
  .connect(env.MONGO_URL)
  .then(() => {
    app.listen(env.ENV_PORT, () => {
      console.log(`Server running http://localhost:${env.ENV_PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
