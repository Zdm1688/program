document.addEventListener('DOMContentLoaded', function() {
    // 时间范围选择
    const timeSelect = document.querySelector('.statistics .time-select');
    const customRange = document.querySelector('.statistics .custom-range');
    
    if (timeSelect) {
        timeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customRange.style.display = 'flex';
            } else {
                customRange.style.display = 'none';
                loadStatisticsData(this.value);
            }
        });
    }
    
    // 自定义时间范围确认
    const confirmRange = document.querySelector('.statistics .confirm-range');
    if (confirmRange) {
        confirmRange.addEventListener('click', function() {
            const startDate = document.querySelector('.statistics .start-date').value;
            const endDate = document.querySelector('.statistics .end-date').value;
            
            if (startDate && endDate) {
                alert(`加载自定义时间范围数据: ${startDate} 至 ${endDate}`);
                // 实际应用中这里应该调用加载数据的函数
            } else {
                alert('请选择完整的日期范围');
            }
        });
    }
    
    // 标签切换
    document.querySelectorAll('.statistics .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.statistics .tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            const tab = this.getAttribute('data-tab');
            document.querySelectorAll('.statistics .tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(`.statistics .tab-content[data-tab="${tab}"]`).classList.add('active');
            
            // 初始化对应标签的图表
            initCharts(tab);
        });
    });
    
    // 导出功能
    document.querySelectorAll('.statistics .export-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.querySelector('i').classList.contains('fa-file-excel') ? 'Excel' : 'PDF';
            alert(`导出${format}格式的数据报表`);
        });
    });
    
    // 初始化图表
    function initCharts(tab) {
        if (tab === 'sales') {
            initSalesCharts();
        } else if (tab === 'users') {
            initUserCharts();
        } else if (tab === 'products') {
            initProductCharts();
        }
    }
    
    function initSalesCharts() {
        // 销售趋势图
        const salesTrendCtx = document.getElementById('salesTrendChart').getContext('2d');
        new Chart(salesTrendCtx, {
            type: 'line',
            data: {
                labels: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
                datasets: [{
                    label: '销售额',
                    data: [1200, 1900, 1500, 2000, 1800, 2500, 2200],
                    borderColor: '#4cd964',
                    backgroundColor: 'rgba(76, 217, 100, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '本月销售趋势'
                    }
                }
            }
        });
        
        // 品类分布图
        const categoryCtx = document.getElementById('categoryDistributionChart').getContext('2d');
        new Chart(categoryCtx, {
            type: 'pie',
            data: {
                labels: ['蔬菜', '水果', '粮油', '禽蛋', '肉类'],
                datasets: [{
                    data: [35, 25, 15, 12, 8],
                    backgroundColor: [
                        '#4cd964',
                        '#3498db',
                        '#9b59b6',
                        '#f1c40f',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '品类销售分布'
                    }
                }
            }
        });
    }
    
    function initUserCharts() {
        // 用户增长图
        const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
        new Chart(userGrowthCtx, {
            type: 'bar',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
                datasets: [{
                    label: '新增用户',
                    data: [85, 92, 78, 95, 102, 115, 108, 120, 135, 125],
                    backgroundColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '年度用户增长趋势'
                    }
                }
            }
        });
        
        // 用户来源图
        const userSourceCtx = document.getElementById('userSourceChart').getContext('2d');
        new Chart(userSourceCtx, {
            type: 'doughnut',
            data: {
                labels: ['自然搜索', '社交媒体', '直接访问', '广告推广', '其他'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#4cd964',
                        '#3498db',
                        '#9b59b6',
                        '#f1c40f',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '用户来源分布'
                    }
                }
            }
        });
    }
    
    function initProductCharts() {
        // 商品销售图
        const productSalesCtx = document.getElementById('productSalesChart').getContext('2d');
        new Chart(productSalesCtx, {
            type: 'bar',
            data: {
                labels: ['有机胡萝卜', '红富士苹果', '农家土鸡蛋', '东北大米', '新鲜牛肉'],
                datasets: [{
                    label: '销量',
                    data: [156, 128, 89, 76, 45],
                    backgroundColor: '#9b59b6'
                }, {
                    label: '销售额',
                    data: [1872, 1152, 890, 912, 1125],
                    backgroundColor: '#4cd964'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '热销商品排行'
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        });
    }
    
    // 默认加载销售统计标签
    initCharts('sales');
});