import commander from "commander";

import Bitly from "./helpers/bitly.helper";
import Request from "./helpers/request.helper";

const application = commander.program;

application.name("fake bitly");
application.description("add visits to bitly links");
application.version("0.0.1");

application.requiredOption("-c, --code <code>", "bitly url code");
application.requiredOption(
  "-t, --target <number>",
  "target of visits number",
  Number.parseInt
);
application.option(
  "-i, --interval <number>",
  "requester seconds interval",
  Number.parseFloat,
  1
);

application.action(async (options) => {
  const validate = await Bitly.valdiate(options.code);
  if (!validate) {
    console.log("invalid bitly url code");
    return;
  }

  for (let i = 0; i <= options.target; i++) {
    setTimeout(async () => {
      const visit = await Request.visit(options.code);

      if (visit) {
        console.log(`[${i}/${options.target}] - request visited`);
      } else {
        console.log(`[${i}/${options.target}] - error request`);
      }
    }, i * (options.interval * 1000));
  }
});

application.parse(process.argv);
