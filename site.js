// Smooth scroll from "See Detailed Showcase" button to skills showcase
document.getElementById('showcaseBtn').addEventListener('click', () => {
  document.getElementById('showcase').scrollIntoView({ behavior: 'smooth' });
});

// imprprove user UX by highlighting the current section
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Handle simple AI prompt question submissions and responses
function handlePrompt() {
    // Get user input, trim and lowercase for normalization
  const input = document.getElementById('userPrompt').value.trim().toLowerCase();
  const responseEl = document.getElementById('promptResponse');
  if (!input) {
    responseEl.textContent = "Please type a question.";
    return;
  }
  // Predefined simulated response database
  const responses = {
    'javascript': "JavaScript is a versatile language for web development.",
    'html': "HTML structures the content of web pages.",
    'css': "CSS styles the visuals of web pages.",
    'codewars': "Codewars is a great platform to practice coding challenges."
  };
    // Display matched response or fallback message
  responseEl.textContent = responses[input] || "Sorry, I don't have an answer for that yet.";
}
//pressing Enter in the text input will trigger your handlePrompt() function just like clicking the Submit button
document.getElementById('userPrompt').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // prevent default form submission (if any)
    handlePrompt();          // call the existing function triggered by the button click
  }
});

// Real-time fetching of data
const eventTypeInput = document.getElementById('eventTypeInput');
const locationSelect = document.getElementById('locationSelect');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('searchResults');

const CACHE_KEY = 'dailyEvents';
const CACHE_DATE_KEY = 'dailyEventsDate';

const allowedCities = ['london', 'oxford', 'manchester', 'birmingham', 'cardiff'];

async function loadDailyResults() {
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData && cachedDate === today) {
    try {
      let data = JSON.parse(cachedData);
      // Filter to allowed cities and todays date
      data = data.filter(ev => allowedCities.includes(ev.location.toLowerCase()) && ev.date === today);
      console.log('Loaded events from cache filtered to cities & date');
      return data;
    } catch {
      // Ignore corrupted cache => fallback to fresh fetch
    }
  }

  try {
    const response = await fetch('daily-results.json');
    if (!response.ok) throw new Error('Failed to load daily results');
    let data = await response.json();

    // Filter data to allowed cities & today only
    data = data.filter(ev => allowedCities.includes(ev.location.toLowerCase()) && ev.date === today);

    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_DATE_KEY, today);

    console.log('Fetched and cached fresh daily results filtered to cities & date');
    return data;
  } catch (error) {
    resultsDiv.textContent = `Error loading events: ${error.message}`;
    return [];
  }
}

function displayResults(results) {
  if (!results || results.length === 0) {
    resultsDiv.innerHTML = '<p>No events match your criteria.</p>';
    return;
  }

  resultsDiv.innerHTML = results.map(ev => `
    <div class="event-result">
      <a href="${ev.url}" target="_blank" rel="noopener noreferrer">${ev.title}</a>
      <p>
        ${ev.type.charAt(0).toUpperCase() + ev.type.slice(1)} in ${ev.location.charAt(0).toUpperCase() + ev.location.slice(1)}
        <br><strong>Source:</strong> ${ev.source}
      </p>
    </div>
  `).join('');
}

async function searchEvents() {
  const allEvents = await loadDailyResults();// already filtered by today inside
  const location = locationSelect.value.trim().toLowerCase();
  const keywordsRaw = eventTypeInput.value.trim().toLowerCase();

  let filtered = allEvents;

  if (location) {
    filtered = filtered.filter(ev => ev.location === location);
  }
  if (keywordsRaw) {
    const keywords = keywordsRaw.split(',').map(k => k.trim()).filter(Boolean);
    if (keywords.length > 0) {
      filtered = filtered.filter(ev =>
        keywords.some(kw =>
          ev.type.includes(kw) || ev.title.toLowerCase().includes(kw)
        )
      );
    }
  }

  if (!location && !keywordsRaw) {
    // Show first 5 results and prompt message
    filtered = filtered.slice(0, 5);
    displayResults(filtered);
    resultsDiv.innerHTML += `<p><em>Showing sample events for today. For better results, try selecting a location or typing event keywords.</em></p>`;
    return;
  }

  if (filtered.length === 0) {
    resultsDiv.innerHTML = '<p>No events match your criteria.</p>';
    return;
  }

  displayResults(filtered);
}

