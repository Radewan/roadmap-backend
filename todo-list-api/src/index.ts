import { web } from "./applications/web";
import dotenv from "dotenv";

dotenv.config();

web.listen(3000, () => {
  console.log("listen at port 3000");
});
