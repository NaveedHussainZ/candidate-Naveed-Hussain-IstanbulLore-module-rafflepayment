import { Injectable } from '@nestjs/common';

@Injectable()
export class RaffleService {
  private ticketCount = 1;

  getStatus(userId: string) {
    console.log(`Checking status for user ${userId}`);
    return { tickets: this.ticketCount };
  }

  enterRaffle() {
    this.ticketCount++;
    return { success: true, tickets: this.ticketCount };
  }
}
