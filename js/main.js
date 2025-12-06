
// Particles: create a few subtle floating particles for premium feel
(function(){
  for(let i=0;i<8;i++){
    const p = document.createElement('div');
    p.className='particle';
    document.body.appendChild(p);
    const x = Math.random()*100, y=Math.random()*100;
    p.style.left = x+'%'; p.style.top = y+'%';
    const dur = 20 + Math.random()*30;
    p.animate([{transform:'translateY(0px)'},{transform:'translateY(-40px)'}],{duration:dur*1000,iterations:Infinity,direction:'alternate',easing:'ease-in-out'});
  }

  // reveal left content
  document.addEventListener('DOMContentLoaded', function(){
    const left = document.querySelector('.hero-left');
    if(left) left.style.transform = 'translateY(0)';
    const photo = document.querySelector('.hero-photo');
    if(photo) photo.classList.add('animated');
    // set year if present
    const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
  });
})();

// contact form submit via fetch
async function submitContact(e){
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Sending...';
  const data = { name: document.getElementById('name').value, email: document.getElementById('email').value, message: document.getElementById('message').value };
  try{
    const res = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const j = await res.json();
    msg.textContent = j.message || 'Sent';
  }catch(err){ msg.textContent = 'Error sending'; }
  setTimeout(()=> msg.textContent = '',5000);
}



// Signature rotator: cycles through signature lines every 3 seconds with fade
(function(){
  const sig = document.getElementById('signature');
  if(!sig) return;
  const items = Array.from(sig.querySelectorAll('.sig-item'));
  let idx = 0;
  setInterval(()=>{
    const prev = items[idx];
    prev.classList.remove('show');
    idx = (idx + 1) % items.length;
    const next = items[idx];
    next.classList.add('show');
  }, 3000);
})();



// Mobile nav toggle
function toggleMobileNav(){
  const el = document.getElementById('mobileNav');
  if(!el) return;
  el.classList.toggle('show');
  const aria = el.classList.contains('show') ? 'true' : 'false';
  el.setAttribute('aria-hidden', aria==='false');
}
