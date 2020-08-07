module.exports.Languages = class {
  constructor(emojiFlags) {
    this.emojiFlags = emojiFlags;
    this.list = [
      { emoji: 'na', lang: 'na', 'label': 'Choose...' },
      { emoji: 'AE', lang: 'ar', 'label': 'Arabic' },
      // { emoji: 'SA', lang: 'ar', 'label': 'Arabic (Saudi Arabia)' },
      { emoji: 'BG', lang: 'bg', 'label': 'Bulgarian' }, 
      { emoji: 'CZ', lang: 'cs', 'label': 'Czech' }, 
      { emoji: 'DK', lang: 'da', 'label': 'Danish' }, 
      { emoji: 'NL', lang: 'nl', 'label': 'Dutch' },
      { emoji: 'GB', lang: 'en', 'label': 'English' }, 
      { emoji: 'EE', lang: 'et', 'label': 'Estonian' }, 
      { emoji: 'FI', lang: 'fi', 'label': 'Finnish' }, 
      { emoji: 'FR', lang: 'fr', 'label': 'French' }, 
      { emoji: 'DE', lang: 'de', 'label': 'German' }, 
      { emoji: 'GR', lang: 'el', 'label': 'Greek' }, 
      { emoji: 'IL', lang: 'iw', 'label': 'Hebrew' },
      { emoji: 'IN', lang: 'hi', 'label': 'Hindi' },
      { emoji: 'IS', lang: 'is', 'label': 'Icelandic' },
      { emoji: 'IE', lang: 'ga', 'label': 'Irish' },
      { emoji: 'IT', lang: 'it', 'label': 'Italian' },
      { emoji: 'JP', lang: 'ja', 'label': 'Japanese' },
      { emoji: 'LV', lang: 'lv', 'label': 'Latvian' },
      { emoji: 'LT', lang: 'lt', 'label': 'Lithuania' },
      { emoji: 'NO', lang: 'no', 'label': 'Norwegian' },
      { emoji: 'PL', lang: 'pl', 'label': 'Polish' },
      { emoji: 'PT', lang: 'pt', 'label': 'Portuguese' },
      { emoji: 'RO', lang: 'ro', 'label': 'Romanian' },
      { emoji: 'RU', lang: 'ru', 'label': 'Russian' },
      { emoji: 'ES', lang: 'es', 'label': 'Spanish' },
      { emoji: 'SE', lang: 'sv', 'label': 'Swedish' },
      { emoji: 'TR', lang: 'tl', 'label': 'Turkish' }
    ];
  }
  getMenu(lang) {
    const found = this.list.find(item => item.lang == lang);
    return this.list.map(item => {
      const sel = (item.lang === lang) ? ' selected' : '';
      const emoji = item.lang === 'na' ? '' : this.getEmoji(item.lang);
      const currentLang = item.lang === 'na' ? '' : item.lang;
      return `<option value="${currentLang}"` + sel + `>${emoji} ${item.label}</option>`
    }).join('');
  }
  getEmoji(lang, msg, type = 'select') {
    if (!msg && type === 'div') return null;
    const found = this.list.find(item => item.lang == lang);
    return found.emoji == 'na' ? '' : this.emojiFlags.countryCode(found.emoji).emoji;
  }
}