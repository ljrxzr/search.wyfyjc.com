window.onload = function () {
    localStorage.removeItem(null);
    
    <!-- 初始化默认搜索引擎 -->
    let search_engine = document.getElementById('search_engine');
    for (let i = 0; i < search_engine.length; i++) {
        if (search_engine.options[i].text === localStorage.getItem('search_engine')) {
            search_engine.options[i].setAttribute('selected', true);
        }
    }
};

<!-- 发起搜索（Bing） -->
function search_input() {
    
    let search_engine = document.getElementById('search_engine');
    let search_engine_name = search_engine.options[search_engine.selectedIndex].text;
    
    if (event.keyCode === 13) {
        let search_url = '';
        
        <!-- 处理搜索引擎 -->
        switch (search_engine_name) {
            case 'Google':
                search_url = search_url.concat('https://google.com/search?q=');
                localStorage.setItem('search_engine', 'Google');
                break;
            case 'Bing':
                search_url = search_url.concat('https://bing.com/search?q=');
                localStorage.setItem('search_engine', 'Bing');
                break;
            case 'Baidu':
                search_url = search_url.concat('https://baidu.com/s?wd=');
                localStorage.setItem('search_engine', 'Baidu');
                break;
        }
        
        <!-- 追加搜索词 -->
        let search_input = document.getElementById('search_input').value;
        search_url = search_url.concat(search_input);
        
        <!-- 追加已屏蔽网站 -->
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === 'search_engine') {
                continue;
            }
            let site = localStorage.getItem(String(i));
            site = '+-site%3A'.concat(site);
            search_url = search_url.concat(site);
        }
        
        console.log(search_url);
        window.open(search_url);
    }
}

<!-- 新增屏蔽 -->
function insert_site() {
    <!-- 写入屏蔽网站，并清空内容 -->
    let site = document.getElementById('insert_site');
    if (site.value === '') {
        return;
    }
    localStorage.setItem(String(localStorage.length), site.value);
    site.value = '';
    
    <!-- 刷新并展开屏蔽列表 -->
    blocked_sites();
    document.getElementById('blocked_sites_details').setAttribute('open', '');
}

<!-- 已屏蔽网站 -->
function blocked_sites() {
    let blocked_sites = document.getElementById('blocked_sites');
    blocked_sites.innerText = '';
    
    let item = '';
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === 'search_engine') {
            continue;
        }
        
        item = item.concat(localStorage.getItem(String(i)) + '\n');
    }
    
    blocked_sites.innerHTML = item;
}
