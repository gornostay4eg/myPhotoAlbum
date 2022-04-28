const deletealbum = document.querySelector('#deletealbum');

deletealbum.addEventListener('click', (e) => {
    const responce = await fetch('/main/delete', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
})