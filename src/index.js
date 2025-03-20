import express from 'express';
import bodyParser from 'body-parser';
import { uploadoncloudinary } from './utils/cloudinary.js';
import { upload } from './middleware/multer.middleware.js';
const app = express();

// Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // for URL-encoded data





app.use(bodyParser.json());
app.use((req, res, next) => {
  let rawBody = '';
  req.on('data', chunk => {
    rawBody += chunk;
  });
  req.on('end', () => {
    console.log('Raw body received:', rawBody);  // Log raw body here
    next();
  });
});

// Your Hikvision API endpoint (this is where the device will send data)
app.post('/hikvision-data', upload.single('image'), async(req, res) => {
    // Log the data to see what you’re getting
try {
      console.log('Form Data:', req.body);
      console.log('File:', req.file);
  
    // Access the event log
    // if (req.body.event_log) {
    //   console.log('Event log:', req.body.event_log);
    //   // Parse and process the event log if needed
    //   const eventLog = JSON.parse(req.body.event_log);
    //   console.log('Parsed Event Log:', eventLog);
    // } else {
    //   console.log('No event log received');
    //   }
          if (req.file) {
          // If avatar is uploaded, upload to Cloudinary
          const imagePath = req.file.path;
          avatarUrl = await uploadoncloudinary(imagePath, { folder: 'user' });
          console.log(avatarUrl)
        }
  
    res.status(200).send('Data received');
} catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  
}
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
