let promptConfig = {
  general: "Give me a smart, concise tip related to productivity, mindset, or success.",
  productivity: "Give me a smart, concise tip related to productivity.",
  mindset: "Give me a smart, concise tip related to mindset.",
  business: "Give me a smart, concise tip related to business.",
};

function getPrompt(category) {
  return promptConfig[category] || promptConfig.general;
}

function setPrompt(category, prompt) {
  if (promptConfig[category]) {
    promptConfig[category] = prompt;
    return true;
  }
  return false;
}

export { getPrompt, setPrompt };
