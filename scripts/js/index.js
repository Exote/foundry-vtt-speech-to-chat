"use strict";
import Speech from "./speech";
import Config from "./config";

class SpeechToChat {
  constructor() {
    this.config = new Config();
    this.listening = true;

    try {
      this.speech = new Speech(
        (text) => this.onFinalised(text),
        () => this.onEndEvent(),
        (text) => this.onAnythingSaid(text),
        game.settings.get("speech-to-chat", "language")
      );
    } catch (err) {
      console.error(err);
    }

    this.onEndEvent();
  }

  onEndEvent() {
    if (this.listening) {
      this.speech.startListening();
    }
  }

  onFinalised(text) {
    console.log("Finalised Text: ", text);
    if (game.settings.get("speech-to-chat", "confirm")) {
      this.displayMessage(text);
    } else {
      this.sendToChat(text);
    }
  }

  sendToChat(message) {
    let chatData = {
      content: message,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      speaker: ChatMessage.getSpeaker({ user: game.user }),
    };
    ChatMessage.create(chatData);
  }

  onAnythingSaid(text) {
    console.log("Interim Text: ", text);
  }

  displayMessage(message) {
    new Dialog(
      {
        title: "Speech to Chat",
        content: `<p>${message}</p>`,
        buttons: {
          dismiss: {
            icon: '<i class="fas fa-times"></i>',
            label: "Close",
            callback: () => {},
          },
          submit: {
            icon: '<i class="fas fa-paper-plane"></i>',
            label: "Send",
            callback: () => {
              this.sendToChat(message);
            },
          },
        },
        close: () => {},
      },
      { width: 300 }
    ).render(true);
  }
}

Hooks.on("init", () => {
  const speechToChat = new SpeechToChat();
});

CONFIG.debug.hooks = true;
