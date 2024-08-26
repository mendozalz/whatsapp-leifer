import { createBot, MemoryDB, createProvider, createFlow, addKeyword } from "@bot-whatsapp/bot"
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('Hola').addAnswer('Buenas papincho!')

const main = async () => {
    const provider = createProvider(BaileysProvider);

    provider.initHttpServer(3002);

    provider.http?.server.get('/send-message', handleCtx(async (bot, req, res)=>{
        // await bot.sendMessage('573022408297', 'Papaito lindo!!!', {});
        const body = req.body;
        const message = body.message;
        const mediaUrl = body.mediaUrl;
        await bot.sendMessage('573022408297', message, {
            media: mediaUrl
        })
        
            res.end("Hola papaito")
    }));

    await createBot({
        flow: createFlow([]),
        database: new MemoryDB(),
        provider
    })
}

main();