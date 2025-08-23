# 🛡️ **Real-Time Phishing Detection Extension**

<div align="center">

```
  ____  _     _     _    __  __                    
|  _ \| |__ (_)___| |__ \ \/ /___ __ _ _ __   ___ 
| |_) | '_ \| / __| '_ \ \  // __/ _` | '_ \ / _ \
|  __/| | | | \__ \ | | |/  \ (_| (_| | |_) |  __/
|_|   |_| |_|_|___/_| |_/_/\_\___\__,_| .__/ \___|
                                      |_|         
```
<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&size=22&duration=3000&pause=1000&color=FF6B35&center=true&vCenter=true&width=600&lines=%F0%9F%9A%A8+Protect+yourself+from+malicious+websites;%E2%9A%A1+Real-time+ML-powered+detection;%F0%9F%94%92+Your+digital+safety+companion" alt="Typing SVG" />
<br>


</div>
<div align="center">
  
  ![JavaScript](https://img.shields.io/badge/Built%20With-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![ML Model](https://img.shields.io/badge/ML%20Model-Random%20Forest-4CAF50?style=for-the-badge&logo=scikit-learn&logoColor=white)
  ![Status](https://img.shields.io/badge/Status-Completed-00C853?style=for-the-badge&logo=checkmarx&logoColor=white)


</div>

<div align="center">
  <h3>🔍 Stay Protected While You Browse</h3>
  <p>A powerful browser extension that <b>detects phishing websites in real-time</b> using<br>advanced machine learning and multiple threat intelligence APIs.</p>
  
  [📥 Installation](#️-installation-guide) • 
  [🚀 Features](#-features) • 
  [🛠️ How It Works](#-how-it-works) • 
  [👨‍💻 Contribute](#-contribution)
</div>

---

## 💫 Demo & Screenshots


  ![PhishXcape](/Output/Result.png)  
  ![PhishXcape](/Output/Result2.png)  


---

## 🚀 Features

<div align="center">
  <table>
    <tr>
      <th>Feature</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>⚡ <b>Real-Time Detection</b></td>
      <td>Instantly scans and analyzes websites as you browse</td>
    </tr>
    <tr>
      <td>🔍 <b>Multi-Layer Protection</b></td>
      <td>Combines API checks with ML models for comprehensive coverage</td>
    </tr>
    <tr>
      <td>🧠 <b>Smart ML Model</b></td>
      <td>Random Forest classifier trained on thousands of phishing URLs</td>
    </tr>
    <tr>
      <td>🔌 <b>Offline Capability</b></td>
      <td>Works even without internet connection using local ML model</td>
    </tr>
    <tr>
      <td>🔐 <b>Privacy-Focused</b></td>
      <td>No data collection or tracking - your browsing stays private</td>
    </tr>
    <tr>
      <td>⚠️ <b>Clear Alerts</b></td>
      <td>Intuitive warning system with actionable safety information</td>
    </tr>
  </table>
</div>

---

## 🧰 Tech Stack

<div align="center">
  <table>
    <tr>
      <td align="center"><img src="https://img.icons8.com/color/48/000000/javascript.png"/><br>JavaScript</td>
      <td align="center"><img src="https://img.icons8.com/color/48/000000/html-5.png"/><br>HTML5</td>
      <td align="center"><img src="https://img.icons8.com/color/48/000000/css3.png"/><br>CSS3</td>
      <td align="center"><img src="https://img.icons8.com/color/48/000000/python.png"/><br>Python</td>
      <td align="center"><img src="https://img.icons8.com/ios-filled/50/FFFFFF/machine-learning.png"/><br>ML</td>
    </tr>
  </table>

  
### 🌐 **API Integrations**

<table align="center">
<tr>
<td align="center">
<img src="https://img.shields.io/badge/Google-Safe_Browsing-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</td>
<td align="center">
<img src="https://img.shields.io/badge/VirusTotal-API-394EFF?style=for-the-badge&logo=virustotal&logoColor=white" />
</td>
</tr>
</table>
</div>

---

## 🛠️ How It Works

<div align="center">
  <img src="/Output/Architecture diagram.png" width="800" alt="How It Works"/>
</div>

---

## 🛠️ Installation Guide

### 🔗 Load Extension Manually in Chrome

1. Clone or download this repository.
2. Open `chrome://extensions/` in your browser.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `extension/` folder.
6. The extension will now appear in your toolbar!

---

## 📁 Project Structure

<details>
<summary>Click to expand</summary>

```
Phishing Detection FINAL/
│
├── extension/
│   ├── popup.html / popup.js         # Extension UI
│   ├── background.js                 # Persistent logic
│   ├── service_worker.js             # Background messaging
│   ├── contentScript.js              # Page-level interaction
│   ├── utils/                        # Feature extraction & ML logic
│   └── icons/                        # Extension icons
│
├── model/
│   ├── export_model.py               # Export trained model
│   ├── phishing_urls.csv             # Training dataset
│   └── random_forest.pkl             # Trained model (serialized)
│
└── data/
    └── phishing_urls.csv             # Duplicate/backup dataset
```

</details>

---

## 🌟 Future Roadmap

<div align="center">
  <table>
    <tr>
      <td align="center">🧠</td>
      <td><b>Deep Learning Model</b> - Implement LSTM networks for URL pattern recognition</td>
    </tr>
    <tr>
      <td align="center">🌐</td>
      <td><b>Browser Support</b> - Expand to Firefox, Edge, and Safari</td>
    </tr>
    <tr>
      <td align="center">📊</td>
      <td><b>Analytics Dashboard</b> - Add personal safety statistics and insights</td>
    </tr>
    <tr>
      <td align="center">🔄</td>
      <td><b>Auto-Updates</b> - Real-time threat database updates</td>
    </tr>
    <tr>
      <td align="center">🌍</td>
      <td><b>Localization</b> - Support for multiple languages</td>
    </tr>
  </table>
</div>

---

## 🙋‍♂️ Author

<div align="center">
  <img src="https://github.com/jpravin664.png" width="150px" style="border-radius: 50%; border: 3px solid #FF6B35;" alt="Pravin J" />
  <h3>Pravin J</h3>
  <p>🎓 B.Tech CSE (Cybersecurity)<br>
  🏫 SRM Institute of Science and Technology</p>
  
   <a href="https://pravinj-portfolio.vercel.app"><img src="https://img.shields.io/badge/Portfolio-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white" alt="Portfolio"/></a>
  <a href="https://www.linkedin.com/in/pravinj64"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

</div>

---

<div align="center">

### 🛡️ **Stay Protected. Stay Vigilant. Stay Safe.**

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&size=16&duration=2000&pause=1000&color=00D4AA&center=true&vCenter=true&width=500&lines=Made+with+❤️+for+a+safer+internet;Protecting+users+one+click+at+a+time;Open+Source+•+Secure+•+Reliable" alt="Footer" />

</div>