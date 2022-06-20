window.onload = function () {
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
                search_url = search_url.concat('https://baidu.com/search?wd=');
                localStorage.setItem('search_engine', 'Baidu');
                break;
        }
        
        <!-- 追加搜索词 -->
        let search_input = document.getElementById('search_input').value;
        search_url = search_url.concat(search_input);
        
        <!-- 追加已屏蔽网站 -->
        for (let i = 0; i < localStorage.length; i++) {
            let site = localStorage.getItem(String(i));
            site = '+-site%3A'.concat(site);
            search_url = search_url.concat(site);
        }
        
        window.open(search_url);
    }
}

<!-- 新增屏蔽 -->
function insert_site() {
    let site = document.getElementById('insert_site').value;
    localStorage.setItem(String(localStorage.length), site);
    document.getElementById('insert_site').value = null;
}

<!-- 已屏蔽网站 -->
function blocked_sites() {
    let blocked_sites = document.getElementById('blocked_sites');
    blocked_sites.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        let p = document.createElement('p');
        p.innerText = localStorage.getItem(String(i));
        
        let span = document.createElement('span');
        // span.innerText = '×';
        
        blocked_sites.appendChild(p);
        blocked_sites.appendChild(span);
    }
}
