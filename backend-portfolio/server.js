const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const readData = () => {
  const dataPath = path.join(__dirname, 'data', 'portfolio.json');
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

const writeData = (data) => {
  const dataPath = path.join(__dirname, 'data', 'portfolio.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};


app.get('/api/portfolio', (req, res) => {
  res.json(readData());
});

app.post('/api/portfolio', upload.single('image'), (req, res) => {
  const { title, description, link } = req.body;
  const image = req.file ? req.file.path : null;

  if (title && description && link && image) {
    const items = readData();
    const newItem = {
      id: uuidv4(), 
      title,
      description,
      link,
      image: image.replace('\\', '/') 
    };
    console.log('New Item with ID:', newItem); 
    items.push(newItem);
    writeData(items);
    res.status(201).json(newItem);
  } else {
    res.status(400).json({ error: 'Missing required fields' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
