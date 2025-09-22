console.log('Gemini Fake Filler: Content script started');

if (window.geminiFillerExecuted) {
  console.log('Gemini Fake Filler: Already executed, skipping');
} else {
  window.geminiFillerExecuted = true;

(async () => {
  console.log('Gemini Fake Filler: Starting form fill process');
  
  const getApiKey = () => new Promise(resolve => {
    chrome.storage.sync.get(['geminiApiKey'], resolve);
  });

  const { geminiApiKey: apiKey } = await getApiKey();
  console.log('Gemini Fake Filler: API key found:', !!apiKey);
  
  if (!apiKey) {
    alert('Please set your Gemini API key first.');
    return;
  }

  const fields = Array.from(document.querySelectorAll('input, textarea')).filter(f => {
    const type = f.type?.toLowerCase();
    return !['hidden', 'submit', 'button', 'reset', 'checkbox', 'radio', 'file'].includes(type) && 
           f.offsetParent !== null && !f.disabled && !f.readOnly;
  });

  console.log('Gemini Fake Filler: Found fields:', fields.length);
  console.log('Gemini Fake Filler: Field details:', fields.map(f => ({
    tag: f.tagName,
    type: f.type,
    name: f.name,
    id: f.id,
    placeholder: f.placeholder
  })));

  if (fields.length === 0) {
    alert('No fillable fields found on this page.');
    return;
  }

  // Fallback data generator
  const generateFallbackData = (field) => {
    const name = (field.name || field.id || field.placeholder || '').toLowerCase();
    const type = field.type?.toLowerCase() || 'text';
    
    if (type === 'email' || name.includes('email')) return 'john.doe@example.com';
    if (name.includes('name')) return 'John Doe';
    if (name.includes('phone')) return '(555) 123-4567';
    if (name.includes('address')) return '123 Main St';
    if (name.includes('city')) return 'New York';
    if (name.includes('zip') || name.includes('postal')) return '10001';
    if (type === 'number' || name.includes('age')) return '25';
    return 'Sample Text';
  };

  try {
    const fieldList = fields.map(f => f.name || f.id || f.placeholder || 'field').join(', ');
    const prompt = `Generate realistic fake data for: ${fieldList}. Return JSON only: {"field1": "value1", "field2": "value2"}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    let fakeData = {};
    let filledCount = 0;

    if (response.ok) {
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const jsonMatch = text.match(/\{[^}]*\}/);
      if (jsonMatch) {
        try {
          fakeData = JSON.parse(jsonMatch[0]);
        } catch (e) {}
      }
    }

    // Fill fields
    fields.forEach(f => {
      const key = f.name || f.id || f.placeholder;
      let value = fakeData[key] || generateFallbackData(f);
      
      f.value = value;
      f.dispatchEvent(new Event('input', { bubbles: true }));
      f.dispatchEvent(new Event('change', { bubbles: true }));
      filledCount++;
    });

    alert(`Filled ${filledCount} fields!`);
    
  } catch (error) {
    // Use fallback data on any error
    fields.forEach(f => {
      f.value = generateFallbackData(f);
      f.dispatchEvent(new Event('input', { bubbles: true }));
      f.dispatchEvent(new Event('change', { bubbles: true }));
    });
    alert(`Filled ${fields.length} fields with fallback data.`);
  }

  setTimeout(() => { window.geminiFillerExecuted = false; }, 1000);
})();
}
