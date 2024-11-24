import buildApp from "./app";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const server = buildApp({
    logger: true
})

server.listen({ port }, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
})