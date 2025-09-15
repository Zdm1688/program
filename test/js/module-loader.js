// 模块加载器
document.addEventListener('DOMContentLoaded', function() {
    // 为导航链接添加点击事件
    document.querySelectorAll('.nav-links a[data-module]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const moduleName = this.getAttribute('data-module');
            loadModule(moduleName);
        });
    });
});

function loadModule(moduleName) {
    // 更新导航激活状态
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-links a[data-module="${moduleName}"]`).classList.add('active');
    
    // 显示加载中状态
    document.getElementById('module-content').innerHTML = `
        <div class="card" style="text-align: center; padding: 40px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 20px;"></i>
            <h2>加载中...</h2>
        </div>
    `;
    
    // 加载模块内容
    fetch(`modules/${moduleName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('模块文件未找到');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('module-content').innerHTML = html;
            
            // 加载模块特定CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = `css/modules/${moduleName}.css`;
            document.head.appendChild(cssLink);
            
            // 加载模块特定JS
            const jsScript = document.createElement('script');
            jsScript.src = `js/modules/${moduleName}.js`;
            document.body.appendChild(jsScript);
        })
        .catch(error => {
            console.error('模块加载失败:', error);
            document.getElementById('module-content').innerHTML = `
                <div class="card" style="text-align: center; padding: 40px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 24px; color: #e74c3c; margin-bottom: 20px;"></i>
                    <h2>模块加载失败</h2>
                    <p>无法加载 ${moduleName} 模块，请检查文件路径是否正确。</p>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        重新加载
                    </button>
                </div>
            `;
        });
}