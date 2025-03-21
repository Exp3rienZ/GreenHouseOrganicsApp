// backend/src/auth/auth.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password, firstName, lastName } = registerDto;

        // Überprüfen, ob die E-Mail bereits existiert
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('E-Mail bereits registriert');
        }

        // Passwort hashen
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        // Neuen Benutzer erstellen
        const newUser = this.usersRepository.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            status: 'INTERESTED',
        });

        await this.usersRepository.save(newUser);

        // Passwort aus Rückgabe entfernen
        const { password: _, ...result } = newUser;
        return result;
    }

    async getRegistrationStats() {
        const totalRegistrations = await this.usersRepository.count();
        const targetRegistrations = 100; // Gemäß Lastenheft

        return {
            totalRegistrations,
            targetRegistrations,
            progressPercentage: Math.min(100, (totalRegistrations / targetRegistrations) * 100),
        };
    }
}