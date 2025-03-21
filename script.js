// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event listener to change header background opacity
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(26, 31, 46, 0.95)';
    } else {
        header.style.backgroundColor = '#1a1f2e';
    }
});

// Parallax effect for pricing section
document.addEventListener('DOMContentLoaded', function() {
    const pricingSection = document.querySelector('.pricing');
    
    if (pricingSection) {
        const decorationElements = pricingSection.querySelectorAll('.deco-circle, .deco-dots, .deco-wave, .deco-wave-top, .floating-shape, .grid-pattern');
        const spotlight = document.createElement('div');
        
        // Create and add spotlight effect
        spotlight.classList.add('spotlight-effect');
        pricingSection.appendChild(spotlight);
        
        // Only enable on non-mobile devices
        if (window.innerWidth > 768) {
            pricingSection.addEventListener('mousemove', function(e) {
                // Calculate mouse position relative to the section
                const rect = pricingSection.getBoundingClientRect();
                const mouseX = e.clientX - rect.left; 
                const mouseY = e.clientY - rect.top;
                
                // Percentage positions
                const percentX = mouseX / rect.width;
                const percentY = mouseY / rect.height;
                
                // Calculate position relative to the center
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const offsetX = mouseX - centerX;
                const offsetY = mouseY - centerY;
                
                // Move spotlight to follow mouse
                spotlight.style.opacity = '1';
                spotlight.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, 
                                             rgba(255, 255, 255, 0.03) 0%, 
                                             rgba(0, 150, 94, 0.015) 20%, 
                                             rgba(0, 0, 0, 0) 60%)`;
                
                // Move decoration elements for parallax effect
                decorationElements.forEach((element, index) => {
                    // Different intensity for each element type
                    let intensity = 0.015;
                    
                    if (element.classList.contains('deco-circle')) {
                        intensity = 0.03;
                    } else if (element.classList.contains('deco-wave')) {
                        intensity = 0.01;
                    } else if (element.classList.contains('deco-dots')) {
                        intensity = 0.02;
                    } else if (element.classList.contains('floating-shape')) {
                        intensity = 0.04;
                    } else if (element.classList.contains('grid-pattern')) {
                        intensity = 0.005;
                    }
                    
                    // Apply transform based on mouse position
                    const moveX = -offsetX * intensity * (index % 3 + 1);
                    const moveY = -offsetY * intensity * (index % 2 + 1);
                    
                    // Apply the transform
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    
                    // For circles, add rotation based on mouse position
                    if (element.classList.contains('deco-circle')) {
                        const rotateIntensity = offsetX * 0.02;
                        element.style.transform += ` rotate(${rotateIntensity}deg)`;
                    }
                    
                    // For floating shapes, add scale effect
                    if (element.classList.contains('floating-shape')) {
                        const distanceFromCenter = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
                        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
                        const scale = 1 + (distanceFromCenter / maxDistance) * 0.1;
                        element.style.transform += ` scale(${scale})`;
                    }
                });
            });
            
            // Reset positions when mouse leaves
            pricingSection.addEventListener('mouseleave', function() {
                decorationElements.forEach(element => {
                    element.style.transform = '';
                });
                spotlight.style.opacity = '0';
            });
        }
    }
});

// Add CSS for spotlight effect
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .spotlight-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 0;
        }
        
        .pricing {
            perspective: 1000px;
            transform-style: preserve-3d;
        }
    `;
    document.head.appendChild(style);
});

// Scroll Animation for Elements
document.addEventListener('DOMContentLoaded', function() {
    // 监测滚动并给元素添加动画
    function checkScroll() {
        const elements = document.querySelectorAll('.pricing-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(function(element, index) {
            const positionFromTop = element.getBoundingClientRect().top;
            
            if (positionFromTop - windowHeight <= 0) {
                // 计算延迟以创建级联效果
                const delay = index * 0.15;
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.animation = `fadeInUp 0.6s ease-out ${delay}s forwards`;
            }
        });
    }
    
    // 创建必要的CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .pricing-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // 初始化
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    // 首次加载时检查
    setTimeout(checkScroll, 100);
});

// 可选：添加月度/年度计费切换功能
// 这部分可以在未来实现，用于切换显示月度或年度价格 

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Sample responses for the chatbot
    const botResponses = {
        'default': "I don't quite understand your question. You can ask about employee scheduling, pricing plans, or features.",
        'greeting': ['Hello!', 'Hi, how can I help you?', 'Hello! I\'m happy to assist you.'],
        'pricing': 'We offer multiple pricing plans, starting from SGD 4 per user per month for the basic plan. You can choose a suitable plan based on your business needs. Check our pricing page for more details.',
        'features': 'Our main features include smart scheduling, shift management, and performance analytics. These features can help you optimize employee work hours and improve efficiency.',
        'contact': 'You can contact us at contact@emproster.com or call our customer service hotline at +65-1234-5678.',
        'help': 'I can answer questions about EmpRoster, including features, pricing, and usage. What would you like to know?',
        'thanks': ['You\'re welcome!', 'At your service!', 'Glad I could help!'],
        'schedule': 'With our scheduling system, you can easily arrange employee work hours, manage shift change requests, and access real-time attendance data.',
    };
    
    // Toggle chatbot panel
    chatbotButton.addEventListener('click', function() {
        chatbotPanel.classList.add('active');
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotPanel.classList.remove('active');
    });
    
    // Function to add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        
        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = 'Just now';
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageDiv.appendChild(messageContent);
        
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'message bot-message typing-indicator';
        indicatorDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            indicatorDiv.appendChild(dot);
        }
        
        chatbotMessages.appendChild(indicatorDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        return indicatorDiv;
    }
    
    // Function to get bot response
    function getBotResponse(userInput) {
        userInput = userInput.toLowerCase();
        
        if (userInput.includes('hi') || userInput.includes('hello') || userInput.includes('hey')) {
            return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        } else if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('how much')) {
            return botResponses.pricing;
        } else if (userInput.includes('feature') || userInput.includes('function') || userInput.includes('what can')) {
            return botResponses.features;
        } else if (userInput.includes('contact') || userInput.includes('phone') || userInput.includes('email')) {
            return botResponses.contact;
        } else if (userInput.includes('help') || userInput.includes('how to use')) {
            return botResponses.help;
        } else if (userInput.includes('thank')) {
            return botResponses.thanks[Math.floor(Math.random() * botResponses.thanks.length)];
        } else if (userInput.includes('schedule') || userInput.includes('timetable') || userInput.includes('arrange')) {
            return botResponses.schedule;
        } else {
            return botResponses.default;
        }
    }
    
    // Handle send button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Handle enter key press
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        
        if (userMessage) {
            // Add user message
            addMessage(userMessage, true);
            chatbotInput.value = '';
            
            // Show typing indicator
            const typingIndicator = showTypingIndicator();
            
            // Simulate bot thinking and then respond
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                
                // Add bot response
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse);
                
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
        }
    }
}); 