const express = require("express");

const logger = require("morgan"); 

const app = express();

const data = require("./movies.json");

const port = 4000;

app.use(logger("dev"));

app.use(express.json());

app.get("/", (req, res) => {
    
    res.send("Server running");
});

app.get("/movies", (req, res) => {
    res.status(200).json(data);
});

app.get("/movies/:id", (req, res) => {
   /* const id_movie = parseInt(req.params.id);
    const movie = data.find(m => m.id === id_movie);
    res.status(200).json(movie);*/
});

/*app.post("/movies", (req, res) => {
    data.push(req.body);
    res.status(200).json(data);
});*/

// app.put("/movies/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     let movie = data.find(m => m.id === id);
//     (movie.title = req.body.title), (movie.release = req.body.release); 
//     res.status(200).json(movie)
// });


app.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(m => m.id === id);
  
    if (index !== -1) {
      // Supprime le film
      data.splice(index, 1);
      res.status(200).json({ message: "Film supprimé avec succès !" });
    } else {
      res.status(404).json({ message: "Film non trouvé." });
    }
  });
  



app.listen(port, () =>
console.log(`express listening at http://localhost:${port}`)
);