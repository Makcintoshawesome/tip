let prompt = "Give me a smart, concise tip related to productivity, mindset, or success.";
let categories = [
  'productivity',
  'mindset',
  'success',
  'health',
  'creativity',
  'learning',
  'motivation',
  'communication',
  'leadership',
  'focus',
];

export function getPrompt() {
  return prompt;
}

export function setPrompt(newPrompt) {
  prompt = newPrompt;
}

export function getCategories() {
  return categories;
}

export function setCategories(newCategories) {
  categories = newCategories;
}
