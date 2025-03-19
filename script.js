// Educational topics and sample questions for quick suggestions
const educationalTopics = {
    'mathematics': ['Can you explain quadratic equations?', 'What is calculus used for?', 'How do I solve systems of linear equations?'],
    'science': ['Can you explain photosynthesis?', 'How does gravity work?', 'What is the periodic table?'],
    'history': ['What caused World War II?', 'Who was Mahatma Gandhi?', 'Explain the Industrial Revolution'],
    'literature': ['Can you analyze Shakespeare\'s Hamlet?', 'What are the themes in To Kill a Mockingbird?', 'Explain the significance of George Orwell\'s 1984'],
    'programming': ['How do I learn Python?', 'Explain object-oriented programming', 'What is the difference between Java and JavaScript?']
};

// Markdown syntax examples for help popup
const markdownExamples = [
    { syntax: '*italic*', description: 'Italic text' },
    { syntax: '**bold**', description: 'Bold text' },
    { syntax: '# Heading', description: 'Heading (level 1-6)' },
    { syntax: '[Link](url)', description: 'Hyperlink' },
    { syntax: '`code`', description: 'Inline code' },
    { syntax: '```\ncode block\n```', description: 'Code block' },
    { syntax: '> quote', description: 'Blockquote' },
    { syntax: '- item', description: 'List item' },
    { syntax: '1. item', description: 'Numbered list' },
    { syntax: '---', description: 'Horizontal rule' }
];

// Store conversation history locally
let chatHistory = [];

// Configure marked options for safer rendering
marked.setOptions({
    breaks: true,  // Add line breaks on single line breaks
    gfm: true,     // Use GitHub Flavored Markdown
    sanitize: false, // Don't sanitize HTML (handled by DOMPurify)
    headerIds: false, // Don't add ids to headers
    mangle: false  // Don't mangle email links
});

// Add event listeners
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize chat when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initial animation for the container
    const container = document.querySelector('.chatbot-container');
    container.classList.add('animate__animated', 'animate__zoomIn');
    
    // Add floating effect to the container after initial animation
    setTimeout(() => {
        container.style.animation = 'floating 4s ease-in-out infinite';
    }, 1000);
    
    // Initialize empty chat (no history persistence)
    ensureWelcomeMessage();
    
    // Add markdown helper toggle
    addMarkdownHelper();
    
    // Add clear chat button
    addClearChatButton();
});

// Add markdown helper toggle button to the input area
function addMarkdownHelper() {
    const chatbotInput = document.querySelector('.chatbot-input');
    
    // Create a container for the markdown helper that will go below the buttons
    const markdownContainer = document.createElement('div');
    markdownContainer.style.width = '100%';
    markdownContainer.style.textAlign = 'right';
    markdownContainer.style.padding = '5px 15px';
    markdownContainer.style.marginTop = '3px';
    
    const markdownHelperLink = document.createElement('div');
    markdownHelperLink.className = 'markdown-helper';
    markdownHelperLink.innerHTML = '<i class="fas fa-markdown"></i> Markdown';
    markdownHelperLink.title = 'Markdown syntax help';
    
    // Improved styling for the markdown button
    markdownHelperLink.style.display = 'inline-flex';
    markdownHelperLink.style.alignItems = 'left';
    markdownHelperLink.style.marginRight = '1.5rem';
    markdownHelperLink.style.gap = '4px';
    markdownHelperLink.style.color = '#4776E6';
    markdownHelperLink.style.fontSize = '0.8rem';
    markdownHelperLink.style.padding = '3px 8px';
    markdownHelperLink.style.borderRadius = '4px';
    markdownHelperLink.style.transition = 'all 0.2s ease';
    markdownHelperLink.style.cursor = 'pointer';
    
    // Add hover effect
    markdownHelperLink.addEventListener('mouseover', () => {
        markdownHelperLink.style.backgroundColor = '#f0f4f8';
        markdownHelperLink.style.color = '#8E54E9';
    });
    
    markdownHelperLink.addEventListener('mouseout', () => {
        markdownHelperLink.style.backgroundColor = 'transparent';
        markdownHelperLink.style.color = '#4776E6';
    });
    
    markdownContainer.appendChild(markdownHelperLink);
    
    // Insert the markdown helper after the chatbot input div
    const knowledgeArea = document.querySelector('.knowledge-area');
    chatbotInput.parentNode.insertBefore(markdownContainer, knowledgeArea);
    
    // Add click listener to show markdown help
    markdownHelperLink.addEventListener('click', showMarkdownHelp);
}

