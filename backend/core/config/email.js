
import axios from 'axios';
import 'dotenv/config';
import { EmailError } from '../errors/errors.js';
const BASE_URL = process.env.EMAIL_API_URL; 
const SENDING_KEY= process.env.EMAIL_SENDING_KEY;
const DEFAULT_CLOUD_AIRPORT_EMAIL = process.env.DEFAULT_CLOUD_AIRPORT_EMAIL;

export async function sendMail({ to, subject, plain, html }) {
  try {
    const payload = {
      from: {
        address: DEFAULT_CLOUD_AIRPORT_EMAIL,
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
    throw new EmailError(err.message || err.response?.data);
  }
}
