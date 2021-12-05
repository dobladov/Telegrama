function openInTelegram(currentTab, data) {
  chrome.tabs.query({}, tabs => {
    const telegramTab = tabs.find(tab => tab.url.includes('web.telegram.org'))
    if (telegramTab) {
      if (telegramTab.id !== currentTab.id) {
        chrome.tabs.update(telegramTab.id, {
          active: true,
          // url: `https://web.telegram.org/#/im?tgaddr=tg://msg_url?url=${encodeURIComponent(data)}`
          url: `https://t.me/share/url?url=${encodeURIComponent(data)}`
          // url: `https://web.telegram.org/z/#?tgaddr=tg%3A%2F%2Fmsg_url%3Furl%3Dhttps%253A%252F%252Fcore.telegram.org%252Fwidgets%252Fshare`

        })
      }
    } else if (data) {
      // chrome.tabs.create({url: `https://web.telegram.org/#/im?tgaddr=tg://msg_url?url=${encodeURIComponent(data)}`})
      chrome.tabs.create({url: `https://t.me/share/url?url=${encodeURIComponent(data)}`})
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sharePage",
    // title: `${chrome.i18n.getMessage("share")} ${chrome.i18n.getMessage("page")}`,
    title: "Share page",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "shareImage",
    // title: `${chrome.i18n.getMessage("share")} ${chrome.i18n.getMessage("image")}`,
    title: "Share image",
    contexts: ["image"],
  });

  chrome.contextMenus.create({
    id: "shareLink",
    // title: `${chrome.i18n.getMessage("share")} ${chrome.i18n.getMessage("link")}`,
    title: "Share link",
    contexts: ["link"],
  });

  chrome.contextMenus.create({
    id: "shareSelection",
    // title: `${chrome.i18n.getMessage("share")} ${chrome.i18n.getMessage("selection")}`,
    title: "Share selection",
    contexts: ["selection"],
  });

  chrome.action.onClicked.addListener((currentTab) => {
    openInTelegram(currentTab, currentTab.url)
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case 'sharePage':
        openInTelegram(tab, info.pageUrl)
        break
        case 'shareImage':
          openInTelegram(tab, info.srcUrl)
        break
        case 'shareLink':
          openInTelegram(tab, info.pageUrl)
        break
        case 'shareSelection':
        openInTelegram(tab, info.selectionText)
        break
      }
  })

  chrome.commands.onCommand.addListener(function(command) {
    if (command == "share") {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        openInTelegram(tabs[0], tabs[0].url)
      });
    }
  });
})
