import { config } from "dotenv"
config()
// console.log(process.env.OPENAI_API_KEY)

import { Configuration, OpenAIApi } from "openai"
import readline from "readline"

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
)

openAi.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role:"user", content:"Hola chatGPT"}]
}).then(resp=>{
  console.log(resp.data.choices)
})

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

userInterface.prompt()
userInterface.on("line", async input => {
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })
  console.log(response.data.choices[0].message.content)
  userInterface.prompt()
})