searchButton.addEventListener('click', searchEvents);

// Optionally trigger search on page load to show all today's events
window.addEventListener('load', searchEvents);


// ---- Event listener for generating joke button
document.getElementById('jokeBtn').addEventListener('click', () => {
  const jokeDisplay = document.getElementById('jokeDisplay');
  // Random bad joke generator
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "What's orange and sounds like a parrot? A carrot.",
  "I told my computer I needed a break, and it said 'No problem, I'll go to sleep.'",
  "What do snowmen wear on their heads? Ice caps.",
  "Why did the turkey join the band? Because it had drumsticks!",
  "How does Good King Wenceslas like his pizzas? Deep pan, crisp and even.",
  "What do you call a child who doesn’t believe in Santa? A rebel without a Claus.",
  "What do you get when you cross a snowman with a vampire? Frostbite!",
  "What do snowmen eat for lunch? Iceburgers!",
  "What do Santa’s little helpers learn at school? The elf-abet!",
  "Who is Santa’s favorite singer? Elf-is Presley!",
  "What do cats call an aquarium? A sushi bar.",
  "Why are Christmas trees so bad at sewing? They always drop their needles!",
  "What’s a pirate’s favourite type of YouTube video? ASM-aaaaaarrr!",
  "What do you get if you cross Santa with a duck? A Christmas Quacker!",
  "Why do penguins swim in saltwater? Because pepper makes them sneeze.",
  "What’s the best Christmas present in the world? A broken drum, you just can’t beat it!",
  "What do you call a man who claps at Christmas? Santapplause.",
  "Where do penguins keep their savings? In a snow bank.","Why did the elf bring a ladder? Because the Christmas spirit was high!",
  "What’s Santa’s favorite type of music? Wrap!",
  "Why don’t snowmen ever get lonely? Because they have lots of cool friends!",
  "Why did the reindeer stay calm during the storm? Because it knew how to keep its cool!",
  "What do you call an old snowman? Water!",
  "Why did the Christmas tree go to the barber? It needed a trim-mas!",
  "What do you get when you cross a bell with a skunk? Jingle smells!",
  "Why did the gingerbread man go to school? Because he wanted to be a smart cookie!",
  "What do Santa’s helpers use to clean the floor? A Santa-tizer!",
  "Why did the Christmas cookie go to therapy? It felt crumby!"
];
; // your jokes array

  // Fade out current joke
  jokeDisplay.classList.add('fade-out');

  setTimeout(() => {
    // After fade out, show new joke and fade back in
    const randomIndex = Math.floor(Math.random() * jokes.length);
    jokeDisplay.textContent = jokes[randomIndex];
    jokeDisplay.classList.remove('fade-out');
  }, 600);  // Duration should match CSS transition time
});

// ---- BLOG display code 
const blogCurrent = document.getElementById('currentBlog');
const olderBlogsList = document.getElementById('olderBlogsList');
const blogSelect = document.getElementById('blogSelect');
currentBlog.classList.add('fade-in');

