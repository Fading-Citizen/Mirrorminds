export interface User {
  id: string;
  sessionId: string;
  createdAt: Date;
  email?: string;
}

export class UserManager {
  private static instance: UserManager;
  private currentUser: User | null = null;

  static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  generateUserId(): string {
    // Generate unique user ID using timestamp + random string
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `user_${timestamp}_${random}`;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  createNewUser(email?: string): User {
    const user: User = {
      id: this.generateUserId(),
      sessionId: `session_${Date.now()}`,
      createdAt: new Date(),
      email
    };
    this.currentUser = user;
    console.log('Created new user:', user.id);
    return user;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  clearUser(): void {
    console.log('Clearing current user session');
    this.currentUser = null;
  }

  getUserId(): string | null {
    return this.currentUser?.id || null;
  }
}
