const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.listen(3001, () => console.log('JSON Server is running'));

server.put('/customers/27000000', (req, res) => {
    let body = [];
    req.on('data', chunk => body.push(chunk)).on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        console.log(JSON.stringify(body));
        const error = { error: true, validation: { age: 'Must be a minor' } };
        const ok = { ok: true };
        if (body.age && body.age > 18) return res.send(error);
        res.send(ok);
    });
});

server.use(router);