import * as express from 'express'
import * as path from 'path'

const app = express();

app.use(express.static('src/'))


app.get('/' , (req, res) => {
    res.sendFile( path.join(__dirname , 'src' , 'index.html'));
})

app.listen(3000)