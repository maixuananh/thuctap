const userRoutes = require('./users');
const appRouter = (app, fs) => {
    app.get('/',(req,res)=>{
        res.send('Hello World welcome to the development api-sever');
    });

    userRoutes(app,fs);
};



module.exports = appRouter;