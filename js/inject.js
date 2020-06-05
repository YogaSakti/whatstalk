function loop () {
    if (!document.querySelector(".two")) {
        setTimeout(loop, 1000);
    } else {
        init()
    }
}

function init () {
    const mutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(async function (mutation) {
            const status = await getStatus()
            if (status) {
                if (mutation.type === 'characterData') {
                    console.log(mutation.target.textContent)
                }
            }
        })
    })
    
    mutationObserver.observe(document.querySelector('#app > div > div'), {
        characterData: true
    })
}

async function getStatus () {
    const currentStatus = await (new Promise((resolve, reject) => {
        chrome.storage.local.get('stalking', (data) => {
            resolve(data)
        })
    }))
    
    if (Object.keys(currentStatus).length === 0) {
        return false
    }

    return currentStatus.stalking
}

loop()