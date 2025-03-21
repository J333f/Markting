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

// Language Selector Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language selector dropdown
    const languageSelector = document.querySelector('.language-selector');
    const selectedLanguage = document.querySelector('.selected-language');
    
    if (languageSelector && selectedLanguage) {
        // Open/close language dropdown
        selectedLanguage.addEventListener('click', function(e) {
            e.stopPropagation();
            languageSelector.classList.toggle('active');
        });
        
        // Handle language selection
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const flagSrc = this.querySelector('.flag-icon').getAttribute('src');
                const langText = this.querySelector('span').textContent;
                
                // Update selected language
                selectedLanguage.querySelector('.flag-icon').setAttribute('src', flagSrc);
                selectedLanguage.querySelector('span').textContent = langText;
                
                // Save language preference
                localStorage.setItem('preferredLanguage', lang);
                
                // Translate the page content
                translatePage(lang);
                
                // Close dropdown
                languageSelector.classList.remove('active');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageSelector.classList.remove('active');
        });
        
        // Load saved language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            const option = document.querySelector(`.language-option[data-lang="${savedLang}"]`);
            if (option) {
                const flagSrc = option.querySelector('.flag-icon').getAttribute('src');
                const langText = option.querySelector('span').textContent;
                
                selectedLanguage.querySelector('.flag-icon').setAttribute('src', flagSrc);
                selectedLanguage.querySelector('span').textContent = langText;
                
                // Translate the page
                translatePage(savedLang);
            }
        }
    }
});

