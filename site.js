// Smooth scroll from "See Detailed Showcase" button to skills showcase
document.getElementById('showcaseBtn').addEventListener('click', () => {
  document.getElementById('showcase').scrollIntoView({ behavior: 'smooth' });
});

// Simple AI prompt simulation (demo)
function handlePrompt() {
  const input = document.getElementById('userPrompt').value.trim().toLowerCase();
  const responseEl = document.getElementById('promptResponse');
  if (!input) {
    responseEl.textContent = "Please type a question.";
    return;
  }
  // Example simulated responses
  const responses = {
    'javascript': "JavaScript is a versatile language for web development.",
    'html': "HTML structures the content of web pages.",
    'css': "CSS styles the visuals of web pages.",
    'codewars': "Codewars is a great platform to practice coding challenges."
  };
  responseEl.textContent = responses[input] || "Sorry, I don't have an answer for that yet.";
}

// Real-time filtering of list
document.getElementById('filterInput').addEventListener('input', function() {
  const filter = this.value.toLowerCase();
  const items = document.querySelectorAll('#fruitList li');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(filter) ? '' : 'none';
  });
});

// Random bad joke generator
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "What's orange and sounds like a parrot? A carrot.",
  "I told my computer I needed a break, and it said 'No problem, I'll go to sleep.'"
];

document.getElementById('jokeBtn').addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  document.getElementById('jokeDisplay').textContent = jokes[randomIndex];
});
