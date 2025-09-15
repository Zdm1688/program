document.addEventListener('DOMContentLoaded', function() {
    // 库存搜索功能
    const searchInput = document.querySelector('.inventory-management .search-bar input');
    const searchBtn = document.querySelector('.inventory-management .search-bar .search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            alert(`搜索库存商品: ${keyword}`);
        });
    }
    
    // 批量补货功能
    const bulkRestockBtn = document.querySelector('.inventory-management .search-bar .restock-btn');
    if (bulkRestockBtn) {
        bulkRestockBtn.addEventListener('click', function() {
            alert('打开批量补货表单');
        });
    }
    
    // 单个商品补货功能
    document.querySelectorAll('.inventory-management .inventory-actions .restock-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.inventory-card').querySelector('.product-title').textContent;
            alert(`为 ${productName} 补货`);
        });
    });
    
    // 库存调整功能
    document.querySelectorAll('.inventory-management .inventory-actions .adjust-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.inventory-card').querySelector('.product-title').textContent;
            alert(`调整 ${productName} 的库存数量`);
        });
    });
});