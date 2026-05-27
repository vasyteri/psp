// Для разработки используем относительный путь (будет проксироваться Vite)
// Для продакшена можно использовать полный URL
export const API_BASE = '/api/cities';

class ApiClient {
    async get(url) {
        try {
            console.log('📡 GET запрос:', url);
            const response = await fetch(url);
            console.log('📡 GET статус:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('📡 GET данные:', data);
            return { data, status: response.status };
        } catch (error) {
            console.error('❌ GET ошибка:', error);
            return { data: null, status: 500 };
        }
    }

    async post(url, data) {
        try {
            console.log('📡 POST запрос:', url, data);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            console.log('📡 POST статус:', response.status);
            
            const responseData = response.status === 204 ? null : await response.json();
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('❌ POST ошибка:', error);
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
            const responseData = await response.json();
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('❌ PATCH ошибка:', error);
            return { data: null, status: 500 };
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            return { data: null, status: response.status };
        } catch (error) {
            console.error('❌ DELETE ошибка:', error);
            return { data: null, status: 500 };
        }
    }
}

export const api = new ApiClient();