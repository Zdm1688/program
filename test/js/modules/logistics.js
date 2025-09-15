document.addEventListener('DOMContentLoaded', function() {
    // 订单搜索功能
    const searchInput = document.querySelector('.logistics .search-bar input');
    const searchBtn = document.querySelector('.logistics .search-bar .search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            alert(`搜索物流信息: ${keyword}`);
            // 实际应用中这里应该发送AJAX请求获取搜索结果
        });
    }
    
    // 订单项点击事件
    document.querySelectorAll('.logistics .order-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.logistics .order-item').forEach(i => {
                i.classList.remove('active');
            });
            this.classList.add('active');
            
            const orderId = this.querySelector('.order-id').textContent;
            loadLogisticsDetail(orderId);
        });
    });
    
    // 加载物流详情
    function loadLogisticsDetail(orderId) {
        alert(`加载订单 ${orderId} 的物流详情`);
        // 实际应用中这里应该发送AJAX请求获取物流详情
        
        // 初始化地图
        initLogisticsMap();
    }
    
    // 初始化物流地图
    function initLogisticsMap() {
        // 检查是否已加载Leaflet地图库
        if (typeof L === 'undefined') {
            // 动态加载Leaflet CSS
            const leafletCSS = document.createElement('link');
            leafletCSS.rel = 'stylesheet';
            leafletCSS.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
            document.head.appendChild(leafletCSS);
            
            // 动态加载Leaflet JS
            const leafletJS = document.createElement('script');
            leafletJS.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
            leafletJS.onload = function() {
                createMap();
            };
            document.body.appendChild(leafletJS);
        } else {
            createMap();
        }
    }
    
    function createMap() {
        const map = L.map('logistics-map').setView([35.0, 105.0], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // 添加标记和路线（模拟数据）
        const shanghai = L.marker([31.2304, 121.4737]).addTo(map)
            .bindPopup('上海仓库<br>发货时间: 2023-10-14 18:15');
        
        const beijing = L.marker([39.9042, 116.4074]).addTo(map)
            .bindPopup('北京分拣中心<br>到达时间: 2023-10-15 09:30');
        
        const destination = L.marker([39.9834, 116.3184]).addTo(map)
            .bindPopup('收货地址<br>预计送达: 2023-10-16');
        
        // 绘制路线
        const route = L.polyline([
            [31.2304, 121.4737],
            [34.3416, 117.2838],
            [37.4531, 115.9369],
            [39.9042, 116.4074],
            [39.9834, 116.3184]
        ], {color: '#3498db', weight: 3}).addTo(map);
        
        // 调整地图视图以显示所有标记
        map.fitBounds([
            [31.2304, 121.4737],
            [39.9834, 116.3184]
        ]);
    }
    
    // 默认加载第一个订单的物流信息
    const firstOrder = document.querySelector('.logistics .order-item');
    if (firstOrder) {
        firstOrder.click();
    }
});