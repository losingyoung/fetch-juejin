const puppeteer = require('puppeteer-core')

const run = async () => {
    
    const browser = await puppeteer.launch({
        executablePath: './chrome/chrome.exe',
        headless: false
    });
    const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36")
    // try {
    await page.goto('https://juejin.im/welcome/frontend');
    // } catch (error) {
    // await page.waitFor(2000)
    const executionContext = await page.mainFrame().executionContext();
    console.log('start running, fetch article', 100)
    await executionContext.evaluate(() => {
        window._getPage = 1
    })
    const frontList = await executionContext.evaluate(async () => {
        let list = []
        let i = window._getPage
        let after = ""
        while (i--) {
            let data = await fetchList(after)
            after = data.articleFeed.items.pageInfo.endCursor || ""
            list = list.concat(data.articleFeed.items.edges)
        }
        return list
        function fetchList(after) {
            let body = { "operationName": "", "query": "", "variables": { "tags": [], "category": "5562b415e4b00c57d9b94ac8", "first": 100, "after": after, "order": "POPULAR" }, "extensions": { "query": { "id": "653b587c5c7c8a00ddf67fc66f989d42" } } }
            return new Promise(resolve => {
                fetch('https://web-api.juejin.im/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 'X-Agent': 'Juejin/Web', 'X-Legacy-Device-Id': 1552052113506,
                        'X-Legacy-Token': 'eyJhY2Nlc3NfdG9rZW4iOiJXQUF2clRrNlBkVFl4R2pmIiwicmVmcmVzaF90b2tlbiI6ImdUOGxBYW5iRXFkTm8xTzgiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
                        'X-Legacy-Uid': ''
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(r => resolve(r.data))
            })
        }
    });
    let fincluded = getIncluded(frontList)
    console.log(`前端: 总数:${frontList.length} 包含: ${fincluded.length} per: ${getPercent(fincluded, frontList)} ` )
    // return
    const backResult = await executionContext.evaluate(async () => {
        let list = []
        let i = window._getPage
        let after = ""
        while (i--) {
            let data = await fetchList(after)
            after = data.articleFeed.items.pageInfo.endCursor || ""
            list = list.concat(data.articleFeed.items.edges)
        }
        return list
        function fetchList(after) {
            let body = { "operationName": "", "query": "", "variables": { "tags": [], "category": "5562b419e4b00c57d9b94ae2", "first": 100, "after": after, "order": "POPULAR" }, "extensions": { "query": { "id": "653b587c5c7c8a00ddf67fc66f989d42" } } }
            return new Promise(resolve => {
                fetch('https://web-api.juejin.im/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 'X-Agent': 'Juejin/Web', 'X-Legacy-Device-Id': 1552052113506,
                        'X-Legacy-Token': 'eyJhY2Nlc3NfdG9rZW4iOiJXQUF2clRrNlBkVFl4R2pmIiwicmVmcmVzaF90b2tlbiI6ImdUOGxBYW5iRXFkTm8xTzgiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
                        'X-Legacy-Uid': ''
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(r => resolve(r.data))
            })
        }
    });
    let bincluded = getIncluded(backResult)
    console.log(`后端: 总数:${backResult.length} 包含: ${bincluded.length} per: ${getPercent(bincluded, backResult)} ` )
    
    const androidResult = await executionContext.evaluate(async () => {
        let list = []
        let i = window._getPage
        let after = ""
        while (i--) {
            let data = await fetchList(after)
            after = data.articleFeed.items.pageInfo.endCursor || ""
            list = list.concat(data.articleFeed.items.edges)
        }
        return list
        function fetchList(after) {
            let body = { "operationName": "", "query": "", "variables": { "tags": [], "category": "5562b410e4b00c57d9b94a92", "first": 100, "after": after, "order": "POPULAR" }, "extensions": { "query": { "id": "653b587c5c7c8a00ddf67fc66f989d42" } } }
            return new Promise(resolve => {
                fetch('https://web-api.juejin.im/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 'X-Agent': 'Juejin/Web', 'X-Legacy-Device-Id': 1552052113506,
                        'X-Legacy-Token': 'eyJhY2Nlc3NfdG9rZW4iOiJXQUF2clRrNlBkVFl4R2pmIiwicmVmcmVzaF90b2tlbiI6ImdUOGxBYW5iRXFkTm8xTzgiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
                        'X-Legacy-Uid': ''
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(r => resolve(r.data))
            })
        }
    });
    let anincluded = getIncluded(androidResult)
    console.log(`安卓: 总数:${androidResult.length} 包含: ${anincluded.length} per: ${getPercent(anincluded, androidResult)} ` )
    const iosResult = await executionContext.evaluate(async () => {
        let list = []
        let i = window._getPage
        let after = ""
        while (i--) {
            let data = await fetchList(after)
            after = data.articleFeed.items.pageInfo.endCursor || ""
            list = list.concat(data.articleFeed.items.edges)
        }
        return list
        function fetchList(after) {
            let body = { "operationName": "", "query": "", "variables": { "tags": [], "category": "5562b405e4b00c57d9b94a41", "first": 100, "after": after, "order": "POPULAR" }, "extensions": { "query": { "id": "653b587c5c7c8a00ddf67fc66f989d42" } } }
            return new Promise(resolve => {
                fetch('https://web-api.juejin.im/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 'X-Agent': 'Juejin/Web', 'X-Legacy-Device-Id': 1552052113506,
                        'X-Legacy-Token': 'eyJhY2Nlc3NfdG9rZW4iOiJXQUF2clRrNlBkVFl4R2pmIiwicmVmcmVzaF90b2tlbiI6ImdUOGxBYW5iRXFkTm8xTzgiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
                        'X-Legacy-Uid': ''
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(r => resolve(r.data))
            })
        }
    });
    let iincluded = getIncluded(iosResult)
    console.log(`IOS: 总数:${iosResult.length} 包含: ${iincluded.length} per: ${getPercent(iincluded, iosResult)} ` )
    const aiResult = await executionContext.evaluate(async () => {
        let list = []
        let i = window._getPage
        let after = ""
        while (i--) {
            let data = await fetchList(after)
            after = data.articleFeed.items.pageInfo.endCursor || ""
            list = list.concat(data.articleFeed.items.edges)
        }
        return list
        function fetchList(after) {
            let body = { "operationName": "", "query": "", "variables": { "tags": [], "category": "57be7c18128fe1005fa902de", "first": 100, "after": after, "order": "POPULAR" }, "extensions": { "query": { "id": "653b587c5c7c8a00ddf67fc66f989d42" } } }
            return new Promise(resolve => {
                fetch('https://web-api.juejin.im/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 'X-Agent': 'Juejin/Web', 'X-Legacy-Device-Id': 1552052113506,
                        'X-Legacy-Token': 'eyJhY2Nlc3NfdG9rZW4iOiJXQUF2clRrNlBkVFl4R2pmIiwicmVmcmVzaF90b2tlbiI6ImdUOGxBYW5iRXFkTm8xTzgiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
                        'X-Legacy-Uid': ''
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json()).then(r => resolve(r.data))
            })
        }
    });
    let aiincluded = getIncluded(aiResult)
    console.log(`AI: 总数:${aiResult.length} 包含: ${aiincluded.length} per: ${getPercent(aiincluded, aiResult)} ` )

     function getIncluded(list) {
         return list.filter(getTargetTitle)
     }
    function getPercent(included, all) {
        return (included.length / all.length) *100 + '%'
    }
    function getTargetTitle(item) {
        return item.node.title.match(/面试|春招|秋招|社招|校招|offer/gi)
    }
    // console.log(frontResult.length, backResult.length, iosResult.length, androidResult.length, aiResult.length)
    // await page.close()
    await browser.close()
}


run()
