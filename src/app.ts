import {Telegraf} from "telegraf";
import LocalSession from "telegraf-session-local";
import {IConfigService} from "./config/config.interface";
import {ConfigService} from "./config/config.service";
import {IBotContext} from "./context/context.interface";
import {Command} from "./commands/comman.class";
import {StartCommand} from "./commands/start.command";
import {HearCommand} from "./commands/hear.command";
import {AutomatedTestRunnerCommand} from "./commands/automated-test-runner.command";

class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        const botToken: string = this.configService.get('BOT_TOKEN');
        this.bot = new Telegraf<IBotContext>(botToken);
        this.bot.use((new LocalSession({database: 'example_db.json'})).middleware());
    }

    init(): void {
        this.commands = [
            new StartCommand(this.bot, this.configService),
            new HearCommand(this.bot, this.configService),
            new AutomatedTestRunnerCommand(this.bot, this.configService),
        ]
        for (const command of this.commands) {
            command.handle();
        }

        this.bot.launch();
    }
}

const bot: Bot = new Bot(new ConfigService())
bot.init()
