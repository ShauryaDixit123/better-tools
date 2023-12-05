import { configService } from "apps/configs/config.service";
import fs = require("fs");
fs.writeFileSync(
  "ormconfig.json",
  JSON.stringify(configService.initializePgdbConfig(), null, 2)
);
