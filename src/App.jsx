import { useState, useEffect } from "react";

const CARDS = [
  { name: "הכסיל",          nameEn: "The Fool",          number: "0",    keywords: ["התחלות חדשות","ספונטניות","תמימות"],  color: "#c8a84a", bg: "#0c1525", accent: "#4a3a1a",
    paths: `<circle cx="60" cy="68" r="26" fill="none" stroke="#c8a84a" stroke-width="1"/><path d="M60 42 L65 56 L80 56 L68 65 L73 79 L60 70 L47 79 L52 65 L40 56 L55 56 Z" fill="none" stroke="#c8a84a" stroke-width="1"/><path d="M35 108 Q60 95 85 108" fill="none" stroke="#6a8a6a" stroke-width=".8" stroke-dasharray="3,2"/><path d="M44 128 L60 118 L76 128" fill="none" stroke="#8a7a5a" stroke-width=".8"/><circle cx="60" cy="148" r="9" fill="none" stroke="#8a7a5a" stroke-width=".8"/><path d="M51 148 L69 148 M60 139 L60 157" stroke="#8a7a5a" stroke-width=".8"/>` },
  { name: "הקוסם",           nameEn: "The Magician",      number: "I",    keywords: ["רצון","כוח","מיומנות"],              color: "#c8a84a", bg: "#0c1525", accent: "#4a3a1a",
    paths: `<path d="M35 52 Q60 36 85 52" fill="none" stroke="#c8a84a" stroke-width="1"/><circle cx="60" cy="68" r="15" fill="none" stroke="#c8a84a" stroke-width="1"/><text x="60" y="75" text-anchor="middle" font-family="serif" font-size="15" fill="#c8a84a">∞</text><rect x="32" y="92" width="56" height="1.5" fill="#3a2a10" rx="1"/><path d="M42 106 L50 122 L60 106 L70 122 L78 106" fill="none" stroke="#8a6a3a" stroke-width=".8"/><circle cx="42" cy="142" r="5" fill="#0c1525" stroke="#8a6a3a" stroke-width=".8"/><circle cx="60" cy="142" r="5" fill="#0c1525" stroke="#c8a84a" stroke-width=".8"/><circle cx="78" cy="142" r="5" fill="#0c1525" stroke="#8a6a3a" stroke-width=".8"/>` },
  { name: "הכוהנת הגדולה",   nameEn: "High Priestess",    number: "II",   keywords: ["אינטואיציה","חוכמה","סוד"],          color: "#9a8aba", bg: "#0c1020", accent: "#3a2a5a",
    paths: `<path d="M25 58 Q60 30 95 58" fill="none" stroke="#7a6a9a" stroke-width=".8"/><circle cx="60" cy="78" r="22" fill="none" stroke="#9a8aba" stroke-width=".8"/><path d="M45 68 Q60 60 75 68" fill="none" stroke="#c8b8e8" stroke-width=".5"/><path d="M50 78 L70 78 M55 86 L65 86" stroke="#9a8aba" stroke-width=".8"/><path d="M42 108 L42 155 L78 155 L78 108" fill="none" stroke="#5a4a7a" stroke-width=".8"/><circle cx="52" cy="136" r="3" fill="#0c1020" stroke="#7a6a9a" stroke-width=".5"/><circle cx="68" cy="136" r="3" fill="#0c1020" stroke="#7a6a9a" stroke-width=".5"/>` },
  { name: "הקיסרית",         nameEn: "The Empress",       number: "III",  keywords: ["פוריות","יצירה","שפע"],              color: "#7aaa4a", bg: "#0f1008", accent: "#3a4a1a",
    paths: `<ellipse cx="60" cy="72" rx="28" ry="22" fill="none" stroke="#7aaa4a" stroke-width=".8"/><path d="M60 50 Q80 55 80 72 Q80 89 60 94 Q40 89 40 72 Q40 55 60 50" fill="none" stroke="#5a8a3a" stroke-width=".5" stroke-dasharray="2,3"/><path d="M48 68 L56 76 L72 60" fill="none" stroke="#aace6a" stroke-width="1.2"/><path d="M35 105 Q45 95 55 100 Q65 95 75 105" fill="none" stroke="#5a7a3a" stroke-width=".8"/><circle cx="50" cy="122" r="4" fill="none" stroke="#7aaa4a" stroke-width=".8"/><circle cx="60" cy="118" r="4" fill="none" stroke="#7aaa4a" stroke-width=".8"/><circle cx="70" cy="122" r="4" fill="none" stroke="#7aaa4a" stroke-width=".8"/><path d="M38 142 Q60 132 82 142 Q60 152 38 142" fill="none" stroke="#5a8a3a" stroke-width=".8"/>` },
  { name: "הקיסר",           nameEn: "The Emperor",       number: "IV",   keywords: ["מבנה","סמכות","יציבות"],             color: "#c8703a", bg: "#120a08", accent: "#5a2a1a",
    paths: `<rect x="38" y="35" width="44" height="56" rx="2" fill="none" stroke="#c8703a" stroke-width="1"/><rect x="44" y="41" width="32" height="44" rx="1" fill="none" stroke="#8a4a2a" stroke-width=".5"/><path d="M60 48 L60 78 M47 63 L73 63" stroke="#c8703a" stroke-width="1"/><circle cx="60" cy="63" r="6" fill="none" stroke="#c8703a" stroke-width=".8"/><path d="M35 105 L35 155 L85 155 L85 105 Z" fill="none" stroke="#8a4a2a" stroke-width=".8"/><path d="M45 105 L45 90 L75 90 L75 105" fill="none" stroke="#6a3a1a" stroke-width=".8"/><path d="M48 125 L48 148 L55 148 L55 125 Z M65 125 L65 148 L72 148 L72 125 Z" fill="#120a08" stroke="#8a4a2a" stroke-width=".8"/>` },
  { name: "הכוהן הגדול",     nameEn: "The Hierophant",    number: "V",    keywords: ["מסורת","אמונה","הנחיה"],             color: "#9a8aba", bg: "#100c18", accent: "#4a3a6a",
    paths: `<path d="M40 40 L40 100 M80 40 L80 100" stroke="#5a4a7a" stroke-width=".8"/><path d="M35 55 Q60 45 85 55" fill="none" stroke="#9a8aba" stroke-width="1"/><circle cx="60" cy="75" r="16" fill="none" stroke="#9a8aba" stroke-width=".8"/><path d="M52 75 L68 75 M60 67 L60 83" stroke="#7a6a9a" stroke-width=".8"/><circle cx="60" cy="75" r="5" fill="none" stroke="#c8b8e8" stroke-width=".5"/><path d="M38 110 L38 155 L50 155 L50 110 M70 110 L70 155 L82 155 L82 110" fill="none" stroke="#5a4a7a" stroke-width=".8"/><path d="M50 132 L70 132" stroke="#7a6a9a" stroke-width=".8"/>` },
  { name: "האוהבים",         nameEn: "The Lovers",        number: "VI",   keywords: ["אהבה","בחירה","הרמוניה"],            color: "#c8a84a", bg: "#0a1018", accent: "#4a3a2a",
    paths: `<circle cx="42" cy="65" r="14" fill="none" stroke="#c8a84a" stroke-width=".8"/><circle cx="78" cy="65" r="14" fill="none" stroke="#c8a84a" stroke-width=".8"/><path d="M56 65 L64 65" stroke="#c8a84a" stroke-width=".8"/><path d="M60 32 L65 42 L76 42 L67 49 L71 60 L60 53 L49 60 L53 49 L44 42 L55 42 Z" fill="none" stroke="#e8c86a" stroke-width=".8"/><path d="M48 88 Q60 78 72 88" fill="none" stroke="#c87a7a" stroke-width="1"/><path d="M55 97 Q60 93 65 97 Q60 105 55 97" fill="none" stroke="#e88a8a" stroke-width=".8"/><path d="M40 125 Q60 115 80 125 Q60 140 40 125" fill="none" stroke="#8a7a5a" stroke-width=".5" stroke-dasharray="2,2"/>` },
  { name: "המרכבה",          nameEn: "The Chariot",       number: "VII",  keywords: ["ניצחון","שליטה","נחישות"],           color: "#6a8aca", bg: "#080c18", accent: "#2a3a5a",
    paths: `<rect x="32" y="40" width="56" height="60" rx="2" fill="none" stroke="#6a8aca" stroke-width="1"/><path d="M32 78 L20 93 M88 78 L100 93" stroke="#4a6a9a" stroke-width=".8"/><circle cx="60" cy="62" r="10" fill="none" stroke="#8aaadc" stroke-width=".8"/><path d="M60 52 L60 72 M50 62 L70 62" stroke="#6a8aca" stroke-width=".5"/><path d="M38 46 L82 46" stroke="#8aaadc" stroke-width=".8"/><circle cx="45" cy="116" r="7" fill="none" stroke="#6a8aca" stroke-width=".8"/><circle cx="75" cy="116" r="7" fill="none" stroke="#6a8aca" stroke-width=".8"/><path d="M38 128 Q60 138 82 128" fill="none" stroke="#4a6a9a" stroke-width=".5" stroke-dasharray="2,2"/>` },
  { name: "הכוח",            nameEn: "Strength",          number: "VIII", keywords: ["אומץ","סבלנות","כוח פנימי"],         color: "#e8803a", bg: "#100808", accent: "#6a2a0a",
    paths: `<circle cx="60" cy="62" r="25" fill="none" stroke="#e8803a" stroke-width=".8"/><path d="M38 60 Q48 44 60 57 Q72 44 82 60 Q72 76 60 67 Q48 76 38 60" fill="none" stroke="#e8803a" stroke-width="1"/><path d="M52 62 Q60 54 68 62 Q60 72 52 62" fill="none" stroke="#c86030" stroke-width=".8"/><path d="M35 98 Q60 88 85 98" fill="none" stroke="#8a4a2a" stroke-width=".8"/><path d="M50 118 Q60 112 70 118 Q60 128 50 118" fill="none" stroke="#e8803a" stroke-width=".8"/><path d="M42 112 L42 155 M78 112 L78 155" stroke="#5a2a0a" stroke-width=".5" stroke-dasharray="1,3"/><path d="M42 133 L78 133" stroke="#8a4a2a" stroke-width=".5"/>` },
  { name: "המתבודד",         nameEn: "The Hermit",        number: "IX",   keywords: ["חיפוש פנימי","בדידות","הנחיה"],      color: "#9aaa8a", bg: "#0c100c", accent: "#3a4a2a",
    paths: `<circle cx="60" cy="50" r="12" fill="none" stroke="#9aaa8a" stroke-width=".8"/><path d="M52 62 L52 105 Q52 112 60 112 Q68 112 68 105 L68 62" fill="none" stroke="#7a8a6a" stroke-width=".8"/><path d="M52 80 L38 88 M68 80 L82 88" fill="none" stroke="#5a6a4a" stroke-width=".8"/><circle cx="60" cy="132" r="16" fill="none" stroke="#6a7a5a" stroke-width=".5" stroke-dasharray="2,2"/><path d="M55 127 L55 140 L65 140 L65 127" fill="none" stroke="#7a8a6a" stroke-width=".8"/><circle cx="60" cy="132" r="5" fill="none" stroke="#cce89a" stroke-width=".8"/><path d="M52 132 L68 132" stroke="#cce89a" stroke-width=".5" stroke-dasharray="1,2"/>` },
  { name: "גלגל המזל",       nameEn: "Wheel of Fortune",  number: "X",    keywords: ["מחזוריות","גורל","שינוי"],           color: "#aaa0cc", bg: "#0c0c18", accent: "#4a3a6a",
    paths: `<circle cx="60" cy="88" r="42" fill="none" stroke="#6a5a8a" stroke-width=".5" stroke-dasharray="1,3"/><circle cx="60" cy="88" r="30" fill="none" stroke="#8a7aaa" stroke-width=".8"/><circle cx="60" cy="88" r="14" fill="none" stroke="#aaa0cc" stroke-width=".8"/><circle cx="60" cy="88" r="4" fill="#0c0c18" stroke="#c8b8e8" stroke-width=".8"/><path d="M60 58 L60 118 M30 88 L90 88 M39 67 L81 109 M81 67 L39 109" stroke="#5a4a7a" stroke-width=".5"/><path d="M60 46 L63 52 L57 52 Z M60 130 L63 124 L57 124 Z" fill="#8a7aaa"/><path d="M18 88 L24 91 L24 85 Z M102 88 L96 91 L96 85 Z" fill="#8a7aaa"/>` },
  { name: "הצדק",            nameEn: "Justice",           number: "XI",   keywords: ["איזון","אמת","חוק"],                 color: "#c8c86a", bg: "#0a0a10", accent: "#5a5a3a",
    paths: `<path d="M60 32 L60 165" stroke="#3a3a2a" stroke-width=".5" stroke-dasharray="1,4"/><path d="M32 65 L88 65" stroke="#9a9a6a" stroke-width="1"/><circle cx="60" cy="65" r="6" fill="#0a0a10" stroke="#c8c86a" stroke-width=".8"/><path d="M32 65 L25 85 L45 85 Z M88 65 L95 85 L75 85 Z" fill="none" stroke="#8a8a5a" stroke-width=".8"/><path d="M56 108 L56 158 L64 158 L64 108" fill="none" stroke="#8a8a5a" stroke-width=".8"/><path d="M46 120 L74 120 M46 133 L74 133 M46 146 L74 146" stroke="#5a5a3a" stroke-width=".5"/>` },
  { name: "התלוי",           nameEn: "The Hanged Man",    number: "XII",  keywords: ["ויתור","נקודת מבט","השהייה"],        color: "#7aaabb", bg: "#080c12", accent: "#2a4a5a",
    paths: `<path d="M30 40 L90 40" stroke="#4a6a7a" stroke-width="1"/><path d="M40 40 L40 55 M80 40 L80 55" stroke="#4a6a7a" stroke-width=".8"/><circle cx="60" cy="70" r="14" fill="none" stroke="#7aaabb" stroke-width=".8"/><path d="M60 56 L60 40" stroke="#4a6a7a" stroke-width=".8"/><path d="M50 84 L40 105 M70 84 L80 105" fill="none" stroke="#5a8a9a" stroke-width=".8" stroke-dasharray="2,2"/><path d="M40 105 L80 105" stroke="#3a5a6a" stroke-width=".5"/><path d="M48 125 Q60 118 72 125 Q60 138 48 125" fill="none" stroke="#7aaabb" stroke-width=".8"/>` },
  { name: "המוות",           nameEn: "Death",             number: "XIII", keywords: ["שינוי","מעבר","סיום"],               color: "#aaaaaa", bg: "#080808", accent: "#3a3a3a",
    paths: `<path d="M60 28 L60 165" stroke="#2a2a2a" stroke-width=".5" stroke-dasharray="1,4"/><circle cx="60" cy="62" r="20" fill="none" stroke="#8a8a8a" stroke-width=".8"/><path d="M50 52 L70 72 M70 52 L50 72" stroke="#aaaaaa" stroke-width="1"/><path d="M38 90 Q60 80 82 90 Q60 100 38 90" fill="none" stroke="#6a6a6a" stroke-width=".8"/><path d="M42 112 L42 155 L78 155 L78 112" fill="none" stroke="#5a5a5a" stroke-width=".5" stroke-dasharray="2,2"/><path d="M50 133 Q60 126 70 133 Q60 143 50 133" fill="none" stroke="#8a8a8a" stroke-width=".8"/>` },
  { name: "המתינות",         nameEn: "Temperance",        number: "XIV",  keywords: ["איזון","מידה","סבלנות"],             color: "#6a9aaa", bg: "#080c10", accent: "#2a4a5a",
    paths: `<ellipse cx="42" cy="75" rx="12" ry="18" fill="none" stroke="#6a9aaa" stroke-width=".8"/><ellipse cx="78" cy="75" rx="12" ry="18" fill="none" stroke="#6a9aaa" stroke-width=".8"/><path d="M54 68 Q60 60 66 68" fill="none" stroke="#8abbc8" stroke-width="1"/><path d="M54 82 Q60 90 66 82" fill="none" stroke="#8abbc8" stroke-width="1"/><path d="M54 68 L54 82 M66 68 L66 82" stroke="#4a7a8a" stroke-width=".5" stroke-dasharray="1,2"/><circle cx="60" cy="122" r="16" fill="none" stroke="#5a8a9a" stroke-width=".5" stroke-dasharray="2,3"/><path d="M52 117 L52 130 L68 130 L68 117" fill="none" stroke="#6a9aaa" stroke-width=".8"/><path d="M55 122 L65 122 M55 126 L65 126" stroke="#4a7a8a" stroke-width=".5"/>` },
  { name: "השד",             nameEn: "The Devil",         number: "XV",   keywords: ["כבלים","חומריות","אשליה"],           color: "#cc4a4a", bg: "#100808", accent: "#5a1a1a",
    paths: `<path d="M60 32 L80 58 L40 58 Z" fill="none" stroke="#cc4a4a" stroke-width="1"/><circle cx="60" cy="52" r="6" fill="none" stroke="#ee6060" stroke-width=".8"/><path d="M35 60 L35 72 L85 72 L85 60" fill="none" stroke="#8a3a3a" stroke-width=".8"/><path d="M42 72 L38 95 M78 72 L82 95" stroke="#6a2a2a" stroke-width=".8"/><path d="M38 95 L48 95 M72 95 L82 95" stroke="#5a2a2a" stroke-width=".8"/><path d="M42 110 L42 155 L78 155 L78 110" fill="none" stroke="#6a2a2a" stroke-width=".8"/><path d="M50 132 L50 148 L55 148 L55 132 Z M65 132 L65 148 L70 148 L70 132 Z" fill="#100808" stroke="#8a3a3a" stroke-width=".8"/>` },
  { name: "המגדל",           nameEn: "The Tower",         number: "XVI",  keywords: ["שינוי פתאומי","שחרור","התגלות"],     color: "#cc8a3a", bg: "#0c0808", accent: "#6a3a0a",
    paths: `<rect x="42" y="38" width="36" height="84" rx="2" fill="none" stroke="#cc8a3a" stroke-width=".8"/><path d="M42 58 L78 58 M42 78 L78 78 M42 98 L78 98" stroke="#6a4a1a" stroke-width=".5"/><path d="M50 38 L50 28 L60 22 L70 28 L70 38" fill="none" stroke="#cc8a3a" stroke-width=".8"/><circle cx="60" cy="28" r="4" fill="none" stroke="#eeaa4a" stroke-width=".8"/><path d="M78 50 L95 33" stroke="#ee9a30" stroke-width="1.5"/><circle cx="95" cy="33" r="3" fill="none" stroke="#eeaa4a" stroke-width=".8"/><path d="M35 135 Q42 126 48 133 M55 143 Q60 135 65 143 M72 133 Q78 126 85 133" fill="none" stroke="#8a5a1a" stroke-width=".8"/>` },
  { name: "הכוכב",           nameEn: "The Star",          number: "XVII", keywords: ["תקווה","השראה","התחדשות"],           color: "#8aaad0", bg: "#080c18", accent: "#2a3a5a",
    paths: `<path d="M60 28 L63 38 L74 38 L65 44 L68 55 L60 48 L52 55 L55 44 L46 38 L57 38 Z" fill="none" stroke="#c8d8f0" stroke-width=".8"/><circle cx="30" cy="62" r="4" fill="none" stroke="#8aaad0" stroke-width=".5"/><circle cx="88" cy="54" r="3" fill="none" stroke="#8aaad0" stroke-width=".5"/><circle cx="22" cy="88" r="5" fill="none" stroke="#6a8ab8" stroke-width=".5"/><circle cx="96" cy="82" r="4" fill="none" stroke="#6a8ab8" stroke-width=".5"/><path d="M35 98 Q60 82 85 98" fill="none" stroke="#4a6a9a" stroke-width=".8"/><path d="M42 128 Q60 118 78 128 Q60 138 42 128" fill="none" stroke="#4a6a9a" stroke-width=".8"/>` },
  { name: "הירח",            nameEn: "The Moon",          number: "XVIII", keywords: ["אשליה","פחד","תת-מודע"],            color: "#9a9aba", bg: "#080810", accent: "#2a2a4a",
    paths: `<path d="M45 35 Q75 40 72 70 Q69 94 45 96 Q65 108 75 88 Q88 60 75 40 Z" fill="none" stroke="#9a9aba" stroke-width=".8"/><circle cx="55" cy="65" r="18" fill="none" stroke="#6a6a8a" stroke-width=".5" stroke-dasharray="1,3"/><path d="M30 98 L90 98" stroke="#3a3a5a" stroke-width=".5"/><path d="M35 98 Q42 88 50 95 Q56 100 62 95 Q68 88 75 95 Q82 100 85 98" fill="none" stroke="#5a5a7a" stroke-width=".8"/><circle cx="42" cy="118" r="7" fill="none" stroke="#6a6a9a" stroke-width=".8"/><circle cx="78" cy="118" r="7" fill="none" stroke="#6a6a9a" stroke-width=".8"/>` },
  { name: "השמש",            nameEn: "The Sun",           number: "XIX",  keywords: ["שמחה","הצלחה","בהירות"],             color: "#e8c830", bg: "#100c04", accent: "#786010",
    paths: `<circle cx="60" cy="68" r="24" fill="none" stroke="#e8c830" stroke-width="1"/><circle cx="60" cy="68" r="13" fill="none" stroke="#f0d840" stroke-width=".8"/><path d="M60 35 L60 42 M60 94 L60 101 M27 68 L34 68 M86 68 L93 68" stroke="#c8a820" stroke-width="1"/><path d="M36 44 L41 49 M84 44 L79 49 M36 92 L41 87 M84 92 L79 87" stroke="#c8a820" stroke-width=".8"/><path d="M60 58 L60 78 M50 68 L70 68" stroke="#e8c830" stroke-width=".5"/><path d="M38 115 Q60 105 82 115 Q60 128 38 115" fill="none" stroke="#c8a820" stroke-width=".8"/>` },
  { name: "הדין",            nameEn: "Judgement",         number: "XX",   keywords: ["התעוררות","תשובה","מעבר"],           color: "#9a9aba", bg: "#080808", accent: "#3a3a5a",
    paths: `<path d="M60 28 L80 55 L40 55 Z" fill="none" stroke="#9a9aba" stroke-width=".8"/><path d="M60 55 L60 78" stroke="#6a6a8a" stroke-width=".8"/><circle cx="60" cy="88" r="10" fill="none" stroke="#aaaacc" stroke-width=".8"/><path d="M56 85 L60 80 L64 85" fill="none" stroke="#ccccee" stroke-width=".8"/><path d="M32 108 L32 155 L44 155 L44 108 M76 108 L76 155 L88 155 L88 108" fill="none" stroke="#5a5a7a" stroke-width=".8"/><path d="M50 118 L70 118 M50 131 L70 131 M50 144 L70 144" stroke="#3a3a5a" stroke-width=".5"/><path d="M44 132 L76 132" stroke="#7a7a9a" stroke-width=".5" stroke-dasharray="2,2"/>` },
  { name: "העולם",           nameEn: "The World",         number: "XXI",  keywords: ["השלמה","אחדות","הגשמה"],             color: "#8acc9a", bg: "#080c08", accent: "#2a4a2a",
    paths: `<ellipse cx="60" cy="88" rx="36" ry="50" fill="none" stroke="#6aaa7a" stroke-width=".8"/><ellipse cx="60" cy="88" rx="26" ry="38" fill="none" stroke="#4a8a5a" stroke-width=".5" stroke-dasharray="2,3"/><circle cx="60" cy="88" r="12" fill="none" stroke="#8acc9a" stroke-width=".8"/><path d="M60 76 L60 100 M48 88 L72 88" stroke="#5a9a6a" stroke-width=".5"/><circle cx="60" cy="88" r="4" fill="#080c08" stroke="#aaeebb" stroke-width=".8"/><circle cx="32" cy="52" r="5" fill="none" stroke="#6aaa7a" stroke-width=".5"/><circle cx="88" cy="52" r="5" fill="none" stroke="#6aaa7a" stroke-width=".5"/><circle cx="32" cy="124" r="5" fill="none" stroke="#6aaa7a" stroke-width=".5"/><circle cx="88" cy="124" r="5" fill="none" stroke="#6aaa7a" stroke-width=".5"/>` },
];

