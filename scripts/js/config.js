class Config {
  constructor() {
    game.settings.register("speech-to-chat", "enable", {
      name: game.i18n.localize("speech-to-chat.enable.name"),
      hint: game.i18n.localize("speech-to-chat.enable.hint"),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
    });

    game.settings.register("speech-to-chat", "confirm", {
      name: game.i18n.localize("speech-to-chat.confirm.name"),
      hint: game.i18n.localize("speech-to-chat.confirm.hint"),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
    });

    game.settings.register("speech-to-chat", "language", {
      name: game.i18n.localize("speech-to-chat.language.name"),
      hint: game.i18n.localize("speech-to-chat.language.hint"),
      scope: "world",
      config: true,
      default: "en-US",
      type: String,
    });
  }
}

export default Config;
