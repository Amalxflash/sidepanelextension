chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  try {
    if (!tab.url) return;

    const url = new URL(tab.url);
    console.log(`Tab updated: ${url.origin}`);

    await chrome.sidePanel.setOptions({
      tabId,
      path: 'side_panel.html',
      enabled: true
    });

    console.log(`Side panel enabled for tab: ${tabId}`);
  } catch (error) {
    console.error('Error updating side panel options:', error);
  }
});

// Optional: Allow the user to open the side panel by clicking on the extension's action icon
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .then(() => console.log('Panel behavior set to open on action click.'))
    .catch((error) => console.error('Error setting panel behavior:', error));
});
