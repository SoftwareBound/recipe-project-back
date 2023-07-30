import express from "express";
import { findOne, insertOne } from "./mongoDB";

const app = express();
app.listen(3000);

app.get("/", (req, res) => {
  res.send("Hiiiii regular");
});

app.get("/recipe", (req, res) => {
  let message: string = "";
  findOne({ name: "פשטידת פצפוצי אורז" })
    .then((resultItem) => {
      if (resultItem) {
        message = `Hiiiii ${resultItem.name} recipe`;
      } else {
        message = `item didnt found`;
      }
      console.log(message);
      res.send(message);
    })
    .catch((e) => {
      res.send(`${e} error occured`);
    });
});

app.get("/recipes", (req, res) => {
  insertOne({
    name: "פשטידת פצפוצי אורז",
    preperationTime: "שעה",
    ingredients: [
      { name: "ביצים", amount: 2 },
      { name: "פצפוצי אורז", amount: 2, amountType: "כוסות" },
      { name: "בצל", amount: 1 },
      { name: "גבינת קוטג'", amount: 1 },
      {
        name: "גבינת פרמז’ן או בולגרית מפוררת",
        amount: 0.25,
        amountType: "כוס",
      },
      { name: "מלח", amount: 1, amountType: "כפית" },
      { name: "פלפל", amount: 1, amountType: "קמצוץ" },
      {
        name: "זיתים ירוקים קצוצים, גרגירי תירס, פטריות קצוצות מטוגנות",
        amount: 1,
        optional: true,
      },
    ],
    instructions: [
      {
        title: "הכנה",
        content: [
          "מחממים תנור ל180 מעלות",
          "מחממים מחבת קטנה עם כף שמן ומטגנים את הבצל עד להזהבה קלה",
          "מוסיפים את הבצל המטוגן לקערה ומערבבים יחד עם כל החומרים עד לתערובת אחידה",
          "יוצקים את כל התוכן לתבנית,אפשר לפזר גבינה מגורדת מלמעלה, ואופים בתנור במשך 22-25 דקות עד להזהבה",
        ],
      },
    ],
    tags: ["פשטידה"],
  });
  res.send("Hiiiii recipes");
});
