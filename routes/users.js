const { json } = require("body-parser");

const userRoutes = (app, fs) => {
    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    }


    const dataPath = './data/users.json';


    app.get('/users', (req, res) => {
        readFile((data) => {
            res.send(data);

        }, true);

    });

    app.post('/users', (req, res) => {
        readFile((data) => {
            const newUserId = Data.now().toString();

            data[newUserId] = req.body;

            writeFile(JSON.stringfily(data, null, 2), () => {
                res.status(200).send('new user add');
            });

        }, true);
    });
    //update
    app.post('/users/:id', (req, res) => {
        readFile((data) => {
            const userId = req.params['id'];
            data[userId] = req.body;
            console.log(data);
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId}updated`);
            });
        }, true);
    });

   // DELETE
    app.delete('/users/:id',(req,res)=>{

        readFile((data)=>{
            const userId=req.params['id'];
            //console.log(data);
            delete data[userId];
            
            writeFile(JSON.stringify(data,null,2),()=>{
                res.status(200).send(`users id :${userId}removed`);
            });
        },true);
    });




};






module.exports = userRoutes;