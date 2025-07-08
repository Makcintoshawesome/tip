import { getPrompt, setPrompt } from '../../mockPromptStore';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;
    if (typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Invalid prompt' });
    }
    setPrompt(prompt);
    return res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    const prompt = getPrompt();
    return res.status(200).json({ prompt });
  }
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end('Method Not Allowed');
}
