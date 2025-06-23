chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'BLOCK_PHISH') {
    try {
      // Create a modal overlay
      const overlay = document.createElement('div');
      overlay.id = 'phish-block-overlay';
      overlay.innerHTML = `
        <div id="phish-block-modal">
          <div class="phish-block-header">
            <div class="phish-block-icon-container">
              <svg class="phish-block-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#D32F2F"/>
                <path d="M12 7C11.45 7 11 7.45 11 8V13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13V8C13 7.45 12.55 7 12 7ZM11 16C11 15.45 11.45 15 12 15C12.55 15 13 15.45 13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16Z" fill="#D32F2F"/>
              </svg>
              <div class="phish-block-pulse"></div>
            </div>
            <h1>Security Alert: Phishing Detected</h1>
            <p class="phish-block-subtitle">This website has been flagged as potentially dangerous</p>
          </div>
          
          <div class="phish-block-content">
            <div class="phish-block-url-container">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 17H7C5.89543 17 5 16.1046 5 15V5C5 3.89543 5.89543 3 7 3H13C14.1046 3 15 3.89543 15 5V9" stroke="#D32F2F" stroke-width="2" stroke-linecap="round"/>
                <path d="M9 15L19 5" stroke="#D32F2F" stroke-width="2" stroke-linecap="round"/>
                <path d="M15 5H19V9" stroke="#D32F2F" stroke-width="2" stroke-linecap="round"/>
                <path d="M17 17V21C17 22.1046 17.8954 23 19 23H21C22.1046 23 23 22.1046 23 21V15C23 13.8954 22.1046 13 21 13H17" stroke="#D32F2F" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span class="phish-block-url">${msg.url}</span>
            </div>
            
            <div class="phish-block-warning">
              <div class="phish-block-warning-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#FFC107"/>
                  <path d="M12 7C11.45 7 11 7.45 11 8V13C11 13.55 11.45 14 12 14C12.55 14 13 13.55 13 13V8C13 7.45 12.55 7 12 7ZM11 16C11 15.45 11.45 15 12 15C12.55 15 13 15.45 13 16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16Z" fill="#FFC107"/>
                </svg>
              </div>
              <div class="phish-block-warning-content">
                <h3>Phishing Warning</h3>
                <p>This website is attempting to impersonate a legitimate service to steal your personal information, including passwords, credit card numbers, and other sensitive data.</p>
              </div>
            </div>
            
            <div class="phish-block-recommendation">
              <div class="phish-block-recommendation-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50"/>
                </svg>
                <h3>Recommended Action</h3>
              </div>
              <p>Immediately close this page and do not enter any personal information. If you believe this is a mistake, you can report it to our security team.</p>
            </div>
          </div>
          
          <div class="phish-block-buttons">
            <button id="phish-block-back" class="phish-block-primary-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Back to Safety</span>
            </button>
            <div class="phish-block-button-group">
              <button id="phish-block-proceed" class="phish-block-secondary-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Proceed Anyway</span>
              </button>
            </div>
          </div>
        </div>
        
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          #phish-block-overlay { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(0, 0, 0, 0.9); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            z-index: 2147483647; 
            backdrop-filter: blur(8px);
            animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            padding: 1rem;
            box-sizing: border-box;
          }
          
          #phish-block-modal { 
            background: #ffffff; 
            padding: 2.5rem; 
            border-radius: 16px; 
            max-width: 560px; 
            width: 100%; 
            text-align: center; 
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
            transform-origin: center bottom;
            position: relative;
            overflow: hidden;
          }
          
          #phish-block-modal::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #D32F2F 0%, #F44336 100%);
          }
          
          .phish-block-header {
            margin-bottom: 2rem;
            position: relative;
          }
          
          .phish-block-icon-container {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
          }
          
          .phish-block-icon {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 2;
          }
          
          .phish-block-pulse {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(211, 47, 47, 0.2);
            border-radius: 50%;
            animation: pulse 2s infinite;
            z-index: 1;
          }
          
          #phish-block-modal h1 { 
            margin: 0 0 0.25rem; 
            color: #1A1A1A; 
            font-size: 1.75rem; 
            font-weight: 700;
            line-height: 1.3;
            letter-spacing: -0.02em;
          }
          
          .phish-block-subtitle {
            color: #666;
            font-size: 1rem;
            margin: 0;
            font-weight: 500;
          }
          
          .phish-block-content {
            text-align: left;
            margin-bottom: 2.5rem;
          }
          
          .phish-block-url-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #FFF5F5;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            border-left: 4px solid #D32F2F;
          }
          
          .phish-block-url {
            color: #D32F2F;
            word-break: break-all;
            font-family: 'SF Mono', 'Roboto Mono', monospace;
            font-size: 0.9rem;
            font-weight: 500;
          }
          
          .phish-block-warning {
            background: #FFF8E6;
            border-radius: 8px;
            padding: 1rem;
            margin: 1.5rem 0;
            display: flex;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .phish-block-warning-icon {
            background: #FFC107;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
          }
          
          .phish-block-warning-content h3 {
            margin: 0 0 0.5rem;
            color: #E65100;
            font-size: 1.1rem;
            font-weight: 600;
          }
          
          .phish-block-warning-content p {
            margin: 0;
            color: #5C3B00;
            font-size: 0.95rem;
            line-height: 1.5;
          }
          
          .phish-block-recommendation {
            background: #F5F9F5;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #4CAF50;
          }
          
          .phish-block-recommendation-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          
          .phish-block-recommendation h3 {
            margin: 0;
            color: #2E7D32;
            font-size: 1.1rem;
            font-weight: 600;
          }
          
          .phish-block-recommendation p {
            margin: 0;
            color: #1B5E20;
            font-size: 0.95rem;
            line-height: 1.5;
          }
          
          .phish-block-buttons { 
            display: flex; 
            flex-direction: column;
            gap: 1rem;
          }
          
          .phish-block-button-group {
            display: flex;
            gap: 0.75rem;
          }
          
          .phish-block-buttons button { 
            padding: 1rem 1.5rem; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            font-size: 1rem; 
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            flex: 1;
          }
          
          .phish-block-primary-btn {
            background: linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%);
            color: #fff;
            box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
          }
          
          .phish-block-primary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(211, 47, 47, 0.4);
          }
          
          .phish-block-primary-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(211, 47, 47, 0.3);
          }
          
          .phish-block-secondary-btn {
            background: #fff;
            color: #666;
            border: 1px solid #E0E0E0 !important;
          }
          
          .phish-block-secondary-btn:hover {
            background: #f9f9f9;
            border-color: #BDBDBD !important;
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          
          .phish-block-tertiary-btn {
            background: transparent;
            color: #1976D2;
            border: 1px solid rgba(25, 118, 210, 0.3) !important;
          }
          
          .phish-block-tertiary-btn:hover {
            background: rgba(25, 118, 210, 0.08);
            color: #0D47A1;
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.8;
            }
            70% {
              transform: scale(1.3);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        </style>
      `;
      document.documentElement.appendChild(overlay);

      // Attach button handlers
      document.getElementById('phish-block-back').addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.4s ease-out forwards';
        setTimeout(() => window.history.back(), 400);
      });
      
      document.getElementById('phish-block-proceed').addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.4s ease-out forwards';
        setTimeout(() => overlay.remove(), 400);
      });
      
      document.getElementById('phish-block-report').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'REPORT_URL', url: msg.url });
        const reportBtn = document.getElementById('phish-block-report');
        reportBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Report Submitted</span>
        `;
        reportBtn.disabled = true;
        setTimeout(() => {
          overlay.style.animation = 'fadeOut 0.4s ease-out forwards';
          setTimeout(() => overlay.remove(), 400);
        }, 1500);
      });
      
      // Add fadeOut animation to style
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeOut {
          to { opacity: 0; transform: translateY(20px); }
        }
      `;
      document.head.appendChild(style);
    } catch (err) {
      console.error('Error rendering phishing overlay:', err);
    }
  }
});