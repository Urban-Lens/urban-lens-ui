const STORAGE_PREFIX = "urban_lens";

const storage = {
    // Token management (existing functionality)
    getToken: () => {
        const token = localStorage.getItem(`${STORAGE_PREFIX}_token`);
        return token || "";
    },

    setToken: (token: string) => {
        localStorage.setItem(`${STORAGE_PREFIX}_token`, token);
    },

    removeToken: () => {
        localStorage.removeItem(`${STORAGE_PREFIX}_token`);
    },
};

export default storage;
