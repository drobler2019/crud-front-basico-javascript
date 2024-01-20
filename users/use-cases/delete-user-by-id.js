export const deleteUser = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const request = {
        method: 'DELETE'
    };
    const deleteResource = await fetch(url, request).then(response => response.json());
    console.log(deleteResource);
    return true;
}