// API Configuration
export const API_BASE_URL = 'https://onefocus-fou.onrender.com';

export const API_ENDPOINTS = {
  // Existing endpoints
  JOIN_US: `${API_BASE_URL}/join-us`,
  BOOK_US: `${API_BASE_URL}/book-us`,
  GET_INVOLVED: `${API_BASE_URL}/get-involved`,
  REGISTER_NOW: `${API_BASE_URL}/register-now`,
  PARTNERSHIPS: `${API_BASE_URL}/partnerships`,
  VOLUNTEERS: `${API_BASE_URL}/volunteers`,
  MENTORS: `${API_BASE_URL}/mentors`,
  DONATIONS: `${API_BASE_URL}/donations`,
  SUBSCRIBE: `${API_BASE_URL}/subscribe`,
  
  // Membership & Sponsorship endpoints
  BASIC_MEMBERSHIP: `${API_BASE_URL}/memberships/basic`,
  PREMIUM_MEMBERSHIP: `${API_BASE_URL}/memberships/premium`,
  CORPORATE_SPONSOR: `${API_BASE_URL}/sponsors/corporate`,
  
  // Auth endpoints
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_PROFILE: `${API_BASE_URL}/auth/profile`,
  AUTH_USERS: `${API_BASE_URL}/auth/users`,
  
  // Media Page endpoints
  BE_GUEST: `${API_BASE_URL}/be-guest`,
  EVENT_REGISTRATIONS: `${API_BASE_URL}/event-registrations`,
  GET_INVOLVED_ACTIONS: `${API_BASE_URL}/get-involved-actions`,
  BLOGS_PUBLISHED: `${API_BASE_URL}/blogs/published`,
  BLOGS_BY_ID: (id) => `${API_BASE_URL}/blogs/${id}`,

  // Events Endpoints
  EVENTS: `${API_BASE_URL}/events`,
  EVENTS_PUBLISHED: `${API_BASE_URL}/events/published`,
  EVENTS_UPCOMING: `${API_BASE_URL}/events/upcoming`,
  EVENTS_SEARCH: (query) => `${API_BASE_URL}/events/search?q=${query}`,
  EVENTS_BY_ID: (id) => `${API_BASE_URL}/events/${id}`,
  EVENTS_PUBLISH: (id) => `${API_BASE_URL}/events/${id}/publish`,

  // Services Page endpoints
  INTERNSHIP_APPLICATIONS: `${API_BASE_URL}/internship-applications`,
  SOCIAL_MEDIA_SUPPORT: `${API_BASE_URL}/social-media-support`,
  BOOK_SHOOT: `${API_BASE_URL}/book-shoot`,
  TRAINING_ENROLLMENTS: `${API_BASE_URL}/training-enrollments`,
  START_CODING: `${API_BASE_URL}/start-coding`,
  CERTIFICATE_REQUESTS: `${API_BASE_URL}/certificate-requests`,

};

export default API_BASE_URL;
