// API клиент для работы с сервером через fetch
export const API_BASE = 'http://localhost:3000/api/cities';

class ApiClient {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            console.error('GET error:', error);
            return { data: null, status: 500 };
        }
    }

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = response.status === 204 ? null : await response.json();
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('POST error:', error);
            return { data: null, status: 500 };
        }
    }

    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const responseData = response.status === 204 ? null : await response.json();
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('PATCH error:', error);
            return { data: null, status: 500 };
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            return { data: null, status: response.status };
        } catch (error) {
            console.error('DELETE error:', error);
            return { data: null, status: 500 };
        }
    }
}

export const api = new ApiClient();