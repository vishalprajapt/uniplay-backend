

require("dotenv").config()
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Your Cashfree credentials
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY
const CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg"; // Use 'https://api.cashfree.com/pg' for live


app.post('/create-order', async (req, res) => {
    try {
        const { orderId, orderAmount, customerName, customerEmail, customerPhone } = req.body;

        const response = await axios.post(`${CASHFREE_BASE_URL}/orders`, {
            order_id: orderId,
            order_amount: 7,
            order_currency: "INR",
            customer_details: {
                customer_id: "CUST001",
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone
            },
            order_meta: {
        return_url: `https://uniplay-web.netlify.app`
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': CASHFREE_APP_ID,
                'x-client-secret': CASHFREE_SECRET_KEY,
                'x-api-version': '2022-09-01'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Payment order creation failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
