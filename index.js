import readlineSync from "readline-sync";
import colors from "colors";
import openai from "./config/open-ai.js";

const main = async () => {
  console.log(colors.bold.green("Welcome to the Chatbot Program!"));
  console.log(colors.bold.green("You can start chatting with the bot."));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You:"));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));
      messages.push({ role: "user", content: userInput });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completionText = completion.choices[0].message.content;
      console.log(colors.green("Bot: ") + completionText);

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }

      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
};

main();
