# BrainDump AI 🧠

A minimalist, AI-powered web app that takes your chaotic morning thoughts and instantly organizes them into a prioritized daily checklist. 

Built completely with **Vanilla Web Technologies (HTML, CSS, JavaScript)**—no frameworks, no bundlers.

## ✨ Features

*   **AI-Powered Organization:** Uses OpenAI's `gpt-5.4-nano` model to read your unstructured "brain dump" and extract actionable tasks.
*   **Structured Outputs:** Leverages OpenAI's strict JSON schema formatting to guarantee tasks are accurately returned with a title, estimated time, concentration level, and priority.
*   **Priority Categorization:** Automatically sorts tasks into three distinct columns: High Priority (Do Today), Medium Priority (Schedule), and Low Priority (Quick Wins).
*   **Task Management:** Check off completed tasks with a satisfying visual update.
*   **Graceful Error Handling:** Catches and displays API errors (like 401 Unauthorized or missing API keys) directly in the UI instead of failing silently in the console.
*   **Responsive UI:** Clean, modern interface built with standard CSS Grid and Flexbox.

## 🛠️ Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript
*   **API:** OpenAI API (`gpt-5.4-nano`)
*   **Architecture:** Single Page Application (SPA)

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/braindump-ai.git
cd braindump-ai
```

### 2. Set up your API Key
Since this is a pure vanilla frontend application without a backend, you will need to provide your own OpenAI API key to make it work locally.
1. Open your JavaScript file containing the fetch request.
2. Locate the `apiKey` configuration.
3. Replace the placeholder with your actual OpenAI secret key.
*(Note: Never commit your real API key to a public GitHub repository! If you publish this to GitHub Pages, ensure your key is removed or handled via UI input).*

### 3. Run the app
You can simply open `index.html` in your browser, or use an extension like **Live Server** in VS Code to serve it locally.

## 🧠 What I Learned
Building this project reinforced several core frontend and API integration concepts:
*   **Vanilla DOM Manipulation:** Dynamically creating elements,  handling events, and managing UI state without relying on a framework like React.
*   **OpenAI Structured Outputs:** Writing rigid JSON schemas to prevent AI hallucinations and ensure machine-readable API responses.
*   **Advanced Fetch API & Error Handling:** Checking `response.ok` to properly parse and handle HTTP errors that the native `fetch` API doesn't automatically throw to the `catch` block.

---
*Built as a daily productivity tool and frontend learning project.*

Screenshots
<img width="1919" height="870" alt="Screenshot 2026-07-30 163714" src="https://github.com/user-attachments/assets/76569dc5-4db3-4600-8561-0d9ee809e3e3" />
<img width="1919" height="900" alt="Screenshot 2026-07-30 163722" src="https://github.com/user-attachments/assets/0827944f-a4dd-4fe8-bdb4-7df43fa5678b" />
<img width="1919" height="561" alt="Screenshot 2026-07-30 163741" src="https://github.com/user-attachments/assets/bb58f7fe-41cf-4b44-a11e-16d0e1631f03" />
<img width="1760" height="480" alt="Screenshot 2026-07-30 164620" src="https://github.com/user-attachments/assets/3237ccc0-57ea-4c4d-9a09-f60e5dd78cb4" />


