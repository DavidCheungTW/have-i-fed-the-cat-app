// In src/app.js add this code:
const express = require("express");
const { Cat } = require("./models");

const app = express();

// we expect to have to parse json from request bodies,
// so we need the JSON middleware
app.use(express.json());

// we will put our routes and controller functions here
app.post("/cats", async (req, res) => {
  const cat = await Cat.create(req.body);
  res.status(201).json(cat);
});

app.get("/cats", async (req, res) => {
  const cats = await Cat.findAll({ where: req.query });
  res.status(200).json(cats);
});

// app.get("/cats/:catId", async (req, res) => {
//   const cat = await Cat.findByPk(req.params.catId);
//   res.status(200).json(cat);
// });
app.get("/cats/:catId", async (req, res) => {
  await Cat.findByPk(req.params.catId)
    .then((cat) => {
      if (!cat) {
        return res
          .status(400)
          .json({ message: `record not found with id=${req.params.catId}` });
      }
      res.status(200).json(cat);
    })
    .catch((err) => {
      res.status(400).json({ message: `${req.params.catId} is invalid` });
    });
});

// app.patch("/cats/:catId", async (req, res) => {
//   const result = await Cat.update(req.body, {
//     where: { id: req.params.catId },
//   });
//   res.status(200).json(result);
// });
app.patch("/cats/:catId", async (req, res) => {
  await Cat.update(req.body, {
    where: { id: req.params.catId },
  })
    .then((result) => {
      if (result[0] === 0) {
        return res
          .status(400)
          .json({ message: `record not update with id=${req.params.catId}` });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: `${req.params.catId} is invalid` });
    });
});

// app.patch("/feed/cats/:catId", async (req, res) => {
//   const result = await Cat.update(
//     { lastFed: new Date() },
//     {
//       where: { id: req.params.catId },
//     }
//   );
//   res.status(200).json(result);
// });

app.patch("/feed/cats/:catId", async (req, res) => {
  await Cat.update(
    { lastFed: new Date() },
    {
      where: { id: req.params.catId },
    }
  )
    .then((result) => {
      if (result[0] === 0) {
        return res
          .status(400)
          .json({ message: `cat is not feed with id=${req.params.catId}` });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: `${req.params.catId} is invalid` });
    });
});

// app.delete("/cats/:catId", async (req, res) => {
//   const result = await Cat.destroy({
//     where: { id: req.params.catId },
//   });
//   res.status(204).json(result);
// });
app.delete("/cats/:catId", async (req, res) => {
  await Cat.destroy({
    where: { id: req.params.catId },
  })
    .then((result) => {
      if (result === 0) {
        return res
          .status(400)
          .json({ message: `cat is not removed with id=${req.params.catId}` });
      }
      res.status(204).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: `${req.params.catId} is invalid` });
    });
});

module.exports = app;
