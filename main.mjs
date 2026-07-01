import { Client, GatewayIntentBits} from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.once('ready', () => {
    console.log(`... ${client.user.tag} が正常に起動しました！`);
    console.log(`...✨ ${client.guilds.cache.size}　つのサーバーに参加中`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'ping') {
        message.reply('pong');
        console.log(`${message.author.tag}　が　ping　コマンドを使用`);
    }
});

client.on('error', (error) => {
    console.error('⚠️ ... エラーが発生しました:', error);
});

process.on('SIGINT', () => {
    console.log('🛑 Discord Bot を終了しています...');
    client.destroy();
    process.exit(0);
});

if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN が .env ファイルに設定されていません。');
    process.exit(1);
}

console.log('💻🌐 Discord に接続中...');
client.login(process.env.DISCORD_TOKEN)
.catch((error) => {
    console.error('❌ ...ログインに失敗しました:', error);
    process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        status:'botちゃんはお仕事中です　🖥',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => {
    console.log(`🌐 サーバーがポート ${PORT} で起動しました`)
    });