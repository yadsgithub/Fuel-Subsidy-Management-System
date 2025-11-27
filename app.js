
// Simple screen manager and simulation logic
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if(el) el.classList.remove('hidden');
  window.scrollTo(0,0);
}

// initial screen
showScreen('citizen-welcome');

function sendOTP(){
  // store simple user data
  const nameInput = document.getElementById('fullname').value || 'Siti';
  document.getElementById('user-name').textContent = nameInput;
  // simulate sending
  alert('OTP sent (simulation). Use 123456 to verify.');
  showScreen('citizen-otp');
}

// OTP verify
function verifyOTP(){
  const code = Array.from(document.querySelectorAll('.otp')).map(i=>i.value).join('');
  if(code === '123456'){
    // mark approved
    document.getElementById('status-text').textContent = 'Approved';
    document.getElementById('meta-mykad').textContent = document.getElementById('mykad').value || '123456-78-9012';
    showScreen('citizen-dashboard');
  } else {
    alert('Incorrect OTP. Try 123456 (simulation).');
  }
}

function refreshQR(){
  alert('QR refreshed (simulation).');
}

// POS simulation
function simulateScan(result){
  if(result === 'eligible'){
    document.getElementById('pos-mykad').textContent = document.getElementById('meta-mykad').textContent || '123456-78-9012';
    showScreen('pos-eligible');
  } else if(result === 'noteligible'){
    showScreen('pos-noteligible');
  } else {
    showScreen('pos-fail');
  }
}

function manualCheck(){
  const m = document.getElementById('manual-mykad').value.trim();
  const out = document.getElementById('manual-result');
  if(!m){ out.textContent = 'Please enter a MyKad to check.'; return; }
  // simple rule: if last digit even -> eligible (simulation)
  const last = m.replace(/[^0-9]/g,'').slice(-1);
  if(!last){ out.textContent = 'Invalid MyKad format.'; return; }
  const even = parseInt(last) % 2 === 0;
  out.textContent = even ? 'Manual check: Eligible (simulation)' : 'Manual check: Not eligible (simulation)';
}
