// 侧边栏折叠功能
document.addEventListener('DOMContentLoaded', function() {
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleSidebar && sidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            if (sidebar.classList.contains('collapsed')) {
                toggleSidebar.innerHTML = '<i class="fas fa-chevron-right"></i>';
            } else {
                toggleSidebar.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // 初始化图表
    const ctx = document.getElementById('salesChart');
    if (ctx) {
        const salesChart = new Chart(ctx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['蔬菜', '水果', '粮油', '禽蛋', '肉类', '其他'],
                datasets: [{
                    data: [30, 25, 15, 12, 10, 8],
                    backgroundColor: [
                        '#4cd964',
                        '#3498db',
                        '#9b59b6',
                        '#e74c3c',
                        '#f1c40f',
                        '#34495e'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: '各类农产品销售占比'
                    }
                }
            }
        });
    }
    
    // 为快捷入口添加点击效果
    document.querySelectorAll('.quick-action').forEach(action => {
        action.addEventListener('click', function() {
            alert('您点击了: ' + this.querySelector('span').textContent);
        });
    });
});
// 在base.js中添加以下代码（合并到原有代码中）

// 快捷入口点击事件
document.querySelectorAll('.quick-action').forEach(action => {
    action.addEventListener('click', function() {
        const moduleName = this.getAttribute('data-module');
        if (moduleName) {
            // 更新导航激活状态
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`.nav-links a[data-module="${moduleName}"]`).classList.add('active');
            
            // 加载对应模块
            loadModule(moduleName);
        }
    });
});

// 确保loadModule函数在base.js中可用（如果还没有）
function loadModule(moduleName) {
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