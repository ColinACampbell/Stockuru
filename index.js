const express = require('express');

const app = express();
app.use('/',express.static(`${__dirname}/static`));

app.get('/*',(req,res)=>{
    res.sendFile(`${__dirname}/static/index.html`);
});

const port = process.env.PORT || 3000
app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`Server started on https://localhost:${port}`);
})