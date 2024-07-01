document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");

  // Load the current state from storage
  chrome.storage.sync.get("enabled", (data) => {
    toggle.checked = data.enabled !== false;
  });

  // Add a change event listener to the checkbox
  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ enabled: toggle.checked });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: setExtensionState,
        args: [toggle.checked],
      });
    });
  });
});

function setExtensionState(enabled) {
  if (enabled) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    observer.disconnect();
  }
}
