import { Controller, Get, Post, Query } from '@nestjs/common';
import { RaffleService } from './raffle.service';

@Controller('api')
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  @Get('raffle-status')
  getRaffleStatus(@Query('userId') userId: string) {
    return this.raffleService.getStatus(userId);
  }

  @Post('raffle-entry')
  enterRaffle() {
    return this.raffleService.enterRaffle();
  }
}
