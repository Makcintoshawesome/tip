let tips = [
  { id: 1, category: 'life', text: "Take short breaks to reset your focus and boost productivity." },
  { id: 2, category: 'business', text: "Start your day by tackling the hardest task first — it builds momentum." },
  { id: 3, category: 'mindset', text: "Success comes from consistency, not intensity." },
  { id: 4, category: 'mindset', text: "Focus on progress, not perfection." },
  { id: 5, category: 'business', text: "Use the 80/20 rule: 80% of results come from 20% of your efforts." },
  { id: 6, category: 'life', text: "Block distractions by working in focused 25-minute sprints (Pomodoro Technique)." },
  { id: 7, category: 'mindset', text: "Replace 'I have to' with 'I get to' — mindset shifts everything." },
  { id: 8, category: 'business', text: "Review your goals weekly to stay aligned with your long-term vision." },
  { id: 9, category: 'life', text: "Celebrate small wins — they fuel motivation." },
  { id: 10, category: 'mindset', text: "Don’t multitask. Focus on one thing and do it well." },
];

function getTips() {
  return tips;
}

function getTipById(id) {
  return tips.find(tip => tip.id === id);
}

function addTip(category, text) {
  const newTip = {
    id: tips.length ? tips[tips.length - 1].id + 1 : 1,
    category,
    text,
  };
  tips.push(newTip);
  return newTip;
}

function updateTip(id, category, text) {
  const index = tips.findIndex(tip => tip.id === id);
  if (index === -1) return null;
  tips[index] = { id, category, text };
  return tips[index];
}

function deleteTip(id) {
  const index = tips.findIndex(tip => tip.id === id);
  if (index === -1) return false;
  tips.splice(index, 1);
  return true;
}

module.exports = {
  getTips,
  getTipById,
  addTip,
  updateTip,
  deleteTip,
};
