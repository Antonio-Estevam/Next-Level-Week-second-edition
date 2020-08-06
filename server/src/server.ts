import express from 'express'; 

const app = express();

app.use(express.json());

app.post('/users', (req,res) => {
    console.log(req.body);

   const user = [
       {name: 'Jhonny', age: 25}
   ]
   
   
   return res.json(user)
})

app.listen(3333);



