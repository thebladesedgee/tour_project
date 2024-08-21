<template>
  <div class="chat-box">
    <div class="chat-header">
      <i class="fas fa-comments"></i> Tur Botu
    </div>
    <div id="chat-content" class="chat-content">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['chat-bubble', message.type === 'bot' ? 'bot' : 'user']"
      >
        {{ message.text }}
      </div>
    </div>
    <div v-if="currentQuestion === 3" class="range-slider">
      <input
        type="range"
        class="form-range"
        min="100"
        max="10000"
        step="100"
        v-model="userAnswers.priceRange"
        @input="updatePrice"
      />
      <p>Seçilen fiyat: {{ userAnswers.priceRange }}₺</p>
      <button class="btn btn-primary mt-2" @click="recommendTourOrHotel">Onayla</button>
    </div>
    <div class="chat-input" v-if="currentQuestion !== 3">
      <input
        type="text"
        v-model="userInput"
        placeholder="Cevabınızı yazın..."
        @keyup.enter="sendMessage"
        class="form-control"
      />
      <button class="btn btn-primary ms-2" @click="sendMessage">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestion: 1,
      userInput: '',
      userAnswers: {
        location: '',
        people: 0,
        priceRange: 100,
      },
      messages: [{ text: 'Nereye gitmek istersiniz?', type: 'bot' }],
      thankYouResponses: [
        'teşekkürler',
        'teşekkür ederim',
        'sağ olun',
        'teşekkür',
        'çok teşekkürler',
      ],
    };
  },
  methods: {
    sendMessage() {
      let userResponse = this.userInput.trim().toLowerCase();
      if (userResponse) {
        this.addChatBubble(userResponse, 'user');

        if (this.thankYouResponses.includes(userResponse)) {
          setTimeout(() => this.addChatBubble('Rica ederim, iyi günler!', 'bot'), 1000);
        } else {
          this.processUserResponse(userResponse);
        }

        this.userInput = '';
      }
    },
    processUserResponse(userResponse) {
      if (this.currentQuestion === 1) {
        this.userAnswers.location = userResponse;
        setTimeout(() => this.askNextQuestion('Kaç kişi kalacaksınız?'), 1000);
      } else if (this.currentQuestion === 2) {
        this.userAnswers.people = userResponse;
        setTimeout(() => this.askNextQuestion('Lütfen fiyat aralığını seçin'), 1000);
      }
      this.currentQuestion++;
    },
    addChatBubble(text, type) {
      this.messages.push({ text, type });
    },
    askNextQuestion(question) {
      this.addChatBubble(question, 'bot');
    },
    updatePrice() {
      this.addChatBubble(`Seçilen fiyat: ${this.userAnswers.priceRange}₺`, 'bot');
    },
    recommendTourOrHotel() {
      const recommendation = `Size önerilen otel: ${this.userAnswers.location} - Kişi sayısı: ${this.userAnswers.people} - Fiyat aralığı: ${this.userAnswers.priceRange}₺`;
      this.addChatBubble(recommendation, 'bot');
      this.currentQuestion++;
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f4f4f4;
}

.chat-box {
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.chat-header {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.chat-content {
  max-height: 300px;
  overflow-y: auto;
}

.chat-bubble {
  margin: 10px 0;
  padding: 15px;
  border-radius: 20px;
  background: #007bff;
  color: white;
  text-align: left;
}

.chat-bubble.bot {
  background: #eeeeee;
  color: #333;
}

.chat-input {
  display: flex;
  margin-top: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
  outline: none;
}

.chat-input button {
  background-color: #007bff;
  border: none;
  padding: 10px 15px;
  border-radius: 15px;
  color: white;
}

.range-slider {
  width: 100%;
  margin: 20px 0;
}
</style>
