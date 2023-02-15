//if the window is true/active, the user is not accessing the server
export const isServerFn = () => typeof window === "undefined";
