// API endpoints for forum functionality
// This would integrate with your backend API

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreatePostRequest {
  title: string;
  content: string;
  categoryId: string;
  subcategoryId?: string;
  postType: string;
  tags: string[];
  tradingData?: any;
  businessData?: any;
  eventData?: any;
  attachments?: File[];
  isPublic: boolean;
  allowComments: boolean;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  tags?: string[];
  tradingData?: any;
  businessData?: any;
  eventData?: any;
}

export interface SearchPostsRequest {
  query?: string;
  categoryId?: string;
  subcategoryId?: string;
  tags?: string[];
  authorId?: string;
  postType?: string;
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

class ForumAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/forum') {
    this.baseUrl = baseUrl;
  }

  // Categories
  async getCategories(): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/categories`);
    return response.json();
  }

  async createCategory(categoryData: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData)
    });
    return response.json();
  }

  async updateCategory(categoryId: string, updates: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/categories/${categoryId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  }

  // Posts
  async getPosts(params?: SearchPostsRequest): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    
    const response = await fetch(`${this.baseUrl}/posts?${queryParams}`);
    return response.json();
  }

  async getPost(postId: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}`);
    return response.json();
  }

  async createPost(postData: CreatePostRequest): Promise<ApiResponse<any>> {
    const formData = new FormData();
    
    // Add text fields
    Object.entries(postData).forEach(([key, value]) => {
      if (key !== 'attachments' && value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });
    
    // Add file attachments
    if (postData.attachments) {
      postData.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }
    
    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }

  async updatePost(postId: string, updates: UpdatePostRequest): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  }

  async deletePost(postId: string, reason?: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    return response.json();
  }

  async likePost(postId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}/like`, {
      method: 'POST'
    });
    return response.json();
  }

  async unlikePost(postId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}/like`, {
      method: 'DELETE'
    });
    return response.json();
  }

  async bookmarkPost(postId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}/bookmark`, {
      method: 'POST'
    });
    return response.json();
  }

  async sharePost(postId: string, platform: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform })
    });
    return response.json();
  }

  // Replies
  async getReplies(postId: string): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}/replies`);
    return response.json();
  }

  async createReply(postId: string, content: string, parentId?: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/posts/${postId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, parentId })
    });
    return response.json();
  }

  async updateReply(replyId: string, content: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/replies/${replyId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    return response.json();
  }

  async deleteReply(replyId: string, reason?: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/replies/${replyId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    return response.json();
  }

  async likeReply(replyId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/replies/${replyId}/like`, {
      method: 'POST'
    });
    return response.json();
  }

  async markBestAnswer(replyId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/replies/${replyId}/best-answer`, {
      method: 'POST'
    });
    return response.json();
  }

  // Users
  async getUser(userId: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`);
    return response.json();
  }

  async getUserPosts(userId: string, page = 1, limit = 20): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/posts?page=${page}&limit=${limit}`);
    return response.json();
  }

  async followUser(userId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/follow`, {
      method: 'POST'
    });
    return response.json();
  }

  async unfollowUser(userId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/follow`, {
      method: 'DELETE'
    });
    return response.json();
  }

  async updateUserProfile(userId: string, updates: any): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  }

  // Moderation
  async reportContent(contentId: string, contentType: 'post' | 'reply', reason: string, description?: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentId, contentType, reason, description })
    });
    return response.json();
  }

  async getModerationQueue(): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/moderation/queue`);
    return response.json();
  }

  async moderateContent(contentId: string, action: string, reason?: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/moderation/${contentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, reason })
    });
    return response.json();
  }

  async banUser(userId: string, duration: number, reason: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/moderation/users/${userId}/ban`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration, reason })
    });
    return response.json();
  }

  async updateUserReputation(userId: string, amount: number, reason: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/reputation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, reason })
    });
    return response.json();
  }

  // Search
  async searchPosts(searchParams: SearchPostsRequest): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(searchParams)
    });
    return response.json();
  }

  async getTrendingTags(days = 7): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/trending/tags?days=${days}`);
    return response.json();
  }

  async getTrendingPosts(period = 'week'): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/trending/posts?period=${period}`);
    return response.json();
  }

  // Analytics
  async getForumAnalytics(period: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/analytics?period=${period}`);
    return response.json();
  }

  async getCategoryAnalytics(categoryId: string, period: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/categories/${categoryId}/analytics?period=${period}`);
    return response.json();
  }

  async getUserAnalytics(userId: string, period: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/analytics?period=${period}`);
    return response.json();
  }

  // Notifications
  async getNotifications(userId: string): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/notifications`);
    return response.json();
  }

  async markNotificationRead(notificationId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/notifications/${notificationId}/read`, {
      method: 'POST'
    });
    return response.json();
  }

  async markAllNotificationsRead(userId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/notifications/read-all`, {
      method: 'POST'
    });
    return response.json();
  }

  // Real-time features
  connectToRealTime(userId: string, callbacks: {
    onNewPost?: (post: any) => void;
    onNewReply?: (reply: any) => void;
    onPostUpdate?: (post: any) => void;
    onNotification?: (notification: any) => void;
  }) {
    // WebSocket connection for real-time updates
    const ws = new WebSocket(`ws://localhost:3001/forum/realtime/${userId}`);
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      switch (message.type) {
        case 'new_post':
          callbacks.onNewPost?.(message.data);
          break;
        case 'new_reply':
          callbacks.onNewReply?.(message.data);
          break;
        case 'post_update':
          callbacks.onPostUpdate?.(message.data);
          break;
        case 'notification':
          callbacks.onNotification?.(message.data);
          break;
      }
    };
    
    return () => ws.close();
  }
}

// Export singleton instance
export const forumAPI = new ForumAPI();

// Utility functions for API calls
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const uploadFile = async (file: File, type: 'avatar' | 'attachment'): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  return result.data.url;
};

// Rate limiting helper
export const rateLimiter = {
  limits: new Map<string, { count: number; resetTime: number }>(),
  
  checkLimit(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const limit = this.limits.get(key);
    
    if (!limit || now > limit.resetTime) {
      this.limits.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (limit.count >= maxRequests) {
      return false;
    }
    
    limit.count++;
    return true;
  }
};

// Cache management
export const forumCache = {
  cache: new Map<string, { data: any; expiry: number }>(),
  
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item || Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  },
  
  set(key: string, data: any, ttlMs: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs
    });
  },
  
  delete(key: string): void {
    this.cache.delete(key);
  },
  
  clear(): void {
    this.cache.clear();
  }
};