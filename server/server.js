import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
const PORT = 3000;

app.get('/api/planets', async (req, res) => {
    try {
        const planets = ({ planet : "Tatooine"})
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong in a galaxy far, far away...");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});