async function loadBlogs() {
  try {
    const response = await fetch('blogs.json');
    if (!response.ok) throw new Error('Failed to load blogs');
    const blogs = await response.json();
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    const current = blogs[0];
    document.getElementById('currentBlog').innerHTML = `<h3>${current.title}</h3><p>${current.content}</p>`;

    const olderBlogsList = document.getElementById('olderBlogsList');
    olderBlogsList.innerHTML = ''; // Clear previous list
    blogs.slice(1, 5).forEach(blog => {
      const li = document.createElement('li');
      li.textContent = `${blog.title} (${blog.date})`;
      li.tabIndex = 0;
      li.style.cursor = 'pointer';
      li.style.padding = '0.5em 0';
      li.style.borderBottom = '1px solid #ddd';
      li.addEventListener('click', () => {
        document.getElementById('currentBlog').innerHTML = `<h3>${blog.title}</h3><p>${blog.content}</p>`;
      });
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') li.click();
      });
      olderBlogsList.appendChild(li);
    });
  } catch (error) {
    document.getElementById('currentBlog').textContent = `Error loading blogs: ${error.message}`;
  }
}
window.addEventListener('load', loadBlogs);

function displayCurrentBlog(blog) {
  if (!blog) {
    blogCurrent.innerHTML = '<p>No blog posts available.</p>';
    return;
  }
  blogCurrent.innerHTML = `
    <h3>${blog.title}</h3>
    <time datetime="${blog.date}">${new Date(blog.date).toLocaleDateString()}</time>
    <div>${blog.content}</div>
  `;
}

function displayOlderBlogs(olderBlogs) {
  olderBlogsList.innerHTML = olderBlogs.map(blog => `
    <li tabindex="0" role="button" aria-pressed="false" data-blog-id="${blog.id}">
      <time datetime="${blog.date}">${new Date(blog.date).toLocaleDateString()}</time> - ${blog.title}
    </li>
  `).join('');

  // Add click and keyboard event to list items to load blog content
  olderBlogsList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => selectBlogById(li.dataset.blogId));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectBlogById(li.dataset.blogId);
      }
    });
  });
}

function populateBlogSelect(blogs) {
  blogSelect.innerHTML = blogs.map(blog => `
    <option value="${blog.id}">
      ${new Date(blog.date).toLocaleDateString()} - ${blog.title}
    </option>
  `).join('');

  // Default to latest blog
  blogSelect.value = blogs[0].id;

  blogSelect.addEventListener('change', () => selectBlogById(blogSelect.value));
}

// Store blogs globally for easy access after fetch
let globalBlogs = [];
async function initBlogs() {
  try {
    const response = await fetch('blogs.json');
    if (!response.ok) throw new Error('Failed to load blogs');
    globalBlogs = await response.json();
    globalBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayCurrentBlog(globalBlogs[0]);
    displayOlderBlogs(globalBlogs.slice(1, 6));
    populateBlogSelect(globalBlogs);
  } catch (e) {
    blogCurrent.innerHTML = `<p>Error loading blogs: ${e.message}</p>`;
  }
}

function selectBlogById(id) {
  const blog = globalBlogs.find(b => b.id.toString() === id.toString());
  if (blog) {
    displayCurrentBlog(blog);
    blogSelect.value = blog.id;
  }
}

// Load blogs on page load
window.addEventListener('load', initBlogs);

// picture gallery code

  // Manually maintained lisy of images with filenames and alt texts
  const folder = "./images/TravelPhotos/";// constant folder path

  const images = [
    { filename: "Portugal Sept 2021.jpg", alt: "Portugal Sept 2021" },
    { filename: "Scottish Highland Winter 2021.jpg", alt: "Scottish Highland Winter 2021" },
    { filename: "Loch Ness Winter 2021.jpg", alt: "Loch Ness Winter 2021" },
    { filename: "Durdle door Summer 2022.jpg", alt: "Durdle door Summer 2022" },
    { filename: "Weymouth Summer 2022.jpg", alt: "Weymouth Summer 2022" }
  ];

  // Select the container div
  const container = document.getElementById("gallery");

  // Loop through the array and add each image to the container
  images.forEach(img => {
    const imageElement = document.createElement("img");
    imageElement.src = folder + img.filename;  // path to folder with your images
    imageElement.alt = img.alt;
    // Optional: add some styling or classes here
    // imageElement.classList.add("your-css-class");
    container.appendChild(imageElement);
  });

