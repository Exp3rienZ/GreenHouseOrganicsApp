import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    register(registerDto: RegisterDto): Promise<any>;
    getRegistrationStats(): Promise<{
        totalRegistrations: any;
        targetRegistrations: number;
        progressPercentage: number;
    }>;
}
