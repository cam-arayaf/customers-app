export const apiGet = url => () =>
    fetch(url).then(res => res.json());

export const apiPut = (url, id, obj) => () =>
    fetch(
        `${ url }/${ id }`,
        {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: new Headers({ 'Content-type': 'application/json' })
        }
    )
    .then(res => res.json())
    .then(data => {
        if (data.error) return Promise.reject(data.validation);
        return data;
    });

export const apiPost = (url, obj) => () =>
    fetch(
        `${ url }`,
        {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: new Headers({ 'Content-type': 'application/json' })
        }
    )
    .then(res => res.json())
    .then(data => {
        if (data.error) return Promise.reject(data.validation);
        return data;
    });

export const apiDelete = (url, id) => () =>
    fetch(
        `${ url }/${ id }`,
        {
            method: 'DELETE',
            headers: new Headers({ 'Content-type': 'application/json' })
        }
    )
    .then(res => res.json())
    .then(data => {
        if (data.error) return Promise.reject(data.validation);
        return id;
    });