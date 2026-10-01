# 🌸 Thozhi (தோழி) — The Invisible Woman's Voice Companion

> **Built for PromptWars x Hackarena**  
> *Organized by Google for Developers Community & H2S*  
> **Challenge Track:** The Invisible Woman  
> **SDG Alignment:** Goal 5 (5.1, 5.b), Goal 4 (4.3, 4.4), Goal 10 (10.2)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-success?style=for-the-badge&logo=google-chrome)](https://thozhi-women-assista-pblx.bolt.host)
[![Hackathon](https://img.shields.io/badge/Google%20for%20Developers-Hackarena-blue?style=for-the-badge&logo=google)](https://developers.google.com/)

---

## 📌 Problem Context
In India, **48% of rural women have never used the internet**. Of those who have, most are guided by a male family member[cite: 1]. Millions of eligible women are locked out of essential welfare programs and financial aid—not due to lack of capability, but because digital interfaces are complex, text-heavy, and built in English[cite: 1].

## 💡 The Solution: Thozhi (தோழி)
**Thozhi** (*"Female Companion"*) is an AI-powered, voice-first accessibility platform designed for a first-time woman user with **no English proficiency, zero tech background, and no one to ask**[cite: 1]. 

Tailored specifically for Tamil Nadu's landmark **Kalaignar Magalir Urimai Thogai (KMUT)** scheme (₹1,000/month DBT to women heads of family), Thozhi allows any user to check eligibility, explore guidelines, and understand the application roadmap purely through voice interactions in her native regional language[cite: 1].

---

## ✨ Key Features

- 🗣️ **Bidirectional Voice Loop:** Tap once to speak in conversational Tamil (`ta-IN`) or simple English (`en-IN`), tap to mute, and the platform speaks the response back automatically aloud.
- 🔊 **Instant "Read Aloud" Button:** Prominent home action speaks *"Kalaignar magalir Urimai thogai Vazhigatti"* on demand to orient first-time listeners.
- 🎧 **Contextual Card Readers:** Every single card (Eligibility criteria, Document checklist, Application steps, Appeals) features a 1-tap speaker button that verbally explains the exact step in Tamil or English.
- 📋 **Zero-Entry Scheme Knowledge Engine:** Pre-loaded with official KMUT thresholds:
  - Age ($21+$) & Tamil Nadu residency.
  - Annual income limit ($< ₹2.5 \text{ Lakhs}$).
  - Land ceiling ($< 5 \text{ acres}$ wetland / $< 10 \text{ acres}$ dryland).
  - Domestic electricity limit ($< 3,600 \text{ units/year}$).
  - Clear lists of mandatory documents (Smart Ration Card, Aadhaar, Bank Passbook, EB bill).
- 📱 **Rural-First Mobile UI:** Single-thumb ergonomics, 56px+ touch targets, high contrast, zero technical jargon, and intuitive visual iconography.

---

## 🏗️ System Architecture

```text
       [ User Voice (Tamil / English) ]
                     │
                     ▼
          Web Speech Recognition
         (Continuous listening)
                     │
                     ▼
       Embedded KMUT Knowledge Engine
    (Eligibility, Steps, Verification)
                     │
                     ▼
          Web Speech Synthesis API
        ('ta-IN' / 'en-IN' Vocalizer)
                     │
                     ▼
   [ Spoken Answer Back to Rural User ]
