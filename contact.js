// contact.js
// expects firebase compat SDKs to be loaded on the page
if (!window.firebaseConfig) {
  console.error('firebase-config missing');
} else {
  // initialize if not already
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(window.firebaseConfig);
    }
  } catch (e) { /* ignore */ }
}

const db = (window.firebase && firebase.firestore) ? firebase.firestore() : null;

// utility to attach to form
function initContactForm(opts) {
  // opts: { formSelector, nameSelector, emailSelector, messageSelector, submitSelector }
  const f = document.querySelector(opts.formSelector);
  const nameEl = f.querySelector(opts.nameSelector);
  const emailEl = f.querySelector(opts.emailSelector);
  const msgEl = f.querySelector(opts.messageSelector);
  const submitBtn = f.querySelector(opts.submitSelector);

  submitBtn.addEventListener('click', async (ev) => {
    ev.preventDefault();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = msgEl.value.trim();
    if (!name || !email || !message) {
      alert('All fields are required.');
      return;
    }
    if (!db) {
      alert('Database not ready.');
      return;
    }
    submitBtn.disabled = true;
    try {
      await db.collection('contact_messages').add({
        name, email, message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert('Message sent. Thank you.');
      nameEl.value = ''; emailEl.value = ''; msgEl.value = '';
    } catch (err) {
      console.error(err);
      alert('Send failed: ' + err.message);
    } finally {
      submitBtn.disabled = false;
    }
  });
}
