// js/script.js

console.log("Script Loaded!");

document.addEventListener('DOMContentLoaded', function () {
  const assessmentForm = document.getElementById('assessmentForm');
  if (assessmentForm) {
    assessmentForm.addEventListener('submit', function (e) {
      const form = new FormData(assessmentForm);
      const doshas = { vata: 0, pitta: 0, kapha: 0 };
      for (let i = 1; i <= 12; i++) {
        const v = form.get('q' + i);
        if (v && doshas.hasOwnProperty(v)) doshas[v]++;
      }
      let result;
      if (doshas.pitta > doshas.vata && doshas.pitta > doshas.kapha) result = 'Pitta';
      else if (doshas.kapha > doshas.vata && doshas.kapha > doshas.pitta) result = 'Kapha';
      else if (doshas.vata > doshas.pitta && doshas.vata > doshas.kapha) result = 'Vata';
      else {
        const max = Math.max(doshas.vata, doshas.pitta, doshas.kapha);
        const winners = Object.keys(doshas).filter(k => doshas[k] === max);
        result = winners.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');
      }
      const resultArea = document.getElementById('resultArea');
      if (resultArea) {
        resultArea.innerHTML = `<div class="alert alert-light">Detected: <strong>${result}</strong>. Saving to server...</div>`;
      }
    });
  }

  // CHATBOT
  const sendBtn = document.getElementById('sendBtn');
  const userMsg = document.getElementById('userMsg');
  const chatWindow = document.getElementById('chatWindow');

  function appendMsg(text, cls) {
    const div = document.createElement('div');
    div.className = 'message ' + cls;
    div.innerText = text;
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.marginBottom = '6px';
    wrapper.style.justifyContent = cls === 'user' ? 'flex-end' : 'flex-start';
    wrapper.appendChild(div);
    chatWindow.appendChild(wrapper);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  if (sendBtn && userMsg) {
    sendBtn.addEventListener('click', () => {
      const txt = userMsg.value.trim();
      if (!txt) return;
      appendMsg(txt, 'user');
      userMsg.value = '';

      setTimeout(() => {
        const q = txt.toLowerCase();

        
        if (q.includes('vata'))
          appendMsg('Vata is linked to movement & dryness. Try grounding routines: warm oil massage, warm nourishing foods.', 'bot');
        else if (q.includes('pitta'))
          appendMsg('Pitta involves heat and digestion. Prefer cooling foods, avoid excess spice & stress.', 'bot');
        else if (q.includes('kapha'))
          appendMsg('Kapha is stable and heavy. Balance with light exercise, warming spices, and reduce oily foods.', 'bot');
        else if (q.includes('herb') || q.includes('turmeric') || q.includes('ashwagandha'))
          appendMsg('Common herbs include Ashwagandha, Turmeric, Brahmi, and Trikatu. Check the Herbs page for details.', 'bot');
        else if (q.includes('assessment') || q.includes('test') || q.includes('prakriti'))
          appendMsg('You can begin the assessment from the "Start Assessment" button on the homepage.', 'bot');
        else if (q.includes('ayurveda'))
          appendMsg('Ayurveda is a holistic healing system balancing body, mind, and spirit using natural therapies and diet.', 'bot');
        else if (q.includes('diet'))
          appendMsg('A balanced diet for your dosha helps maintain harmony. Vata—warm soups; Pitta—cooling salads; Kapha—light meals.', 'bot');
        else if (q.includes('sleep'))
          appendMsg('Proper sleep restores dosha balance. Vata needs calm bedtime, Pitta should avoid late nights, Kapha should rise early.', 'bot');
        else if (q.includes('stress') || q.includes('anxiety'))
          appendMsg('For stress, practice meditation, gentle yoga, and breathing exercises like Anulom Vilom to calm Vata and Pitta.', 'bot');
        else if (q.includes('skin'))
          appendMsg('Skin issues relate to dosha imbalance. Pitta causes redness, Vata dryness, Kapha oiliness. Balance through diet & herbs.', 'bot');
        else if (q.includes('hair'))
          appendMsg('Hair fall may be due to Vata or Pitta imbalance. Use Brahmi oil or Amla regularly to strengthen roots.', 'bot');
        else if (q.includes('exercise') || q.includes('yoga'))
          appendMsg('Yoga balances all doshas. Vata: grounding poses, Pitta: cooling postures, Kapha: energizing sequences.', 'bot');
        else if (q.includes('season') || q.includes('weather'))
          appendMsg('Doshas fluctuate with seasons—Vata rises in winter, Pitta in summer, Kapha in spring. Adjust your habits accordingly.', 'bot');
        else if (q.includes('tea') || q.includes('drink'))
          appendMsg('Try herbal teas: Vata—ginger, Pitta—mint, Kapha—cinnamon. They help balance your energy naturally.', 'bot');
        else if (q.includes('oil') || q.includes('massage'))
          appendMsg('Abhyanga (oil massage) nourishes the body. Vata—sesame oil, Pitta—coconut oil, Kapha—mustard oil.', 'bot');
        else if (q.includes('detox') || q.includes('cleanse'))
          appendMsg('Panchakarma is Ayurveda’s detox therapy—includes oil massage, steam, and cleansing treatments.', 'bot');
        else
          appendMsg("I can help with Ayurveda, doshas, herbs, diet, yoga, or wellness tips. Try asking about those!", 'bot');

      }, 600);
    });

    userMsg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
      }
    });
  }

  
  const params = new URLSearchParams(window.location.search);
  if (params.has('signup') && params.get('signup') === 'success') {
    alert('Signup successful. Please login.');
  } else if (params.has('error')) {
    const err = params.get('error');
    if (err === 'exists') alert('Email already exists. Please login or use another email.');
    else if (err === 'invalid') alert('Invalid credentials. Try again.');
    else if (err === 'missing') alert('Please fill required fields.');
  }
});
