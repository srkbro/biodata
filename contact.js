// contact.js - writes to Firestore collection 'contact_messages'
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contactForm') || document.querySelector('form');
  if(!form) return;
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name') || form.querySelector('[name="name"]')?.value || '';
    const email = fd.get('email') || form.querySelector('[name="email"]')?.value || '';
    const message = fd.get('message') || form.querySelector('[name="message"]')?.value || '';
    if(!name || !email || !message){ alert('Fill all fields'); return; }
    try{
      const db = firebase.firestore();
      await db.collection('contact_messages').add({
        name, email, message, timestamp: Date.now()
      });
      alert('Message sent. Thank you!');
      form.reset();
    }catch(err){ console.error(err); alert('Send failed: '+(err.message||err)); }
  });
});