// Translations data
const trans = {
    "en": {
        "nav_home": "Home",
        "nav_about": "About",
        "nav_features": "Features",
        "nav_pricing": "Pricing Plans",
        "nav_faq": "FAQ",
        "nav_team": "The Team",
        "nav_meetings": "Meetings",
        "nav_docs": "Documentations",
        "hero_title": "Intelligent Employee Scheduling",
        "hero_subtitle": "Streamline your workforce management with smart scheduling solutions",
        "hero_cta": "Try Us Now",
        "about_title": "About EmpRoster",
        "features_title": "Our Main Services",
        "service_1": "Smart Scheduling",
        "service_1_desc": "AI-powered scheduling to manage your workforce effortlessly.",
        "service_2": "Shift Management",
        "service_2_desc": "Assign and swap shifts easily with real-time updates.",
        "service_3": "Performance Insights",
        "service_3_desc": "Track and analyze employee performance seamlessly.",
        "pricing_title": "Pricing Plans",
        "pricing_subtitle": "Choose the perfect plan for your business needs",
        "pricing_basic": "Basic Plan",
        "pricing_advanced": "Advanced Plan",
        "pricing_premium": "Premium Plan",
        "pricing_enterprise": "Enterprise",
        "pricing_trial": "Start Your Free Trial",
        "buy_plan": "Buy Plan Now",
        "contact_us": "Contact us",
        "contact_modal_title": "How would you like to contact us?",
        "contact_whatsapp": "WhatsApp",
        "contact_chat": "Chat Now",
        // Learn More page translations
        "learn_more_title": "How EmpRoster Helps",
        "learn_more_intro": "EmpRoster is designed to streamline your workforce management with intelligent features that save time, reduce errors, and improve overall team coordination. Below are some key ways our system helps organizations of all sizes optimize their employee scheduling processes.",
        "benefit_1_title": "Automated Scheduling",
        "benefit_1_desc": "Reduces manual effort by auto-generating optimized schedules based on availability and workload. The system considers employee preferences, skill sets, labor regulations, and business requirements to create optimal schedules in minutes instead of hours.",
        "benefit_2_title": "Real-Time Updates",
        "benefit_2_desc": "Keeps employees informed of schedule changes instantly via notifications. Whether it's a shift change, new assignment, or urgent request, everyone stays in the loop with immediate mobile and email alerts, reducing confusion and missed shifts.",
        "benefit_3_title": "Shift Management",
        "benefit_3_desc": "Allows easy swapping, requesting changes, and managing time-off requests. Employees can initiate shift trades that managers can approve with a single click, while time-off requests are automatically checked against staffing requirements before approval.",
        "benefit_4_title": "Collaboration Tools",
        "benefit_4_desc": "Provides communication features for seamless coordination between team members and management. Built-in messaging, announcement boards, and team calendars ensure everyone stays connected and can quickly resolve scheduling issues without lengthy email chains or phone calls.",
        "benefit_5_title": "Integration with Payroll & HR Systems",
        "benefit_5_desc": "Ensures accurate time tracking and reduces payroll errors. EmpRoster seamlessly connects with your existing HR and payroll software to automatically transfer worked hours, overtime, and leave data, eliminating manual data entry and reducing costly payroll mistakes.",
        "benefit_6_title": "Mobile Accessibility",
        "benefit_6_desc": "Lets employees check schedules and make requests from anywhere. Our responsive web design and native mobile apps for iOS and Android give your team 24/7 access to their schedules, time-off balances, and communication tools, whether they're at home or on the go.",
        "back_button": "Back to Home",
        // Payment page translations
        "payment_title": "Complete Your Purchase",
        "payment_subtitle": "Please provide your payment details to continue",
        "plan_name": "Plan: ",
        "plan_includes": "Includes all features and benefits",
        "per_user_monthly": "per user per month",
        "credit_card": "Credit Card",
        "full_name": "Full Name",
        "enter_full_name": "Enter your full name",
        "email_address": "Email Address",
        "enter_email": "Enter your email address",
        "card_details": "Card Details",
        "card_number": "Card number",
        "expiry_date": "MM/YY",
        "cvc": "CVC",
        "billing_address": "Billing Address",
        "enter_address": "Enter your billing address",
        "company_name": "Company Name (Optional)",
        "enter_company": "Enter your company name",
        "complete_payment": "Complete Payment",
        "back_to_pricing": "← Back to Pricing Plans",
        "qr_payment": "QR Payment",
        "scan_qr": "Scan QR Code to Pay",
        "qr_instructions": "Use your mobile banking app or e-wallet to scan this QR code and complete the payment.",
        "supported_apps": "Supported apps:"
    },
    "zh": {
        "nav_home": "首页",
        "nav_about": "关于我们",
        "nav_features": "功能特点",
        "nav_pricing": "价格方案",
        "nav_faq": "常见问题",
        "nav_team": "团队成员",
        "nav_meetings": "会议记录",
        "nav_docs": "文档资料",
        "hero_title": "智能员工排班系统",
        "hero_subtitle": "通过智能排班解决方案简化您的劳动力管理",
        "hero_cta": "立即体验",
        "about_title": "关于 EmpRoster",
        "features_title": "我们的主要服务",
        "service_1": "智能排班",
        "service_1_desc": "人工智能驱动的排班系统，轻松管理您的团队。",
        "service_2": "班次管理",
        "service_2_desc": "轻松分配和交换班次，实时更新。",
        "service_3": "绩效洞察",
        "service_3_desc": "无缝追踪和分析员工绩效。",
        "pricing_title": "价格方案",
        "pricing_subtitle": "选择适合您业务需求的完美方案",
        "pricing_basic": "基础方案",
        "pricing_advanced": "进阶方案",
        "pricing_premium": "高级方案",
        "pricing_enterprise": "企业定制",
        "pricing_trial": "开始免费试用",
        "buy_plan": "立即购买",
        "contact_us": "联系我们",
        "contact_modal_title": "您想如何联系我们？",
        "contact_whatsapp": "WhatsApp咨询",
        "contact_chat": "立即聊天",
        // Learn More page translations
        "learn_more_title": "EmpRoster 如何帮助您",
        "learn_more_intro": "EmpRoster 旨在通过智能功能简化您的劳动力管理，节省时间，减少错误，并改善整体团队协调。以下是我们的系统帮助各种规模组织优化员工排班流程的一些关键方式。",
        "benefit_1_title": "自动排班",
        "benefit_1_desc": "通过根据可用性和工作量自动生成优化的排班表来减少人工工作。系统考虑员工偏好、技能组合、劳动法规和业务需求，在几分钟内（而不是几小时）创建最佳排班表。",
        "benefit_2_title": "实时更新",
        "benefit_2_desc": "通过通知立即让员工了解排班变更。无论是班次变更、新任务分配还是紧急请求，每个人都能通过即时移动和电子邮件提醒保持更新，减少混淆和漏班情况。",
        "benefit_3_title": "班次管理",
        "benefit_3_desc": "允许轻松交换、请求更改和管理休假请求。员工可以发起班次交易，经理可以一键批准，同时休假请求在批准前会自动与人员配置需求进行核对。",
        "benefit_4_title": "协作工具",
        "benefit_4_desc": "提供沟通功能，实现团队成员和管理层之间的无缝协调。内置消息、公告板和团队日历确保每个人保持联系，并能快速解决排班问题，无需冗长的电子邮件或电话。",
        "benefit_5_title": "与薪资和人力资源系统集成",
        "benefit_5_desc": "确保准确的时间跟踪并减少薪资错误。EmpRoster 与您现有的人力资源和薪资软件无缝连接，自动传输工作时间、加班和休假数据，消除手动数据输入并减少代价高昂的薪资错误。",
        "benefit_6_title": "移动端访问",
        "benefit_6_desc": "让员工可以随时随地查看排班和提出请求。我们的响应式网页设计和适用于 iOS 和 Android 的原生移动应用程序，让您的团队无论是在家还是在外出时，都能全天候访问他们的排班、休假余额和通信工具。",
        "back_button": "返回首页",
        // Payment page translations
        "payment_title": "完成您的购买",
        "payment_subtitle": "请提供您的支付详情以继续",
        "plan_name": "计划: ",
        "plan_includes": "包含所有功能和权益",
        "per_user_monthly": "每用户每月",
        "credit_card": "信用卡",
        "full_name": "全名",
        "enter_full_name": "输入您的全名",
        "email_address": "电子邮件地址",
        "enter_email": "输入您的电子邮件地址",
        "card_details": "卡详情",
        "card_number": "卡号",
        "expiry_date": "月/年",
        "cvc": "安全码",
        "billing_address": "账单地址",
        "enter_address": "输入您的账单地址",
        "company_name": "公司名称（可选）",
        "enter_company": "输入您的公司名称",
        "complete_payment": "完成支付",
        "back_to_pricing": "← 返回价格计划",
        "qr_payment": "二维码支付",
        "scan_qr": "扫描二维码支付",
        "qr_instructions": "使用您的移动银行应用或电子钱包扫描此二维码并完成付款。",
        "supported_apps": "支持的应用："
    },
    "ms": {
        "nav_home": "Laman Utama",
        "nav_about": "Tentang Kami",
        "nav_features": "Ciri-ciri",
        "nav_pricing": "Pelan Harga",
        "nav_faq": "FAQ",
        "nav_team": "Pasukan",
        "nav_meetings": "Mesyuarat",
        "nav_docs": "Dokumentasi",
        "hero_title": "Penjadualan Pekerja Pintar",
        "hero_subtitle": "Permudahkan pengurusan tenaga kerja dengan solusi penjadualan pintar",
        "hero_cta": "Cuba Sekarang",
        "about_title": "Tentang EmpRoster",
        "features_title": "Perkhidmatan Utama Kami",
        "service_1": "Penjadualan Pintar",
        "service_1_desc": "Penjadualan berteknologi AI untuk menguruskan tenaga kerja dengan mudah.",
        "service_2": "Pengurusan Shift",
        "service_2_desc": "Tetapkan dan tukar shift dengan mudah secara semasa.",
        "service_3": "Analisis Prestasi",
        "service_3_desc": "Pantau dan analisis prestasi pekerja dengan lancar.",
        "pricing_title": "Pelan Harga",
        "pricing_subtitle": "Pilih pelan yang sempurna untuk keperluan perniagaan anda",
        "pricing_basic": "Pelan Asas",
        "pricing_advanced": "Pelan Lanjutan",
        "pricing_premium": "Pelan Premium",
        "pricing_enterprise": "Perusahaan",
        "pricing_trial": "Mulakan Percubaan Percuma Anda",
        "buy_plan": "Beli Pelan Sekarang",
        "contact_us": "Hubungi kami",
        "contact_modal_title": "Bagaimana anda ingin menghubungi kami?",
        "contact_whatsapp": "WhatsApp",
        "contact_chat": "Bual Sekarang",
        // Learn More page translations
        "learn_more_title": "Bagaimana EmpRoster Membantu",
        "learn_more_intro": "EmpRoster direka untuk memudahkan pengurusan tenaga kerja anda dengan ciri-ciri pintar yang menjimatkan masa, mengurangkan kesilapan, dan meningkatkan koordinasi pasukan secara keseluruhan. Berikut adalah beberapa cara utama sistem kami membantu organisasi dari semua saiz mengoptimumkan proses penjadualan pekerja mereka.",
        "benefit_1_title": "Penjadualan Automatik",
        "benefit_1_desc": "Mengurangkan usaha manual dengan menghasilkan jadual yang dioptimumkan secara automatik berdasarkan ketersediaan dan beban kerja. Sistem ini mempertimbangkan keutamaan pekerja, kemahiran, peraturan buruh, dan keperluan perniagaan untuk membuat jadual optimum dalam beberapa minit berbanding beberapa jam.",
        "benefit_2_title": "Kemas Kini Masa Nyata",
        "benefit_2_desc": "Memastikan pekerja dimaklumkan tentang perubahan jadual dengan segera melalui pemberitahuan. Sama ada perubahan shift, tugasan baru, atau permintaan segera, semua orang sentiasa dimaklumkan dengan amaran mudah alih dan e-mel segera, mengurangkan kekeliruan dan shift yang terlepas.",
        "benefit_3_title": "Pengurusan Shift",
        "benefit_3_desc": "Membolehkan penukaran yang mudah, meminta perubahan, dan menguruskan permintaan cuti. Pekerja boleh memulakan pertukaran shift yang pengurus boleh luluskan dengan satu klik, manakala permintaan cuti diperiksa secara automatik terhadap keperluan kakitangan sebelum kelulusan.",
        "benefit_4_title": "Alat Kolaborasi",
        "benefit_4_desc": "Menyediakan ciri komunikasi untuk koordinasi yang lancar antara ahli pasukan dan pengurusan. Pemesejan terbina dalam, papan pengumuman, dan kalendar pasukan memastikan semua orang tetap berhubung dan boleh menyelesaikan masalah penjadualan dengan cepat tanpa rantaian e-mel atau panggilan telefon yang panjang.",
        "benefit_5_title": "Integrasi dengan Sistem Gaji & HR",
        "benefit_5_desc": "Memastikan penjejakan masa yang tepat dan mengurangkan kesilapan gaji. EmpRoster bersambung secara lancar dengan perisian HR dan gaji anda yang sedia ada untuk memindahkan jam bekerja, lebih masa, dan data cuti secara automatik, menghapuskan kemasukan data manual dan mengurangkan kesilapan gaji yang mahal.",
        "benefit_6_title": "Akses Mudah Alih",
        "benefit_6_desc": "Membolehkan pekerja memeriksa jadual dan membuat permintaan dari mana-mana sahaja. Reka bentuk web responsif kami dan aplikasi mudah alih asli untuk iOS dan Android memberikan pasukan anda akses 24/7 kepada jadual mereka, baki cuti, dan alat komunikasi, sama ada mereka di rumah atau dalam perjalanan.",
        "back_button": "Kembali ke Laman Utama",
        // Payment page translations
        "payment_title": "Lengkapkan Pembelian Anda",
        "payment_subtitle": "Sila berikan butiran pembayaran anda untuk meneruskan",
        "plan_name": "Pelan: ",
        "plan_includes": "Termasuk semua ciri dan manfaat",
        "per_user_monthly": "setiap pengguna setiap bulan",
        "credit_card": "Kad Kredit",
        "full_name": "Nama Penuh",
        "enter_full_name": "Masukkan nama penuh anda",
        "email_address": "Alamat E-mel",
        "enter_email": "Masukkan alamat e-mel anda",
        "card_details": "Butiran Kad",
        "card_number": "Nombor kad",
        "expiry_date": "MM/TT",
        "cvc": "CVC",
        "billing_address": "Alamat Pengebilan",
        "enter_address": "Masukkan alamat pengebilan anda",
        "company_name": "Nama Syarikat (Pilihan)",
        "enter_company": "Masukkan nama syarikat anda",
        "complete_payment": "Lengkapkan Pembayaran",
        "back_to_pricing": "← Kembali ke Pelan Harga",
        "qr_payment": "Pembayaran QR",
        "scan_qr": "Imbas Kod QR untuk Membayar",
        "qr_instructions": "Gunakan aplikasi perbankan mudah alih atau e-wallet anda untuk mengimbas kod QR ini dan menyelesaikan pembayaran.",
        "supported_apps": "Aplikasi yang disokong:"
    },
    "ta": {
        "nav_home": "முகப்பு",
        "nav_about": "எங்களைப் பற்றி",
        "nav_features": "அம்சங்கள்",
        "nav_pricing": "விலை திட்டங்கள்",
        "nav_faq": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        "nav_team": "குழு",
        "nav_meetings": "கூட்டங்கள்",
        "nav_docs": "ஆவணங்கள்",
        "hero_title": "புத்திசாலித்தனமான பணியாளர் திட்டமிடல்",
        "hero_subtitle": "புத்திசாலித்தனமான திட்டமிடல் தீர்வுகளுடன் உங்கள் பணியாளர்களை நிர்வகிக்கவும்",
        "hero_cta": "இப்போது முயற்சிக்கவும்",
        "about_title": "EmpRoster பற்றி",
        "features_title": "எங்கள் முக்கிய சேவைகள்",
        "service_1": "புத்திசாலித்தனமான திட்டமிடல்",
        "service_1_desc": "AI-ஆல் இயக்கப்படும் திட்டமிடல் உங்கள் பணியாளர்களை எளிதாக நிர்வகிக்கிறது.",
        "service_2": "ஷிப்ட் மேலாண்மை",
        "service_2_desc": "ஷிப்ட்களை எளிதாக நியமிக்கவும் மாற்றவும் நிகழ்நேர புதுப்பிப்புகளுடன்.",
        "service_3": "செயல்திறன் பகுப்பாய்வு",
        "service_3_desc": "பணியாளர்களின் செயல்திறனை தடையற்ற கண்காணிப்பு மற்றும் பகுப்பாய்வு.",
        "pricing_title": "விலை திட்டங்கள்",
        "pricing_subtitle": "உங்கள் வணிக தேவைகளுக்கான சரியான திட்டத்தைத் தேர்வுசெய்க",
        "pricing_basic": "அடிப்படை திட்டம்",
        "pricing_advanced": "மேம்பட்ட திட்டம்",
        "pricing_premium": "பிரீமியம் திட்டம்",
        "pricing_enterprise": "எண்டர்பிரைஸ்",
        "pricing_trial": "உங்கள் இலவச சோதனையைத் தொடங்குங்கள்",
        "buy_plan": "திட்டத்தை இப்போது வாங்குங்கள்",
        "contact_us": "எங்களை தொடர்பு கொள்ள",
        "contact_modal_title": "எப்படி எங்களை தொடர்பு கொள்ள விரும்புகிறீர்கள்?",
        "contact_whatsapp": "வாட்ஸ்அப்",
        "contact_chat": "இப்போது அரட்டை",
        // Learn More page translations
        "learn_more_title": "EmpRoster எவ்வாறு உதவுகிறது",
        "learn_more_intro": "EmpRoster என்பது நேரத்தை சேமிக்கும், பிழைகளைக் குறைக்கும் மற்றும் ஒட்டுமொத்த குழு ஒருங்கிணைப்பை மேம்படுத்தும் புத்திசாலித்தனமான அம்சங்களுடன் உங்கள் பணியாளர் நிர்வாகத்தை எளிதாக்குவதற்காக வடிவமைக்கப்பட்டுள்ளது. அனைத்து அளவிலான நிறுவனங்களும் தங்கள் பணியாளர் திட்டமிடல் செயல்முறைகளை உகந்ததாக்க எங்கள் அமைப்பு உதவும் சில முக்கிய வழிகள் கீழே உள்ளன.",
        "benefit_1_title": "தானியங்கி திட்டமிடல்",
        "benefit_1_desc": "கிடைக்கக்கூடிய நேரம் மற்றும் பணிச்சுமை அடிப்படையில் உகந்த அட்டவணைகளை தானாகவே உருவாக்குவதன் மூலம் கைமுறை முயற்சியைக் குறைக்கிறது. சிஸ்டம் பணியாளர்களின் விருப்பங்கள், திறன் தொகுப்புகள், தொழிலாளர் விதிமுறைகள் மற்றும் வணிகத் தேவைகளைக் கருத்தில் கொண்டு, மணிக்கணக்கில் இல்லாமல் நிமிடங்களில் சிறந்த அட்டவணைகளை உருவாக்குகிறது.",
        "benefit_2_title": "ரியல்-டைம் புதுப்பிப்புகள்",
        "benefit_2_desc": "அறிவிப்புகள் மூலம் அட்டவணை மாற்றங்களைப் பற்றி பணியாளர்களுக்கு உடனடியாகத் தெரிவிக்கிறது. ஒரு ஷிஃப்ட் மாற்றம், புதிய பணி ஒதுக்கீடு அல்லது அவசர கோரிக்கை என்றாலும், அனைவரும் உடனடி மொபைல் மற்றும் மின்னஞ்சல் எச்சரிக்கைகளுடன் தொடர்பில் இருப்பதால், குழப்பம் மற்றும் தவறவிட்ட ஷிஃப்ட்கள் குறைகின்றன.",
        "benefit_3_title": "ஷிஃப்ட் மேலாண்மை",
        "benefit_3_desc": "ஷிஃப்ட்களை எளிதாக மாற்றுவதற்கும், மாற்றங்களைக் கோருவதற்கும், விடுப்புக் கோரிக்கைகளை நிர்வகிப்பதற்கும் அனுமதிக்கிறது. மேலாளர்கள் ஒரே கிளிக்கில் ஒப்புதல் அளிக்கக்கூடிய ஷிஃப்ட் பரிமாற்றங்களை பணியாளர்கள் தொடங்கலாம், அதே நேரத்தில் விடுப்புக் கோரிக்கைகள் ஒப்புதலுக்கு முன் பணியாளர்களின் தேவைகளுக்கு எதிராக தானாகவே சரிபார்க்கப்படுகின்றன.",
        "benefit_4_title": "ஒத்துழைப்பு கருவிகள்",
        "benefit_4_desc": "குழு உறுப்பினர்கள் மற்றும் மேலாண்மைக்கு இடையே தடையற்ற ஒருங்கிணைப்புக்கான தகவல்தொடர்பு அம்சங்களை வழங்குகிறது. உள்ளமைக்கப்பட்ட செய்தி, அறிவிப்புப் பலகைகள் மற்றும் குழு காலண்டர்கள் அனைவரும் இணைந்திருப்பதை உறுதிசெய்து, நீண்ட மின்னஞ்சல் சங்கிலிகள் அல்லது தொலைபேசி அழைப்புகள் இல்லாமல் அட்டவணை சிக்கல்களை விரைவாகத் தீர்க்க முடியும்.",
        "benefit_5_title": "சம்பளப்பட்டியல் & மனித வள அமைப்புகளுடன் ஒருங்கிணைப்பு",
        "benefit_5_desc": "துல்லியமான நேர கண்காணிப்பை உறுதிசெய்து சம்பளப்பட்டியல் பிழைகளைக் குறைக்கிறது. உங்கள் தற்போதைய HR மற்றும் சம்பளப்பட்டியல் மென்பொருளுடன் EmpRoster தடையற்று இணைக்கப்பட்டு, வேலை செய்த மணிநேரம், கூடுதல் நேரம் மற்றும் விடுப்பு தரவை தானாகவே பரிமாற்றம் செய்து, கைமுறை தரவு உள்ளீட்டை அகற்றி, விலையுயர்ந்த சம்பளப்பட்டியல் தவறுகளைக் குறைக்கிறது.",
        "benefit_6_title": "மொபைல் அணுகல்",
        "benefit_6_desc": "பணியாளர்கள் எங்கிருந்தும் அட்டவணைகளைச் சரிபார்க்கவும் கோரிக்கைகளை விடுக்கவும் அனுமதிக்கிறது. எங்கள் பதிலளிக்கும் வலை வடிவமைப்பு மற்றும் iOS மற்றும் Android க்கான நேட்டிவ் மொபைல் ஆப்ஸ் உங்கள் குழுவிற்கு 24/7 அணுகலை வழங்குகிறது, அவர்கள் வீட்டில் இருந்தாலும் அல்லது வெளியில் இருந்தாலும், அவர்களின் அட்டவணைகள், விடுப்பு இருப்புகள் மற்றும் தொடர்பு கருவிகளை அணுகலாம்.",
        "back_button": "முகப்புக்குத் திரும்பு",
        // Payment page translations
        "payment_title": "உங்கள் கொள்முதலை முடிக்கவும்",
        "payment_subtitle": "தொடர உங்கள் கட்டண விவரங்களை வழங்கவும்",
        "plan_name": "திட்டம்: ",
        "plan_includes": "அனைத்து அம்சங்களும் நன்மைகளும் அடங்கும்",
        "per_user_monthly": "பயனர் ஒருவருக்கு மாதம்",
        "credit_card": "கிரெடிட் கார்டு",
        "full_name": "முழு பெயர்",
        "enter_full_name": "உங்கள் முழு பெயரை உள்ளிடவும்",
        "email_address": "மின்னஞ்சல் முகவரி",
        "enter_email": "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
        "card_details": "கார்டு விவரங்கள்",
        "card_number": "கார்டு எண்",
        "expiry_date": "MM/YY",
        "cvc": "CVC",
        "billing_address": "பில்லிங் முகவரி",
        "enter_address": "உங்கள் பில்லிங் முகவரியை உள்ளிடவும்",
        "company_name": "நிறுவன பெயர் (விருப்பம்)",
        "enter_company": "உங்கள் நிறுவனத்தின் பெயரை உள்ளிடவும்",
        "complete_payment": "கட்டணத்தை முடிக்கவும்",
        "back_to_pricing": "← விலை திட்டங்களுக்குத் திரும்பவும்",
        "qr_payment": "QR பணம் செலுத்துதல்",
        "scan_qr": "பணம் செலுத்த QR குறியீட்டை ஸ்கேன் செய்யவும்",
        "qr_instructions": "இந்த QR குறியீட்டை ஸ்கேன் செய்து கட்டணத்தை முடிக்க உங்கள் மொபைல் வங்கி செயலி அல்லது மின்-பணப்பையைப் பயன்படுத்தவும்.",
        "supported_apps": "ஆதரிக்கப்படும் பயன்பாடுகள்:"
    }
};

