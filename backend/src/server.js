require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DB = path.join(__dirname, process.env.DB_FILE || "todos.txt");

if (!fs.existsSync(DB)) {
    fs.writeFileSync(DB, "[]");
}

function getTodos() {
    return JSON.parse(fs.readFileSync(DB));
}

function saveTodos(todos) {
    fs.writeFileSync(DB, JSON.stringify(todos, null, 2));
}

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    if(req.method === "OPTIONS"){
        res.writeHead(204);
        return res.end();
    }

    // GET ALL TODOS
    if(req.method === "GET" && req.url === "/todos"){

        const todos = getTodos();

        res.writeHead(200,{
            "Content-Type":"application/json"
        });

        return res.end(JSON.stringify(todos));
    }

    // CREATE TODO
    if(req.method === "POST" && req.url === "/todos"){

        let body = "";

        req.on("data",chunk=>{
            body += chunk;
        });

        req.on("end",()=>{

            let data;
            try {
                data = JSON.parse(body);
            } catch (e) {
                res.writeHead(400,{ "Content-Type":"application/json" });
                return res.end(JSON.stringify({ error: "Invalid JSON" }));
            }

            if (!data.text || !data.text.trim()) {
                res.writeHead(400,{ "Content-Type":"application/json" });
                return res.end(JSON.stringify({ error: "Text is required" }));
            }

            const todos = getTodos();

            const todo = {
                id: Date.now(),
                text:data.text,
                completed:false
            };

            todos.push(todo);

            saveTodos(todos);

            res.writeHead(201,{
                "Content-Type":"application/json"
            });

            res.end(JSON.stringify(todo));

        });

        return;
    }

    // TOGGLE COMPLETE
    if(req.method === "PUT" && req.url.startsWith("/todos/")){

        const id = Number(req.url.split("/")[2]);

        const todos = getTodos();

        const todo = todos.find(t=>t.id===id);

        if(todo){

            todo.completed = !todo.completed;

            saveTodos(todos);

            res.writeHead(200,{
                "Content-Type":"application/json"
            });

            return res.end(JSON.stringify(todo));

        }

        res.writeHead(404);
        return res.end();
    }

    // DELETE
    if(req.method==="DELETE" && req.url.startsWith("/todos/")){

        const id = Number(req.url.split("/")[2]);

        let todos = getTodos();

        todos = todos.filter(t=>t.id!==id);

        saveTodos(todos);

        res.writeHead(204);
        return res.end();
    }

    res.writeHead(404);

    res.end();

});

server.listen(PORT,()=>{

    console.log(`Running on ${PORT}`);

});