import { getPrompt } from '../../mockPromptStore';

const tipsDatabase = {
  productivity: [
    "Batch your tasks to stay focused and efficient.",
    "Start your day by tackling the hardest task first.",
    "Use the Pomodoro technique to maintain focus.",
    "Eliminate distractions by turning off notifications.",
    "Set clear goals for each work session.",
    "Take regular breaks to recharge your mind.",
    "Prioritize tasks using the Eisenhower matrix.",
    "Delegate tasks that others can do.",
    "Keep a clean and organized workspace.",
    "Review your progress at the end of each day.",
  ],
  mindset: [
    "Your thoughts shape your reality — choose them wisely.",
    "Growth starts with being uncomfortable.",
    "Embrace failure as a learning opportunity.",
    "Practice gratitude daily to improve your outlook.",
    "Visualize your success to stay motivated.",
    "Surround yourself with positive influences.",
    "Challenge negative self-talk actively.",
    "Stay curious and keep learning.",
    "Be patient with your progress.",
    "Celebrate small wins along the way.",
  ],
  success: [
    "Consistency beats intensity in the long run.",
    "Focus on progress, not perfection.",
    "Set SMART goals to guide your efforts.",
    "Build habits that support your objectives.",
    "Network with people who inspire you.",
    "Learn from mentors and role models.",
    "Stay adaptable to changing circumstances.",
    "Keep a long-term vision in mind.",
    "Manage your time effectively.",
    "Reflect regularly on your achievements and setbacks.",
  ],
  health: [
    "Drink plenty of water throughout the day.",
    "Get at least 7-8 hours of sleep each night.",
    "Incorporate physical activity into your routine.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Take breaks to stretch during long work sessions.",
    "Practice mindfulness or meditation daily.",
    "Limit your intake of processed foods.",
    "Avoid excessive caffeine and sugar.",
    "Schedule regular health check-ups.",
    "Maintain good posture to prevent pain.",
  ],
  creativity: [
    "Keep a journal to capture your ideas.",
    "Explore new hobbies to stimulate creativity.",
    "Take time to daydream and let your mind wander.",
    "Collaborate with others to gain new perspectives.",
    "Set aside time for creative activities regularly.",
    "Break routine to spark fresh ideas.",
    "Use mind maps to organize your thoughts.",
    "Seek inspiration from art, music, and nature.",
    "Don’t fear making mistakes in creative work.",
    "Reflect on your creative process to improve.",
  ],
  learning: [
    "Set specific learning goals for each session.",
    "Use active recall to enhance memory retention.",
    "Teach others what you’ve learned to deepen understanding.",
    "Take regular breaks to avoid burnout.",
    "Use a variety of resources like books, videos, and podcasts.",
    "Practice spaced repetition for long-term retention.",
    "Stay curious and ask questions.",
    "Apply what you learn in real-world situations.",
    "Join study groups or learning communities.",
    "Review and summarize your notes regularly.",
  ],
  motivation: [
    "Remind yourself why you started.",
    "Break big goals into smaller, manageable tasks.",
    "Create a vision board to visualize success.",
    "Reward yourself for completing tasks.",
    "Stay positive even when facing setbacks.",
    "Find a motivational quote that resonates with you.",
    "Keep track of your progress visually.",
    "Surround yourself with supportive people.",
    "Listen to uplifting music or podcasts.",
    "Focus on what you can control.",
  ],
  communication: [
    "Listen actively and attentively.",
    "Be clear and concise in your messages.",
    "Ask questions to ensure understanding.",
    "Use positive body language.",
    "Practice empathy in conversations.",
    "Give constructive feedback kindly.",
    "Avoid interrupting others while they speak.",
    "Tailor your communication style to your audience.",
    "Use stories to make your points memorable.",
    "Follow up to confirm agreements and actions.",
  ],
  leadership: [
    "Lead by example in all situations.",
    "Communicate your vision clearly.",
    "Empower others to take initiative.",
    "Provide regular and honest feedback.",
    "Encourage collaboration and teamwork.",
    "Be open to new ideas and change.",
    "Recognize and celebrate team achievements.",
    "Develop your emotional intelligence.",
    "Make decisions confidently and timely.",
    "Invest in your personal growth continuously.",
  ],
  focus: [
    "Eliminate multitasking to improve concentration.",
    "Set specific time blocks for focused work.",
    "Use noise-cancelling headphones if needed.",
    "Keep a to-do list to stay organized.",
    "Practice deep breathing to reduce stress.",
    "Limit social media use during work hours.",
    "Create a distraction-free workspace.",
    "Prioritize tasks by importance and urgency.",
    "Take short breaks to maintain energy.",
    "Reflect on your focus patterns and adjust.",
  ],
};

function mockTipFromPrompt(prompt, category) {
  if (category && tipsDatabase[category]) {
    return tipsDatabase[category][Math.floor(Math.random() * tipsDatabase[category].length)];
  }
  if (prompt.includes("productivity")) return tipsDatabase.productivity[Math.floor(Math.random() * tipsDatabase.productivity.length)];
  if (prompt.includes("mindset")) return tipsDatabase.mindset[Math.floor(Math.random() * tipsDatabase.mindset.length)];
  if (prompt.includes("success")) return tipsDatabase.success[Math.floor(Math.random() * tipsDatabase.success.length)];
  return "Stay consistent and believe in your process.";
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const prompt = getPrompt();
  const category = req.query.category || null;
  const tip = mockTipFromPrompt(prompt, category);
  res.status(200).json({ tip });
}
