// backend/src/auth/auth.controller.ts
import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('stats')
    async getRegistrationStats() {
        return this.authService.getRegistrationStats();
    }
}