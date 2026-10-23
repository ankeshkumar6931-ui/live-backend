const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const FIREBASE_URL = "https://live-app-bdba9-default-rtdb.firebaseio.com";
const AGORA_APP_ID = "edea8d3f66104552ac7ec969d670186d";
const AGORA_CERTIFICATE = "5c5c50b870844eccbe95812a1209ba21";
const CLOUD_NAME = "vljvpsmy";
const API_KEY = "821735465721186";
const API_SECRET = "NNLH-MNDAXC-OW-IG69OQ-ePap4";

app.get('/', (req, res) => {
    res.send("Live App Backend Bridge is Running Successfully! 🚀");
});

app.post('/start-live', async (req, res) => {
    try {
        const { channelName, hostName } = req.body;
        await axios.put(`${FIREBASE_URL}/live_status.json`, {
            isLive: true,
            channelName: channelName || "default_channel",
            hostName: hostName || "Admin",
            startTime: Date.now()
        });
        res.status(200).json({ success: true, message: "Live stream started!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/end-live', async (req, res) => {
    try {
        await axios.put(`${FIREBASE_URL}/live_status.json`, {
            isLive: false,
            channelName: "",
            endTime: Date.now()
        });
        res.status(200).json({ success: true, message: "Live stream ended!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