// Helper function to get language name
function getLangName(langCode) {
    const langNames = {
        'en': 'English',
        'zh': '中文',
        'ms': 'Bahasa Melayu',
        'ta': 'தமிழ்'
    };
    return langNames[langCode] || langCode;
}

// Function to translate the page
function translatePage(lang) {
    document.documentElement.lang = lang;
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (trans[lang] && trans[lang][key]) {
            element.textContent = trans[lang][key];
        }
    });
    
    // Translate placeholder texts for inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (trans[lang] && trans[lang][key]) {
            element.placeholder = trans[lang][key];
        }
    });
    
    // Handle special cases for payment page
    if (window.location.pathname.includes('payment.html')) {
        // Update plan name if exists
        const planNameEl = document.getElementById('planName');
        if (planNameEl) {
            const urlParams = new URLSearchParams(window.location.search);
            const planName = urlParams.get('plan');
            if (planName) {
                planNameEl.textContent = planName;
            }
        }
    }
    
    // Update UI with the selected language
    const selectedLang = document.querySelector('.selected-language');
    if (selectedLang) {
        selectedLang.innerHTML = `
            <img src="images/flags/${lang}.svg" alt="${lang}" class="flag-icon">
            <span>${getLangName(lang)}</span>
            <svg viewBox="0 0 24 24" class="dropdown-arrow" width="16" height="16">
                <path d="M7 10l5 5 5-5z" fill="currentColor"></path>
            </svg>
        `;
    }
}

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation ScrollSpy
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Chatbot elements
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Contact Modal elements
    const contactUsBtn = document.getElementById('contactUsBtn');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    const contactChatbotBtn = document.getElementById('contactChatbotBtn');
    
    // Contact Modal functionality
    if (contactUsBtn && contactModal && closeModal) {
        contactUsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        closeModal.addEventListener('click', function() {
            contactModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close when clicking outside the modal
        window.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                contactModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // If Chat Now option is clicked, open chatbot
        if (contactChatbotBtn && chatbotPanel) {
            contactChatbotBtn.addEventListener('click', function(e) {
                e.preventDefault();
                contactModal.style.display = 'none';
                chatbotPanel.classList.add('active');
                document.body.style.overflow = 'auto';
            });
        }
    }
    
    // Existing Chatbot functionality
    if (chatbotButton && chatbotPanel) {
        chatbotButton.addEventListener('click', function() {
            chatbotPanel.classList.add('active');
        });
    }
    
    if (chatbotClose && chatbotPanel) {
        chatbotClose.addEventListener('click', function() {
            chatbotPanel.classList.remove('active');
        });
    }
    
    // ... rest of your existing code
}); 