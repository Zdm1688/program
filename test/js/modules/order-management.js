document.addEventListener('DOMContentLoaded', function() {
    // 订单搜索功能
    const searchInput = document.querySelector('.order-management .search-bar input');
    const searchBtn = document.querySelector('.order-management .search-bar .search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            alert(`搜索订单: ${keyword}`);
        });
    }
    
    // 订单筛选功能
    const filterBtn = document.querySelector('.order-management .search-bar .filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            alert('打开订单筛选条件');
        });
    }
    
    // 订单操作按钮
    document.querySelectorAll('.order-management .view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.closest('tr').querySelector('td').textContent;
            alert(`查看订单: ${orderId}`);
        });
    });
    
    document.querySelectorAll('.order-management .cancel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.closest('tr').querySelector('td').textContent;
            if (confirm(`确定要取消订单: ${orderId} 吗？`)) {
                alert(`订单: ${orderId} 已取消`);
            }
        });
    });
    
    // 分页功能
    document.querySelectorAll('.order-management .page-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('加载更多订单数据');
        });
    });
});