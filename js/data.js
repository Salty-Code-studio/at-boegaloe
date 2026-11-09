// Catalog + feed data. In the real build this comes from the owners' phone admin and the Instagram API.
window.ATB_CATS = [
  { id: "all", nl: "Alles", en: "All" },
  { id: "zitten", nl: "Banken & stoelen", en: "Sofas & chairs" },
  { id: "kussens", nl: "Kussens", en: "Cushions" },
  { id: "wand", nl: "Wand & spiegels", en: "Walls & mirrors" },
  { id: "geur", nl: "Geur", en: "Scent" },
  { id: "cadeau", nl: "Cadeaus", en: "Gifts" },
  { id: "deco", nl: "Woonaccessoires", en: "Accessories" }
];

window.ATB_PRODUCTS = [
  { id: "bank-cognac", cat: "zitten", img: "img/sofa.jpg", nl: "Velvet bank cognac", en: "Velvet sofa, cognac", status: "stock" },
  { id: "bank-modulair", cat: "zitten", img: "img/ig-terracotta-room.jpg", nl: "Modulaire bank", en: "Modular sofa", status: "stock" },
  { id: "kussen-dolce", cat: "kussens", img: "img/ig-dolce-vita.jpg", nl: "Ruchekussen La Dolce Vita", en: "La Dolce Vita ruffle cushion", status: "new" },
  { id: "kussen-zebra", cat: "kussens", img: "img/cushion.jpg", nl: "Sierkussen zebra", en: "Zebra cushion", status: "stock" },
  { id: "spiegel-rotan", cat: "wand", img: "img/mirror.jpg", nl: "Rotan zonnespiegel", en: "Rattan sun mirror", status: "stock" },
  { id: "geurbar", cat: "geur", img: "img/scent-bar.jpg", nl: "Geurkaars Elements", en: "Elements scented candle", status: "stock" },
  { id: "huisparfum", cat: "geur", img: "img/scent.jpg", nl: "Huisparfum & diffuser", en: "Home spray & diffuser", status: "stock" },
  { id: "letterbekers", cat: "cadeau", img: "img/ig-cups.jpg", nl: "Letterbekers", en: "Letter cups", status: "new" },
  { id: "tegeltjes", cat: "cadeau", img: "img/ig-coffee.jpg", nl: "Tegeltjes Studio Meuk", en: "Studio Meuk tiles", status: "new" },
  { id: "tassen", cat: "cadeau", img: "img/ig-bags.jpg", nl: "Gehaakte tassen", en: "Crochet bags", status: "new" },
  { id: "vaas-zuil", cat: "deco", img: "img/ig-purple-corner.jpg", nl: "Ribbelvaas & tegelzuil", en: "Ribbed vase & tile pedestal", status: "stock" },
  { id: "bijzettafel", cat: "deco", img: "img/brass.jpg", nl: "Messing bijzettafel", en: "Brass side table", status: "last" },
];

window.ATB_STATUS = {
  new: { nl: "Nieuw", en: "New" },
  stock: { nl: "Op voorraad", en: "In stock" },
  last: { nl: "Laatste", en: "Last one" }
};

window.ATB_FEED = [
  { img: "img/ig-coffee.jpg", nl: "NIEUW 💖 De allerleukste tegeltjes van Studio Meuk zijn er! Met grappige teksten en lieve woorden.", en: "NEW 💖 The loveliest Studio Meuk tiles are here! Funny texts and sweet words." },
  { img: "img/ig-cups.jpg", nl: "Bon dia! 💛💜🩷 Letterbekers in alle kleuren.", en: "Bon dia! 💛💜🩷 Letter cups in every colour." },
  { img: "img/ig-velvet.jpg", nl: "We kunnen al deze prachtige velvet kleuren bedden voor je bestellen, met of zonder hoofdbord. 💫", en: "We can order beds in all these velvet colours, with or without headboard. 💫" },
  { img: "img/ig-bags.jpg", nl: "Happy Saturday! 💖 Gehaakte tassen, net binnen.", en: "Happy Saturday! 💖 Crochet bags, just in." },
  { img: "img/ig-dolce-vita.jpg", nl: "NIEUW IN DE WINKEL ❤️‍🔥 La Dolce Vita.", en: "NEW IN STORE ❤️‍🔥 La Dolce Vita." },
  { img: "img/ig-terracotta-room.jpg", nl: "🤎 Deze prachtige bank is weer op voorraad!", en: "🤎 This beautiful sofa is back in stock!" }
];

window.ATB_VELVET = [
  { hex: "#E6DACA", nl: "Ivoor", en: "Ivory" },
  { hex: "#C9B396", nl: "Zand", en: "Sand" },
  { hex: "#8B7563", nl: "Taupe", en: "Taupe" },
  { hex: "#55524F", nl: "Antraciet", en: "Charcoal" },
  { hex: "#B3222C", nl: "Rood", en: "Red" },
  { hex: "#C47B78", nl: "Oudroze", en: "Dusty pink" },
  { hex: "#5B1E3A", nl: "Bordeaux", en: "Bordeaux" },
  { hex: "#2E5FA8", nl: "Kobalt", en: "Cobalt" },
  { hex: "#1F5560", nl: "Petrol", en: "Petrol" },
  { hex: "#24493D", nl: "Bosgroen", en: "Forest green" },
  { hex: "#D2A23A", nl: "Oker", en: "Ochre" }
];
