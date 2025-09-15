document.addEventListener('DOMContentLoaded', function() {
    // 商品搜索功能
    const searchInput = document.querySelector('.product-management .search-bar input');
    const searchBtn = document.querySelector('.product-management .search-bar .search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            alert(`搜索商品: ${keyword}`);
        });
    }
    
    // 添加商品功能
    const addBtn = document.querySelector('.product-management .search-bar .add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            alert('打开添加商品表单');
        });
    }
    
    // 商品操作按钮
    document.querySelectorAll('.product-management .edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('.product-title').textContent;
            alert(`编辑商品: ${productName}`);
        });
    });
    
    document.querySelectorAll('.product-management .delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('.product-title').textContent;
            if (confirm(`确定要删除商品: ${productName} 吗？`)) {
                alert(`商品: ${productName} 已删除`);
            }
        });
    });
});