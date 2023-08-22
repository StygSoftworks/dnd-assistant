// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const app = express();

// Use cors middleware
app.use(cors());
const PORT = 3001;
const weaponsFilePath = path.join(__dirname, "data", "weapons.json");
const classesFilePath = path.join(__dirname, "data", "classes.json");
const charactersFilePath = path.join(__dirname, "data", "characters.json");
const racesFilePath = path.join(__dirname, "data", "races.json");
const templatesFilePath = path.join(__dirname, "data", "templates.json");
const alignmentsFilePath = path.join(__dirname, "data", "alignments.json");

app.use(express.json());

// Configure multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Set the destination folder for images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Post request to add a new weapon or update fields if the new fields are not blank
app.post("/api/addWeapon", upload.single("image"), (req, res) => {
  console.log(req.body);

  const newWeapon = JSON.parse(req.body.weapon);

  if (req.file) {
    newWeapon.imagePath = req.file.path;

    //save the image to the backend folder
    const imageFile = req.file;

    //new filename should be a valid filename version of the weapons name + the original file extension
    const imageNewFileName =
      newWeapon.name.replace(/[^a-zA-Z0-9]/g, "") +
      path.extname(imageFile.originalname);

    const targetPath = path.join(
      "../../public",
      "images",
      "weapons",
      imageNewFileName
    );
    //console.log(targetPath);
    fs.rename(imageFile.path, targetPath, function (err) {
      if (err) throw err;
      //console.log("Upload completed!");
    });
  }

  const weaponsData = fs.readFileSync(weaponsFilePath, "utf-8");
  const weapons = JSON.parse(weaponsData);

  const existingWeaponIndex = weapons.findIndex(
    (w) => w.name === newWeapon.name
  );

  if (existingWeaponIndex !== -1) {
    const existingWeapon = weapons[existingWeaponIndex];
    const fieldsToUpdate = [
      "description",
      "damage",
      "damageType",
      "critical",
      "range",
      "weight",
      "properties",
      "type",
      "proficiency",
    ];

    fieldsToUpdate.forEach((field) => {
      if (newWeapon[field] !== "") {
        existingWeapon[field] = newWeapon[field];
      }
    });

    if (newWeapon.cost.value !== "") {
      existingWeapon.cost.value = newWeapon.cost.value;
    }
    if (newWeapon.cost.currency !== "") {
      existingWeapon.cost.currency = newWeapon.cost.currency;
    }
  } else {
    weapons.push(newWeapon);
  }

  fs.writeFileSync(weaponsFilePath, JSON.stringify(weapons, null, 2));

  res.json({ success: true });
});

//Get Request for all weapons
app.get("/api/weapons", (req, res) => {
  res.sendFile(weaponsFilePath);
});

//get request for a specific weapon
app.get("/api/details-weapon/:name", (req, res) => {
  const weaponName = req.params.name;
  const weaponsData = fs.readFileSync(weaponsFilePath, "utf-8");
  const weapons = JSON.parse(weaponsData);
  const foundWeapon = weapons.find((weapon) => weapon.name === weaponName);
  if (!foundWeapon) {
    return res.status(404).json({ error: "Weapon not found" });
  }
  res.json(foundWeapon);
});

//Get Request for all classes
app.get("/api/classes", (req, res) => {
  res.sendFile(classesFilePath);
});

//get request for a specific class
app.get("/api/details-class/:name", (req, res) => {
  const reqParam = req.params.name;
  //console.log(reqParam);
  //console.log(req.params);

  //get the text from the file

  const strData = fs.readFileSync(classesFilePath, "utf-8");
  //const data = JSON.parse(strData);

  let parsedData;
  let data;
  try {
    data = JSON.parse(strData);

    const foundClass = data.find((data) => data.name === reqParam);
    if (!foundClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    console.log(foundClass);

    res.json(foundClass);
  } catch (error) {
    console.error("Error parsing JSON", error);
  }
});

//Get Request for all alignments
app.get("/api/alignments", (req, res) => {
  res.sendFile(alignmentsFilePath);
});

//Get Request for all characters
app.get("/api/characters", (req, res) => {
  res.sendFile(charactersFilePath);
});

//get request for all races
app.get("/api/races", (req, res) => {
  res.sendFile(racesFilePath);
});

//get request for all templates
app.get("/api/templates", (req, res) => {
  res.sendFile(templatesFilePath);
});

//let the people know the server is running
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