function CardSVG({ card, isReversed, animating }) {
  const labelSize = card.nameEn.length > 12 ? 7 : 8.5;
  const flipped = isReversed && !animating;
  return (
    <div style={{ position: "relative", width: 180, height: 300 }}>
      <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg" style={{ width: 180, height: 300, display: "block",
        animation: animating ? "flip 1.2s ease-in-out" : "glow 3s ease-in-out infinite",
        boxShadow: isReversed ? "0 0 35px rgba(150,50,150,.3)" : "0 0 35px rgba(150,120,50,.3)",
        transform: flipped ? "rotate(180deg)" : "none",
        transition: "transform .5s", borderRadius: 12,
      }}>
        <rect width="120" height="200" rx="8" fill={card.bg} stroke={card.color} strokeWidth="1"/>
        <rect x="7" y="7" width="106" height="186" rx="6" fill="none" stroke={card.accent} strokeWidth=".5"/>
        <g transform={flipped ? "translate(0, 18)" : ""} dangerouslySetInnerHTML={{ __html: card.paths }}/>
      </svg>
      <div style={{
        position: "absolute", bottom: 10, left: 0, right: 0,
        textAlign: "center", fontFamily: "Georgia,serif",
        fontSize: labelSize + "px", color: card.color,
        letterSpacing: ".18em", pointerEvents: "none",
      }}>
        {card.nameEn.toUpperCase()}
      </div>

    </div>
  );
}

