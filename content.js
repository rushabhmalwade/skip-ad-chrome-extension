let observer;

function clickSkipButton() {
  const skipButton = document.querySelector(".ytp-skip-ad-button");
  if (skipButton) {
    skipButton.click();
  }
}

function initializeObserver() {
  observer = new MutationObserver(() => {
    clickSkipButton();
  });
  chrome.storage.sync.get("enabled", (data) => {
    if (data.enabled !== false) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
}

initializeObserver();

// Additionally, check every 1 second as a fallback
setInterval(() => {
  chrome.storage.sync.get("enabled", (data) => {
    if (data.enabled !== false) {
      clickSkipButton();
    }
  });
}, 1000);
