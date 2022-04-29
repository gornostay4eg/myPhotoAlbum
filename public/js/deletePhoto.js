const bigContainer = document.querySelector('.bigContainer');

bigContainer?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.className === 'deletephoto') {
    const parent = e.target.closest('[data-id]');
    const { id } = parent.dataset;
    const response = await fetch(`/photos/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      parent.remove();
    }
  }
});

