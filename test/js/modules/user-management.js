document.addEventListener('DOMContentLoaded', function() {
    // 用户搜索功能
    const searchInput = document.querySelector('.user-management .search-bar input');
    const searchBtn = document.querySelector('.user-management .search-bar .search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            alert(`搜索用户: ${keyword}`);
        });
    }
    
    // 添加用户功能
    const addBtn = document.querySelector('.user-management .search-bar .add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            alert('打开添加用户表单');
        });
    }
    
    // 用户操作按钮
    document.querySelectorAll('.user-management .edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.closest('tr').querySelector('td').textContent;
            alert(`编辑用户 ID: ${userId}`);
        });
    });
    
    document.querySelectorAll('.user-management .delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.closest('tr').querySelector('td').textContent;
            if (confirm(`确定要删除用户 ID: ${userId} 吗？`)) {
                alert(`用户 ID: ${userId} 已删除`);
            }
        });
    });
});