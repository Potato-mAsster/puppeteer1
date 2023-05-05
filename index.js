const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://habr.com/ru/')

    const titles = await page.evaluate(() => {
        const result = [];
        const items = document.querySelectorAll('h2.tm-title.tm-title_h2');

        items.forEach(item => {
            result.push(item.innerText);
        });

        return result;
    });

    const html = `<ul>\n${titles.map(titles =>` <li>${titles}</li>\n`).join('')}</ul>`;
    
    fs.writeFile('index.html', html,err => {
        if (err)throw err;
        console.log('изменения сохранены в файл index.html');
    })
    await browser.close();
})();

async function getPic() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.screenshot({ path: 'screenshot.png'});
    await browser.close();
}

getPic();