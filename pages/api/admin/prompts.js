import { getPrompt, setPrompt } from '../../../lib/promptConfig';

const ADMIN_PASSWORD = 'admin123'; // Same password as admin page

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return all prompts
    res.status(200).json({
      general: getPrompt('general'),
      productivity: getPrompt('productivity'),
      mindset: getPrompt('mindset'),
      business: getPrompt('business'),
    });
  } else if (req.method === 'POST') {
    // Simple password check from header for demo (in real app use better auth)
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { general, productivity, mindset, business } = req.body;

    if (
      typeof general === 'string' &&
      typeof productivity === 'string' &&
      typeof mindset === 'string' &&
      typeof business === 'string'
    ) {
      setPrompt('general', general);
      setPrompt('productivity', productivity);
      setPrompt('mindset', mindset);
      setPrompt('business', business);
      res.status(200).json({ message: 'Prompts updated' });
    } else {
      res.status(400).json({ error: 'Invalid prompt data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
