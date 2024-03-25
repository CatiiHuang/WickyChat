import { fetchEventSource } from '@microsoft/fetch-event-source';

/**
 * 
curl --location 'http://192.151.243.240:8081/v1/chat/completions' \
--header 'Content-Type: application/json' \
--data '{
     "model": "moonshot-v1-8k",
     "messages": [
        {"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。"},
        {"role": "user", "content": "你好，我叫李雷，1+1等于多少？"}
     ],
     "temperature": 0.3,
     "stream": true
   }'
 */
export const sendChatMessagesAPI = (payLoad, callback) =>
  new Promise((resolve, reject) => {
    fetchEventSource('/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
      async onopen(response) {
        console.log('onopen:', response);
      },
      onmessage(msg) {
        callback(msg);
      },
      onclose() {
        console.log('onclose');
        resolve('close');
      },
      onerror(err) {
        console.log('onerror', err);
        reject(err);
      },
    });
  });