// Show markdown help popup
function showMarkdownHelp() {
    // Create a popup with markdown syntax examples
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.bottom = '100px'; // Position it above the new markdown button location
    popup.style.right = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
    popup.style.borderRadius = '8px';
    popup.style.padding = '15px';
    popup.style.zIndex = '1000';
    popup.style.width = '300px';
    popup.style.maxHeight = '400px';
    popup.style.overflowY = 'auto';
    popup.style.animation = 'fadeIn 0.3s ease';
    popup.style.border = '1px solid #e9ecef';
    
    // Add a small arrow at the bottom pointing to the button
    const arrow = document.createElement('div');
    arrow.style.position = 'absolute';
    arrow.style.bottom = '-10px';
    arrow.style.right = '15px';
    arrow.style.width = '20px';
    arrow.style.height = '10px';
    arrow.style.overflow = 'hidden';
    arrow.innerHTML = '<div style="position:absolute; width:20px; height:20px; background:white; transform:rotate(45deg); top:-10px; left:0; border-right:1px solid #e9ecef; border-bottom:1px solid #e9ecef;"></div>';
    popup.appendChild(arrow);
    
    // Add header
    const header = document.createElement('h4');
    header.textContent = 'Markdown Syntax';
    header.style.margin = '0 0 10px 0';
    header.style.borderBottom = '1px solid #e9ecef';
    header.style.paddingBottom = '8px';
    header.style.fontSize = '1rem';
    header.style.color = '#4776E6';
    popup.appendChild(header);
    
    // Add examples
    const examplesList = document.createElement('table');
    examplesList.style.width = '100%';
    examplesList.style.borderCollapse = 'collapse';
    
    markdownExamples.forEach(example => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #f5f5f5';
        
        const syntaxCell = document.createElement('td');
        syntaxCell.style.padding = '6px 5px';
        syntaxCell.style.fontFamily = 'monospace';
        syntaxCell.style.whiteSpace = 'nowrap';
        syntaxCell.style.color = '#8E54E9';
        syntaxCell.textContent = example.syntax;
        
        const descCell = document.createElement('td');
        descCell.style.padding = '6px 5px';
        descCell.style.fontSize = '0.85rem';
        descCell.textContent = example.description;
        
        row.appendChild(syntaxCell);
        row.appendChild(descCell);
        examplesList.appendChild(row);
    });
    
    popup.appendChild(examplesList);
    
    // Add close button with improved styling
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '6px 12px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.background = 'linear-gradient(135deg, #4776E6, #8E54E9)';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '0.85rem';
    closeButton.style.fontWeight = '500';
    closeButton.style.transition = 'all 0.2s ease';
    closeButton.style.display = 'block';
    closeButton.style.marginLeft = 'auto'; // Push to the right
    
    // Add hover effect to button
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.transform = 'translateY(-2px)';
        closeButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    });
    
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.transform = 'translateY(0)';
        closeButton.style.boxShadow = 'none';
    });
    
    closeButton.onclick = () => popup.remove();
    popup.appendChild(closeButton);
    
    // Add a style tag for the animation
    const styleTag = document.createElement('style');
    styleTag.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }`;
    document.head.appendChild(styleTag);
    
    // Add to body
    document.body.appendChild(popup);
    
    // Close when clicking outside
    document.addEventListener('click', function closePopup(e) {
        if (!popup.contains(e.target) && e.target.className !== 'markdown-helper' && !e.target.closest('.markdown-helper')) {
            popup.remove();
            document.removeEventListener('click', closePopup);
        }
    });
}

// Make sure the welcome message is visible
function ensureWelcomeMessage() {
    const chatbotBody = document.getElementById('chatbot-body');
    if (!chatbotBody.querySelector('.chatbot-message')) {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'chatbot-message chatbot-message-bot animate__animated animate__fadeInLeft';
        welcomeMessage.innerHTML = `
            <p>Hello! I'm EduBot, your AI education assistant. I can help you with subjects like Math, Science, History, Literature, and more. What would you like to learn about today?</p>
            <div class="time-indicator">Just now</div>
        `;
        chatbotBody.appendChild(welcomeMessage);
        
        // Add category chips
        const categoryChips = document.createElement('div');
        categoryChips.className = 'category-chips';
        categoryChips.innerHTML = `
            <div class="category-chip" onclick="suggestTopic('mathematics')"><i class="fas fa-calculator subject-icon"></i>Mathematics</div>
            <div class="category-chip" onclick="suggestTopic('science')"><i class="fas fa-flask subject-icon"></i>Science</div>
            <div class="category-chip" onclick="suggestTopic('history')"><i class="fas fa-landmark subject-icon"></i>History</div>
            <div class="category-chip" onclick="suggestTopic('literature')"><i class="fas fa-book subject-icon"></i>Literature</div>
            <div class="category-chip" onclick="suggestTopic('programming')"><i class="fas fa-code subject-icon"></i>Programming</div>
        `;
        chatbotBody.appendChild(categoryChips);
    }
}

// Add a clear chat button to the chat interface
function addClearChatButton() {
    const chatbotBody = document.getElementById('chatbot-body');
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'history-controls';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.justifyContent = 'flex-end';
    controlsContainer.style.padding = '5px 10px';
    
    // Add clear history button
    const clearChatBtn = document.createElement('button');
    clearChatBtn.textContent = 'Clear Chat';
    clearChatBtn.style.fontSize = '0.75rem';
    clearChatBtn.style.padding = '3px 8px';
    clearChatBtn.style.border = 'none';
    clearChatBtn.style.borderRadius = '4px';
    clearChatBtn.style.backgroundColor = '#f8f9fa';
    clearChatBtn.style.color = '#666';
    clearChatBtn.style.cursor = 'pointer';
    clearChatBtn.onclick = clearChatHistory;
    
    // Add hover effect to button
    clearChatBtn.addEventListener('mouseover', () => {
        clearChatBtn.style.backgroundColor = '#e9ecef';
    });
    clearChatBtn.addEventListener('mouseout', () => {
        clearChatBtn.style.backgroundColor = '#f8f9fa';
    });
    
    controlsContainer.appendChild(clearChatBtn);
    chatbotBody.appendChild(controlsContainer);
}

// Add a date separator for context
function addDateSeparator() {
    const chatbotBody = document.getElementById('chatbot-body');
    
    // Create date separator
    const dateSeparator = document.createElement('div');
    dateSeparator.style.textAlign = 'center';
    dateSeparator.style.margin = '10px 0';
    dateSeparator.style.fontSize = '0.7rem';
    dateSeparator.style.color = '#666';
    
    // Get today's date in a user-friendly format
    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateSeparator.textContent = today.toLocaleDateString(undefined, options);
    
    chatbotBody.appendChild(dateSeparator);
}

// Clear chat history (local only)
function clearChatHistory() {
    // Clear the UI
    const chatbotBody = document.getElementById('chatbot-body');
    chatbotBody.innerHTML = '';
    
    // Reset local history array
    chatHistory = [];
    
    // Show welcome message
    ensureWelcomeMessage();
    
    // Add clear chat button again
    addClearChatButton();
    
    // Show confirmation
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Chat cleared';
    successMessage.style.textAlign = 'center';
    successMessage.style.fontSize = '0.7rem';
    successMessage.style.color = '#666';
    successMessage.style.margin = '5px 0';
    successMessage.style.padding = '5px';
    successMessage.style.backgroundColor = 'rgba(142, 84, 233, 0.1)';
    successMessage.style.borderRadius = '4px';
    
    // Insert before the welcome message
    chatbotBody.insertBefore(successMessage, chatbotBody.firstChild);
    
    // Fade out after a few seconds
    setTimeout(() => {
        successMessage.style.transition = 'opacity 1s ease';
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 1000);
    }, 2000);
}

// User suggestions based on educational topics
function suggestTopic(topic) {
    const questions = educationalTopics[topic];
    if (questions && questions.length > 0) {
        // Pick a random question from the topic
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        // Set the input field with the question
        const input = document.getElementById('chatbot-input');
        input.value = randomQuestion;
        input.focus();
    }
}

// Send message to chatbot
function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (message !== "") {
        // Add to local history
        chatHistory.push({
            role: 'user',
            content: message
        });
        
        appendMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator with animation
        const typingIndicatorId = showTypingIndicator();
        
        // Send the message to the backend
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            hideTypingIndicator(typingIndicatorId);
            
            if (data.error) {
                appendMessage('Error: ' + data.error, 'error');
            } else {
                // Add bot message to local history
                chatHistory.push({
                    role: 'assistant',
                    content: data.reply
                });
                
                // Keep local history limited to 20 messages
                if (chatHistory.length > 20) {
                    chatHistory = chatHistory.slice(-20);
                }
                
                // Simulate a realistic typing delay based on response length
                const delay = Math.min(1000, data.reply.length * 10);
                setTimeout(() => {
                    appendMessage(data.reply, 'bot');
                }, delay);
            }
        })
        .catch(error => {
            // Remove typing indicator
            hideTypingIndicator(typingIndicatorId);
            appendMessage('Error: Could not connect to the server. Please try again.', 'error');
            console.error('Error:', error);
        });
    }
}

// Show typing indicator while waiting for response
function showTypingIndicator() {
    const chatbotBody = document.getElementById('chatbot-body');
    const typingIndicator = document.createElement('div');
    const id = 'typing-' + Date.now();
    typingIndicator.id = id;
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    chatbotBody.appendChild(typingIndicator);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    return id;
}

// Hide typing indicator when response is received
function hideTypingIndicator(id) {
    const typingIndicator = document.getElementById(id);
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Process Markdown in text
function processMarkdown(text) {
    try {
        // Convert markdown to HTML
        const htmlContent = marked.parse(text);
        
        // Return the HTML content
        return htmlContent;
    } catch (error) {
        console.error('Error processing markdown:', error);
        // Return the original text if markdown processing fails
        return `<p>${text}</p>`;
    }
}

// Append message to the chat (for both user and bot messages)
function appendMessage(message, sender, animate = true) {
    const chatbotBody = document.getElementById('chatbot-body');
    const messageElement = document.createElement('div');
    const id = 'msg-' + Date.now();
    messageElement.id = id;
    
    // Add basic message classes
    messageElement.classList.add('chatbot-message', `chatbot-message-${sender}`);
    
    // Add animation classes if this is a new message
    if (animate) {
        messageElement.classList.add('animate__animated');
        if (sender === 'user') {
            messageElement.classList.add('animate__fadeInRight');
        } else {
            messageElement.classList.add('animate__fadeInLeft');
        }
    }
    
    // Process markdown content based on sender
    let processedContent;
    if (sender === 'user') {
        // For user messages, process markdown but escaping is less important
        // since we trust the user's input
        processedContent = processMarkdown(message);
    } else if (sender === 'bot') {
        // Format educational content with more styling
        // Process the message as markdown
        message = formatEducationalContent(message);
        processedContent = processMarkdown(message);
    } else {
        // For error messages, don't process as markdown
        processedContent = message;
    }
    
    // Add timestamp
    const now = new Date();
    const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    messageElement.innerHTML = `
        <div>${processedContent}</div>
        <div class="time-indicator">${timeString}</div>
    `;
    
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    
    // Add a subtle pulse animation to new messages
    if (animate) {
        setTimeout(() => {
            messageElement.classList.add('animate__pulse');
            setTimeout(() => {
                messageElement.classList.remove('animate__pulse');
            }, 1000);
        }, 500);
    }
    
    return id;
}

// Format educational content to make it more readable
function formatEducationalContent(text) {
    // Make bullet points for lists
    text = text.replace(/- ([^\n]+)/g, '• $1');
    
    // Automatically add markdown headers to what appear to be titles or section headers
    const lines = text.split('\n');
    const result = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) {
            result.push(line);
            continue;
        }
        
        // If it looks like a title (short, ending with colon or all caps)
        if ((line.length < 50 && line.endsWith(':')) || 
            (line.length < 30 && line === line.toUpperCase() && line.length > 5)) {
            // Make it a markdown header
            if (!line.startsWith('#')) {
                result.push(`### ${line}`);
                continue;
            }
        }
        
        // Add common markdown for knowledge emphasis
        const educationalPhrases = {
            'note:': '**Note:**',
            'important:': '**Important:**',
            'remember:': '**Remember:**',
            'key concept:': '**Key Concept:**',
            'definition:': '**Definition:**',
            'example:': '**Example:**',
            'formula:': '**Formula:**'
        };
        
        let modified = false;
        for (const [phrase, replacement] of Object.entries(educationalPhrases)) {
            if (line.toLowerCase().startsWith(phrase)) {
                result.push(line.replace(new RegExp(phrase, 'i'), replacement));
                modified = true;
                break;
            }
        }
        
        if (!modified) {
            result.push(line);
        }
    }
    
    return result.join('\n');
}