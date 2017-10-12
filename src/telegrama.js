function openTab(url) {
  if (url)
    chrome.tabs.create( {url: `https://web.telegram.org/#/im?tgaddr=tg://msg_url?url=${encodeURI(url)}`})
  }

  function currentTab() {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      openTab(tabs[0].url)
    });
  }

  chrome.contextMenus.create({
    id: "sharePage",
    title: `${chrome.i18n.getMessage("share")} ${chrome.i18n.getMessage("page")}`,
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "shareImage",
    title: `${chrome.i18n.getMessage("share")} ${chrome.i18n.getMessage("image")}`,
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "shareLink",
    title: `${chrome.i18n.getMessage("share")} ${chrome.i18n.getMessage("link")}`,
    contexts: ["link"],
  });

  chrome.contextMenus.create({
    id: "shareSelection",
    title: `${chrome.i18n.getMessage("share")} ${chrome.i18n.getMessage("selection")}`,
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case 'sharePage':
        openTab(info.pageUrl)
        break
      case 'shareImage':
        openTab(info.srcUrl)
        break
      case 'shareLink':
        openTab(info.pageUrl)
        break
        case 'shareSelection':
        openTab(info.selectionText)
        break
    }
  })

  chrome.commands.onCommand.addListener(function(command) {
    if (command == "share") {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
        openTab(tabs[0].url)
    });
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  openTab(tab.url)
});

