"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const bitly_helper_1 = __importDefault(require("./helpers/bitly.helper"));
const request_helper_1 = __importDefault(require("./helpers/request.helper"));
const application = commander_1.default.program;
application.name("fake bitly");
application.description("add visits to bitly links");
application.version("0.0.1");
application.requiredOption("-c, --code <code>", "bitly url code");
application.requiredOption("-t, --target <number>", "target of visits number", Number.parseInt);
application.option("-i, --interval <number>", "requester seconds interval", Number.parseFloat, 1);
application.action((options) => __awaiter(void 0, void 0, void 0, function* () {
    const validate = yield bitly_helper_1.default.valdiate(options.code);
    if (!validate) {
        console.log("invalid bitly url code");
        return;
    }
    for (let i = 0; i <= options.target; i++) {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const visit = yield request_helper_1.default.visit(options.code);
            if (visit) {
                console.log(`[${i}/${options.target}] - request visited`);
            }
            else {
                console.log(`[${i}/${options.target}] - error request`);
            }
        }), i * (options.interval * 1000));
    }
}));
application.parse(process.argv);
