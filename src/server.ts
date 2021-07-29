import "./setup";
import app, { init } from "./app";

const port = +process.env.PORT || 4000;

console.log(process.env.NODE_ENV)
console.log(process.env.NODE_ENV === 'production')

init().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
});

