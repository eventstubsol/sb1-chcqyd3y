interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  tenantId: string;
}

export class SupportService {
  private tickets: Map<string, Ticket> = new Map();
  private chats: Map<string, any> = new Map();

  async createTicket(data: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> {
    const id = Date.now().toString();
    const ticket = {
      ...data,
      id,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date()
    } as Ticket;
    
    this.tickets.set(id, ticket);
    return ticket;
  }

  async getTicket(id: string): Promise<Ticket | null> {
    return this.tickets.get(id) || null;
  }

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.tickets.get(id);
    if (!ticket) throw new Error('Ticket not found');

    const updatedTicket = {
      ...ticket,
      ...updates,
      updatedAt: new Date()
    };
    
    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }

  async getTicketsByTenant(tenantId: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values())
      .filter(ticket => ticket.tenantId === tenantId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async startChat(userId: string): Promise<{ chatId: string }> {
    const chatId = Date.now().toString();
    this.chats.set(chatId, {
      userId,
      status: 'active',
      createdAt: new Date()
    });
    return { chatId };
  }
}

export const supportService = new SupportService();