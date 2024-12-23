const app = require('./src/app');
const dotenv = require('dotenv');
const connectMongo = require('./src/config/mongo');
connectMongo();

dotenv.config();

const PORT = ProcessingInstruction.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});