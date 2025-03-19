# Education-Bot---Your-Intelligent-Educational-Assistant
MADE FOR EDUCATIONAL PURPOSE

Education Bot is an AI-powered educational assistant designed to help students and learners with various academic subjects. Built using Flask and Google's Generative AI, this bot provides instant answers to educational queries, offers explanations, and assists with learning across multiple domains.

## Features

- **Interactive Chat Interface**: A user-friendly chat interface for seamless interaction.
- **Educational Domains**: Supports subjects like Mathematics, Science, History, Literature, and Programming.
- **Markdown Support**: Allows users to format their messages using Markdown syntax.
- **Conversation History**: Keeps track of the conversation history for context-aware responses.
- **Quick Suggestions**: Provides quick topic suggestions for easy navigation.
- **Typing Indicator**: Shows a typing indicator while the bot is generating a response.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/education-bot.git
   cd education-bot
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your Google Gemini API key:
     ```plaintext
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Run the Application**:
   ```bash
   python app.py
   ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5000`.

## Usage

- **Ask Questions**: Type your educational questions in the chat input and press Enter or click the send button.
- **Quick Suggestions**: Use the category chips to get quick suggestions for topics.
- **Markdown Formatting**: Use Markdown syntax to format your messages. Click the Markdown helper for syntax examples.
- **Clear Chat**: Use the "Clear Chat" button to reset the conversation history.

## API Endpoints

- **POST /chat**: Send a message to the bot and receive a response.
  - **Request Body**:
    ```json
    {
      "message": "Your question here"
    }
    ```
  - **Response**:
    ```json
    {
      "reply": "Bot's response",
      "history": "Conversation history"
    }
    ```

- **GET /history**: Retrieve the conversation history.
  - **Response**:
    ```json
    {
      "history": "Conversation history"
    }
    ```

- **POST /clear_history**: Clear the conversation history.
  - **Response**:
    ```json
    {
      "status": "success"
    }
    ```

## Technologies Used

- **Flask**: A lightweight web framework for Python.
- **Google Generative AI**: Powers the bot's conversational capabilities.
- **Marked.js**: For rendering Markdown in the chat interface.
- **Animate.css**: For smooth animations in the UI.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Note**: Make sure to replace `your-username` with your actual GitHub username in the clone command.
