/**
 * Blooming Oasis - Main JavaScript
 * Handles Quiz, Date/Time, Contact Modal, and Chat Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Display Current Date and Time
    const updateDateTime = () => {
        const dateTimeElement = document.querySelectorAll('#current-date-time');
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        dateTimeElement.forEach(el => {
            el.textContent = `Today is ${now.toLocaleDateString(undefined, options)}`;
        });
    };
    updateDateTime();

    // 1.5 Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'shadow-sm');
        } else {
            navbar.classList.remove('scrolled', 'shadow-sm');
        }
    });

    // 2. Plant Matchmaker Quiz Logic
    const findPlantBtn = document.getElementById('find-plant-btn');
    if (findPlantBtn) {
        findPlantBtn.addEventListener('click', () => {
            const sunlight = document.getElementById('sunlight').value;
            const care = document.getElementById('care').value;
            const petFriendly = document.getElementById('pet-friendly').checked;

            const resultContainer = document.getElementById('quiz-result');
            const resultImg = document.getElementById('result-img');
            const resultName = document.getElementById('result-name');
            const resultDesc = document.getElementById('result-desc');

            // Simple recommendation logic
            let plant = {
                name: "Snake Plant",
                img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=400&q=60",
                desc: "Low light and low care? The Snake Plant is perfect for you."
            };

            if (sunlight === 'direct' && care === 'expert') {
                plant = {
                    name: "Fiddle Leaf Fig",
                    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=60",
                    desc: "You have the light and the skill! The Fiddle Leaf will thrive."
                };
            } else if (petFriendly && sunlight === 'low') {
                plant = {
                    name: "Spider Plant",
                    img: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=60",
                    desc: "Safe for pets and thrives in low light."
                };
            } else if (sunlight === 'indirect') {
                plant = {
                    name: "Monstera Deliciosa",
                    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=60",
                    desc: "A classic choice for indirect light spaces."
                };
            }

            resultImg.src = plant.img;
            resultName.textContent = plant.name;
            resultDesc.textContent = plant.desc;
            resultContainer.classList.remove('d-none');
            
            // Scroll to result
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 3. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show Bootstrap Modal
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
            confirmModal.show();
            contactForm.reset();
        });
    }

    // 4. Live Chat Simulation
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat');
    const chatWindow = document.getElementById('chat-window');

    if (sendChatBtn && chatInput) {
        const addMessage = (text, type) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg msg-${type}`;
            msgDiv.textContent = text;
            chatWindow.appendChild(msgDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        };

        const handleChat = () => {
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, 'user');
            chatInput.value = '';

            // Simulated bot response
            setTimeout(() => {
                const responses = [
                    "That's a great question about plant care!",
                    "Most indoor plants love indirect sunlight and watering only when the top inch of soil is dry.",
                    "I recommend checking our Care Guides on the homepage for more specific info.",
                    "Would you like me to recommend a plant for your specific space?",
                    "Remember, overwatering is the #1 killer of houseplants!"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot');
            }, 1000);
        };

        sendChatBtn.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }
});
