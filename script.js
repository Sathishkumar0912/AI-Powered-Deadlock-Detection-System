// Array of final deadlock report messages for 10 scenarios
const scenarios = [
  "Word locks the document to avoid changes while printing. PDF printer needs to read the file. → Deadlock occurred.",
  "Antivirus locks a file to scan it. Backup software tries to copy the file. → Deadlock occurred.",
  "Windows Update locks system files for patching while the driver installer needs access. → Deadlock occurred.",
  "VLC locks a media file for playback while an indexer scans metadata. → Deadlock occurred.",
  "Photoshop locks a file for editing while OneDrive tries to sync. → Deadlock occurred.",
  "Zoom locks the webcam while the Camera app requests access. → Deadlock occurred.",
  "VM locks a file for read/write while the Host OS accesses it. → Deadlock occurred.",
  "Excel’s background process causes conflicting read/write locks. → Deadlock occurred.",
  "Both code editors access the same folder concurrently. → Deadlock occurred.",
  "Video is played and saved simultaneously, causing file locking. → Deadlock occurred."
];

// Array of simulation step logs for each scenario
const simulationSteps = [
  [ // Scenario 0: Word
    "🟢 Process 'WordPrinter' created.",
    "🔒 'WordPrinter' locks Document.docx.",
    "🟢 Process 'PDFPrinter' created.",
    "🔒 'PDFPrinter' requests Document.docx.",
    "⚠️ Deadlock detected between 'WordPrinter' and 'PDFPrinter'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by releasing 'PDFPrinter'."
  ],
  [ // Scenario 1: Antivirus
    "🟢 Process 'AntivirusScan' created.",
    "🔒 'AntivirusScan' locks File_A.exe.",
    "🟢 Process 'BackupService' created.",
    "🔒 'BackupService' requests File_A.exe.",
    "⚠️ Deadlock detected between 'AntivirusScan' and 'BackupService'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by pausing 'BackupService'."
  ],
  [ // Scenario 2: Device Manager / Windows Update
    "🟢 Process 'UpdateService' created.",
    "🔒 'UpdateService' locks system files.",
    "🟢 Process 'DriverInstaller' created.",
    "🔒 'DriverInstaller' requests system files.",
    "⚠️ Deadlock detected between 'UpdateService' and 'DriverInstaller'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by delaying 'DriverInstaller'."
  ],
  [ // Scenario 3: VLC
    "🟢 Process 'VLCPlayer' created.",
    "🔒 'VLCPlayer' locks media file for playback.",
    "🟢 Process 'MediaIndexer' created.",
    "🔒 'MediaIndexer' requests media file.",
    "⚠️ Deadlock detected between 'VLCPlayer' and 'MediaIndexer'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by postponing 'MediaIndexer'."
  ],
  [ // Scenario 4: Photoshop
    "🟢 Process 'Photoshop' created.",
    "🔒 'Photoshop' locks image file for editing.",
    "🟢 Process 'OneDriveSync' created.",
    "🔒 'OneDriveSync' requests file access.",
    "⚠️ Deadlock detected between 'Photoshop' and 'OneDriveSync'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by pausing 'OneDriveSync'."
  ],
  [ // Scenario 5: Zoom
    "🟢 Process 'ZoomMeeting' created.",
    "🔒 'ZoomMeeting' locks the webcam.",
    "🟢 Process 'CameraApp' created.",
    "🔒 'CameraApp' requests webcam access.",
    "⚠️ Deadlock detected between 'ZoomMeeting' and 'CameraApp'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by terminating 'CameraApp'."
  ],
  [ // Scenario 6: VM
    "🟢 Process 'VirtualMachine' created.",
    "🔒 'VirtualMachine' locks a shared file.",
    "🟢 Process 'HostService' created.",
    "🔒 'HostService' requests the shared file.",
    "⚠️ Deadlock detected between 'VirtualMachine' and 'HostService'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by releasing lock in 'VirtualMachine'."
  ],
  [ // Scenario 7: Excel
    "🟢 Process 'ExcelInstance1' created.",
    "🔒 'ExcelInstance1' starts editing a file.",
    "🟢 Process 'ExcelInstance2' created.",
    "🔒 'ExcelInstance2' attempts to write to the same file.",
    "⚠️ Deadlock detected due to conflicting operations.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by closing 'ExcelInstance2'."
  ],
  [ // Scenario 8: Code Editors
    "🟢 Process 'Editor1' created.",
    "🔒 'Editor1' locks project folder.",
    "🟢 Process 'Editor2' created.",
    "🔒 'Editor2' requests access to project folder.",
    "⚠️ Deadlock detected between 'Editor1' and 'Editor2'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by prioritizing 'Editor1'."
  ],
  [ // Scenario 9: Video File
    "🟢 Process 'VideoPlayer' created.",
    "🔒 'VideoPlayer' locks video file for playback.",
    "🟢 Process 'VideoSaver' created.",
    "🔒 'VideoSaver' requests to save the video concurrently.",
    "⚠️ Deadlock detected between 'VideoPlayer' and 'VideoSaver'.",
    "🤖 AI analyzing deadlock...",
    "✅ AI resolved deadlock by delaying 'VideoSaver'."
  ]
];

