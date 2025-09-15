document.addEventListener('DOMContentLoaded', function() {
    // 标签切换功能
    document.querySelectorAll('.promotion-management .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.promotion-management .tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // 这里应该根据标签加载不同的促销活动
            const tabType = this.textContent.trim();
            alert(`加载${tabType}的促销活动`);
        });
    });
    
    // 创建促销活动
    const addPromotionBtn = document.querySelector('.promotion-management .add-promotion-btn');
    if (addPromotionBtn) {
        addPromotionBtn.addEventListener('click', function() {
            alert('打开创建促销活动表单');
        });
    }
    
    // 促销活动操作按钮
    document.querySelectorAll('.promotion-management .edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const promotionName = this.closest('.promotion-card').querySelector('h3').textContent;
            alert(`编辑促销活动: ${promotionName}`);
        });
    });
    
    document.querySelectorAll('.promotion-management .end-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const promotionName = this.closest('.promotion-card').querySelector('h3').textContent;
            if (confirm(`确定要结束促销活动: ${promotionName} 吗？`)) {
                alert(`促销活动: ${promotionName} 已结束`);
            }
        });
    });
});