function getUserSeed() {
  const key = "tarot_seed_v2";
  let s = localStorage.getItem(key);
  if (!s) { s = String(Math.floor(Math.random() * 999983)); localStorage.setItem(key, s); }
  return parseInt(s, 10);
}

function getDailyCard() {
  const t = new Date();
  const ds = t.getFullYear() * 10000 + (t.getMonth() + 1) * 100 + t.getDate();
  const combined = (ds * 31 + getUserSeed()) >>> 0;
  return { card: CARDS[combined % CARDS.length], isReversed: (combined * 7) % 3 === 0 };
}

function fmtDate() {
  return new Date().toLocaleDateString("he-IL", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const [gender, setGender] = useState(() => localStorage.getItem("tarot_gender") || null);
  const { card, isReversed } = getDailyCard();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600&display=swap";
    document.head.appendChild(link);
  }, []);

  async function getReading() {
    setPhase("loading");
    setErr("");

    const gMap = {
      male:     { address: "יקירי",     form: "זכר יחיד" },
      female:   { address: "יקירתי",    form: "נקבה יחידה" },
      plural_m: { address: "יקיריי",    form: "זכר רבים" },
      plural_f: { address: "יקירותיי",  form: "נקבה רבות" },
    };
    const g = gMap[gender] || gMap.male;

    const prompt = `You are Fortuna - a Hebrew-speaking tarot reader with the voice of a warm, all-knowing neighbor who has seen everything. You speak like someone who has known the reader their entire life. Mix mystical insight with grounded everyday wisdom. Be slightly dramatic but self-aware. Intimate, never cold. You love giving small, specific, sensory lifestyle suggestions — things like drinking a specific herbal tea, taking a long bath, eating something nourishing, fixing something small at home, going outside barefoot, lighting a candle. These feel like natural extensions of the card's energy, not generic wellness advice.

Card: "${card.nameEn}" (${card.name}), ${isReversed ? "reversed" : "upright"}. Keywords: ${card.keywords.join(", ")}.
Address the reader as "${g.address}" (Hebrew gender form: ${g.form}). Use correct Hebrew gender agreement throughout.

Write exactly 5 lines. Each line starts with one label followed immediately by the content (no line breaks within a section):
MEANING: [1-2 Hebrew sentences about the card's energy today]
MESSAGE: [1-2 Hebrew sentences - Fortuna speaking directly and intimately to the reader]
RITUAL: [exactly 3 small lifestyle actions for today, comma-separated, each 3-8 words, specific and sensory — e.g. "לשתות חליטת לבנדר לפני השינה, לאכול משהו כתום היום, לכתוב משפט אחד ביומן"]
ADVICE: [1 Hebrew sentence - one clear practical or inner direction]
QUESTION: [1 Hebrew question for self-reflection]`;

    try {
      const tryFetch = async () => {
        const isLocal = window.location.hostname === "localhost";
        const url = isLocal
          ? "https://api.anthropic.com/v1/messages"
          : "/api/claude";
        const headers = isLocal
          ? { "content-type": "application/json", "anthropic-version": "2023-06-01" }
          : { "content-type": "application/json" };
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, messages: [{ role: "user", content: prompt }] }),
        });
        const data = JSON.parse(await res.text());
        if (!res.ok) throw new Error(data?.error?.message || "שגיאה " + res.status);
        return data?.content?.map(b => b.text || "").join("") || "";
      };
      const tryComplete = async () => {
        if (typeof window.claude?.complete !== "function") throw new Error("unavailable");
        return await window.claude.complete(prompt);
      };
      let result = "";
      try { result = await tryFetch(); } catch { result = await tryComplete(); }
      if (!result) throw new Error("תגובה ריקה");
      setText(result);
      setPhase("done");
    } catch (e) {
      setErr(e.message);
      setPhase("revealed");
    }
  }

  const bg = isReversed
    ? "radial-gradient(ellipse at top, #1a0a2e 0%, #0d0d1a 60%)"
    : "radial-gradient(ellipse at top, #0a1628 0%, #0d0d1a 60%)";

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'Assistant', 'Helvetica Neue', Arial, sans-serif", color: "#e8dcc8", display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 1rem", direction: "rtl", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[...Array(35)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: i % 6 === 0 ? "3px" : "1.5px", height: i % 6 === 0 ? "3px" : "1.5px", borderRadius: "50%", background: "#e8dcc8", opacity: 0.1 + (i % 5) * 0.04, top: `${(i * 73 + 17) % 100}%`, left: `${(i * 47 + 31) % 100}%`, animation: `tw ${2 + i % 3}s ease-in-out ${(i % 4) * 0.7}s infinite` }} />
        ))}
      </div>

      <style>{`
        @keyframes tw { 0%,100%{opacity:.08} 50%{opacity:.55} }
        @keyframes flip { 0%{transform:rotateY(0)} 50%{transform:rotateY(90deg)} 100%{transform:rotateY(0)} }
        @keyframes up { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 18px rgba(200,160,80,.25)} 50%{box-shadow:0 0 38px rgba(200,160,80,.55)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "2rem", zIndex: 1 }}>
        <div style={{ fontSize: ".72rem", letterSpacing: ".3em", color: "#a08060", marginBottom: ".4rem" }}>{fmtDate()}</div>
        <h1 style={{ fontSize: "clamp(1.6rem,4.5vw,2.4rem)", fontWeight: "300", letterSpacing: ".05em", margin: 0, textShadow: "0 0 30px rgba(200,160,80,.4)" }}>מה הקלפים אומרים היום</h1>
        <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,transparent,#a08060,transparent)", margin: ".7rem auto" }} />
        <p style={{ fontSize: ".85rem", color: "#7a6a55", margin: 0, fontWeight: "300" }}>
          {phase === "intro" ? "פורטונה מחכה לך..." : card.name}
        </p>
      </div>

      <div style={{ zIndex: 1, marginBottom: "1.5rem" }}>
        {phase === "intro" ? (
          <div onClick={() => { setPhase("flipping"); setTimeout(() => setPhase("revealed"), 1200); }}
            style={{ width: 180, height: 300, borderRadius: 12, border: "1px solid #604030", background: "linear-gradient(135deg,#1a0f08,#2a1a10,#1a0f08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", animation: "glow 3s ease-in-out infinite, pulse 4s ease-in-out infinite", position: "relative" }}>
            <div style={{ position: "absolute", inset: 8, border: "1px solid #604030", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <div style={{ fontSize: "2.8rem", opacity: .55 }}>✦</div>
              <div style={{ fontSize: ".6rem", letterSpacing: ".2em", color: "#a08060" }}>לחץ לגלות</div>
              <div style={{ fontSize: "2.8rem", opacity: .55 }}>✦</div>
            </div>
          </div>
        ) : (
          <CardSVG card={card} isReversed={isReversed} animating={phase === "flipping"} />
        )}
      </div>

      {["revealed","loading","done"].includes(phase) && isReversed && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".6rem", marginBottom: "1.2rem", animation: "up .5s ease" }}>
          <div style={{ fontSize: ".68rem", letterSpacing: ".2em", color: "#b060b0", border: "1px solid #6a3060", padding: "3px 12px", borderRadius: 20 }}>✦ קלף הפוך ✦</div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
            {card.keywords.map((k, i) => {
              const palette = [
                { bg: "rgba(180,100,200,.12)", border: "#8a4a9a", color: "#c890e0" },
                { bg: "rgba(100,130,200,.12)", border: "#4a609a", color: "#90a8e0" },
                { bg: "rgba(180,130,60,.12)",  border: "#8a6a30", color: "#d0a060" },
              ];
              const p = palette[i % palette.length];
              return (
                <span key={k} style={{ fontSize: ".65rem", padding: "3px 10px", background: p.bg, border: `1px solid ${p.border}`, borderRadius: 20, color: p.color, letterSpacing: ".06em", fontWeight: "300" }}>{k}</span>
              );
            })}
          </div>
        </div>
      )}

      {phase === "revealed" && !gender && (
        <div style={{ textAlign: "center", animation: "up .6s ease", maxWidth: 340 }}>
          <p style={{ fontSize: ".9rem", color: "#c8b898", fontWeight: "300", marginBottom: "1.2rem", lineHeight: 1.8 }}>
            רגע לפני שאני פותחת את הקלף...<br/>איך לפנות אליך, נשמה?
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", justifyContent: "center" }}>
            {[{ key: "male", label: "אליי — יקירי" }, { key: "female", label: "אליי — יקירתי" }, { key: "plural_m", label: "אלינו — יקיריי" }, { key: "plural_f", label: "אלינו — יקירותיי" }].map(opt => (
              <button key={opt.key} onClick={() => { localStorage.setItem("tarot_gender", opt.key); setGender(opt.key); }}
                style={{ background: "transparent", border: "1px solid #a08040", color: "#e8dcc8", padding: ".6rem 1.2rem", fontSize: ".8rem", letterSpacing: ".08em", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", transition: "background .3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(160,128,64,.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "revealed" && gender && (
        <div style={{ textAlign: "center", animation: "up .4s ease" }}>
          <button onClick={getReading}
            style={{ background: "transparent", border: "1px solid #a08040", color: "#e8dcc8", padding: ".75rem 2rem", fontSize: ".85rem", letterSpacing: ".15em", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", transition: "background .3s", display: "block", margin: "0 auto" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(160,128,64,.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            פורטונה, מה הקלף אומר?
          </button>
          <button onClick={() => { localStorage.removeItem("tarot_gender"); setGender(null); }}
            style={{ background: "transparent", border: "none", color: "#5a4a35", fontSize: ".65rem", letterSpacing: ".1em", cursor: "pointer", fontFamily: "inherit", marginTop: ".6rem", textDecoration: "underline" }}>
            שנה/י פנייה
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div style={{ textAlign: "center", color: "#a08060", animation: "up .5s ease" }}>
          <div style={{ fontSize: "1.8rem", marginBottom: ".4rem", animation: "spin 2s linear infinite", display: "inline-block" }}>✦</div>
          <div style={{ fontSize: ".78rem", letterSpacing: ".15em" }}>פורטונה קוראת את הקלפים...</div>
        </div>
      )}

      {err && (
        <div style={{ color: "#c06060", fontSize: ".8rem", textAlign: "center", padding: "1rem", maxWidth: 400 }}>
          {err}
          <br />
          <button onClick={getReading} style={{ marginTop: ".5rem", background: "transparent", border: "1px solid #c06060", color: "#c06060", padding: ".4rem 1rem", cursor: "pointer", borderRadius: 4, fontFamily: "inherit", fontSize: ".78rem" }}>נסה שוב</button>
        </div>
      )}

      {phase === "done" && text && (
        <div style={{ maxWidth: 520, width: "100%", animation: "up .8s ease", borderTop: "1px solid #3a2a1a", paddingTop: "1.5rem", marginTop: ".5rem" }}>
          {text.split("\n").filter(Boolean).map((line, i) => {
            const labelMap = { "MEANING:": "משמעות הקלף", "MESSAGE:": "מסר ליום", "ADVICE:": "עצה מעשית", "QUESTION:": "שאלה לחשיבה" };
            const label = Object.keys(labelMap).find(k => line.startsWith(k));
            if (label) return (
              <div key={i} style={{ marginBottom: "1.2rem" }}>
                <div style={{ fontSize: ".65rem", letterSpacing: ".2em", color: "#a08060", marginBottom: ".4rem", textTransform: "uppercase", fontWeight: "400" }}>{labelMap[label]}</div>
                <p style={{ margin: 0, lineHeight: 1.9, fontSize: ".92rem", color: "#c8b898", fontWeight: "300" }}>{line.slice(label.length).trim()}</p>
              </div>
            );
            if (line.startsWith("RITUAL:")) {
              const items = line.slice("RITUAL:".length).trim().split(",").map(s => s.trim()).filter(Boolean);
              return (
                <div key={i} style={{ marginBottom: "1.4rem" }}>
                  <div style={{ fontSize: ".65rem", letterSpacing: ".2em", color: "#a08060", marginBottom: ".7rem", textTransform: "uppercase", fontWeight: "400" }}>לעשות היום</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                    {items.map((item, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: ".6rem" }}>
                        <span style={{ color: "#a08060", fontSize: ".75rem", marginTop: ".15rem", flexShrink: 0 }}>✦</span>
                        <span style={{ fontSize: ".9rem", color: "#d8c8a0", fontWeight: "300", lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return <p key={i} style={{ lineHeight: 1.9, fontSize: ".92rem", color: "#c8b898", fontWeight: "300", marginBottom: ".5rem" }}>{line}</p>;
          })}
          <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #3a2a1a", textAlign: "center", fontSize: ".75rem", color: "#8a7a60", letterSpacing: ".08em", fontStyle: "italic", fontWeight: "300" }}>
            פורטונה תחכה לך מחר עם קלף חדש ✦
          </div>
        </div>
      )}
    </div>
  );
}
