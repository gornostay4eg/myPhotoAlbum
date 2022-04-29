const bigContainer = document.querySelector('.bigContainer');

bigContainer?.addEventListener('click', async (e) => {
  console.log(e);
  // e.preventDefault();
  if (e.target.className === 'deletealbum') {
    const parent = e.target.closest('[data-id]');
    const { id } = parent.dataset;
    const response = await fetch(`/albums/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      parent.remove();
    }
  }
});