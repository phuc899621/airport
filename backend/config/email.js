
import axios from 'axios';

const BASE_URL = 'https://smtp.maileroo.com/api/v2/emails'; 
const SENDING_KEY="529d47f1d21bec04d0a325116bbcbf8381f7545f7ee38d474705d3293c3b1dbf"

export async function sendMail({ to, subject, plain, html }) {
  try {
    const payload = {
      from: {
        address: "noreply@10eb1893fadf3f80.maileroo.org",
        display_name: "Cloud Airline"
      },
      to: [
        {
          address: to,
          display_name: 'User'
        }
      ],
      subject,
      plain,
      html
    };

    const response = await axios.post(
      BASE_URL,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SENDING_KEY}`
        }
      }
    );

    console.log('Maileroo API response:', response.data);
    return response.data;
  } catch (err) {
    console.error('Maileroo API error:', err.response?.data || err.message);
    throw err;
  }
}
