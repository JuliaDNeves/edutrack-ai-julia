/**
 * EduTrack AI - Centralized Authentication & Xano API Service
 */

const EduTrackAuth = (() => {
    const XANO_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:kAYAUbt7';
    const XANO_SUBJECTS_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:asoARar9';
    const TOKEN_KEY = 'edutrack_token';

    // ==========================================================================
    // Token Management (localStorage)
    // ==========================================================================
    function getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    function setToken(token) {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        }
    }

    function removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    function isAuthenticated() {
        return !!getToken();
    }

    // ==========================================================================
    // HTTP Helpers
    // ==========================================================================
    function getAuthHeaders() {
        const token = getToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    async function parseResponse(response) {
        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            // Non-JSON or empty response body
        }

        if (!response.ok) {
            const errorMessage = data.message || data.error || 'Ocorreu um erro na requisição. Verifique suas credenciais.';
            const err = new Error(errorMessage);
            err.status = response.status;
            err.data = data;
            throw err;
        }

        return data;
    }

    // ==========================================================================
    // Auth API Endpoints
    // ==========================================================================

    /**
     * Login user with email and password
     * POST /auth/login
     */
    async function login(email, password) {
        const response = await fetch(`${XANO_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await parseResponse(response);
        if (data && data.authToken) {
            setToken(data.authToken);
        }
        return data;
    }

    /**
     * Signup user with email, password, and optional name
     * POST /auth/signup
     */
    async function signup(email, password, name = '') {
        const payload = { email, password };
        if (name && name.trim() !== '') {
            payload.name = name.trim();
        }

        const response = await fetch(`${XANO_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await parseResponse(response);
        if (data && data.authToken) {
            setToken(data.authToken);
        }
        return data;
    }

    /**
     * Fetch authenticated user details
     * GET /auth/me
     */
    async function getMe() {
        const token = getToken();
        if (!token) {
            throw new Error('Nenhum token de autenticação encontrado.');
        }

        const response = await fetch(`${XANO_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await parseResponse(response);
    }

    /**
     * Request password reset token by email
     * POST /auth/request_password_reset
     */
    async function requestPasswordReset(email) {
        const response = await fetch(`${XANO_BASE_URL}/auth/request_password_reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim() })
        });

        return await parseResponse(response);
    }

    /**
     * Complete password reset using token and new password
     * POST /auth/reset_password
     */
    async function resetPassword(token, newPassword) {
        const response = await fetch(`${XANO_BASE_URL}/auth/reset_password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, new_password: newPassword })
        });

        return await parseResponse(response);
    }

    /**
     * Logout user and redirect
     */
    function logout(redirectUrl = 'login.html') {
        removeToken();
        window.location.href = redirectUrl;
    }

    /**
     * Helper to derive user initials from full name or email
     */
    function getInitials(name, email) {
        if (name && name.trim() !== '') {
            const parts = name.trim().split(/\s+/);
            if (parts.length >= 2) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            } else if (parts.length === 1 && parts[0].length >= 2) {
                return parts[0].substring(0, 2).toUpperCase();
            }
        }
        if (email) {
            return email.substring(0, 2).toUpperCase();
        }
        return 'U';
    }

    return {
        XANO_BASE_URL,
        XANO_SUBJECTS_URL,
        getToken,
        setToken,
        removeToken,
        isAuthenticated,
        getAuthHeaders,
        login,
        signup,
        requestPasswordReset,
        resetPassword,
        getMe,
        logout,
        getInitials
    };
})();
