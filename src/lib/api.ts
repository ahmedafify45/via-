const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Users
  getUsers: async (token: string) => {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Files
  getFiles: async (token: string) => {
    const response = await fetch(`${BASE_URL}/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Clients
  getClients: async (token: string) => {
    const response = await fetch(`${BASE_URL}/items/clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // FAQs
  getFAQs: async (token: string) => {
    const response = await fetch(`${BASE_URL}/items/faqs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Team Members
  getTeamMembers: async (token: string) => {
    const response = await fetch(`${BASE_URL}/items/team_members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getTeamMemberById: async (token: string, id: number) => {
    const response = await fetch(`${BASE_URL}/items/team_members/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Team member not found");
    }
    return response.json();
  },

  // Services
  getServices: async (token: string) => {
    const response = await fetch(`${BASE_URL}/items/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Blog Posts
  getBlogPosts: async (token: string) => {
    const response = await fetch(`${BASE_URL}/items/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