// Function to update the process log panel with a given message.
function logMessage(message) {
  const logContainer = document.getElementById("logContent");
  const entry = document.createElement("div");
  entry.textContent = new Date().toLocaleTimeString() + " - " + message;
  logContainer.appendChild(entry);
  logContainer.scrollTop = logContainer.scrollHeight;
}

// The main function that starts the scenario simulation.
// When an icon is clicked, it shows the deadlock report modal with a "Resolve" button.
// Only after clicking "Resolve" does the process log update step-by-step.
function startScenario(index) {
  // Immediately show the deadlock report modal.
  showModal(`Deadlock Report for Scenario ${index + 1}:\n${scenarios[index]}`);
}

// Function called when "Resolve Deadlock" button is clicked in the modal.
function resolveDeadlock() {
  // Close the modal.
  closeModal();
  
  // Clear previous log messages.
  document.getElementById("logContent").innerHTML = "";
  
  // Start updating the process log with simulation steps.
  // For this, we fetch the simulation steps for the scenario.
  // (For simplicity, we assume the same scenario that was displayed last.)
  // You can maintain a global variable for the current scenario if needed.
  // Here, for demo purposes, we use the simulationSteps array index.
  
  // In this example, we assume the last scenario index is stored in "currentScenarioIndex".
  // For simplicity, I'll simulate with scenario 0; you can adjust accordingly.
  let currentScenarioIndex = window.currentScenarioIndex || 0;
  let step = 0;
  const steps = simulationSteps[currentScenarioIndex];
  
  const simulationInterval = setInterval(() => {
    if (step < steps.length) {
      logMessage(steps[step]);
      step++;
    } else {
      clearInterval(simulationInterval);
    }
  }, 1000);
  
  // Play a click sound if available.
  const clickSound = document.getElementById("click-sound");
  if (clickSound) clickSound.play();
}

// Helper function to show the modal with a message.
function showModal(message) {
  const modal = document.getElementById("modal");
  document.getElementById("modalText").textContent = message;
  modal.style.display = "flex";
  
  // Optionally, store the current scenario index globally.
  // Here, we parse the scenario index from the message (if needed).
  // For simplicity, you can set a global variable when startScenario is called.
  window.currentScenarioIndex = message.match(/Scenario (\d+)/) ? parseInt(message.match(/Scenario (\d+)/)[1]) - 1 : 0;
  
  // Play an alert sound if available.
  const alertSound = document.getElementById("alert-sound");
  if (alertSound) alertSound.play();
}

// Function to close the modal.
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Optional: Demo mode to automatically cycle through scenarios.
function startDemo() {
  let index = 0;
  if (window.demoInterval) clearInterval(window.demoInterval);
  window.demoInterval = setInterval(() => {
    if (index >= scenarios.length) {
      clearInterval(window.demoInterval);
    } else {
      startScenario(index);
      window.currentScenarioIndex = index;
      index++;
    }
  }, 8000); // 8 seconds per scenario
}
