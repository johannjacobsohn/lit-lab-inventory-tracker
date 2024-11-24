import buildApp from "./app";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8081;

async function startServer() {
    const server = await buildApp({
        logger: true
    })

    server.listen({
        port,
        host: '0.0.0.0',
        listenTextResolver: (address) => { return `Backend server is listening at ${address}` }
    }, (err: Error | null, address: string) => {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }

        console.log(`Server listening at ${address}`)
    })
}

startServer();